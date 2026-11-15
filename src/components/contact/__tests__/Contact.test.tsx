import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FAILING_EMAIL, submitContact } from '@/lib/contact';

import { Contact } from '@/components/contact/Contact';

jest.mock('@/lib/contact', () => {
  const actual = jest.requireActual('@/lib/contact');
  return { ...actual, submitContact: jest.fn(actual.submitContact) };
});

const renderContact = () => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<Contact />);
  const field = (name: string) => screen.getByLabelText(name);
  const submit = () =>
    screen.getByRole('button', { name: /^(send message|sending…)$/i });
  const finishRequest = () => act(() => jest.runAllTimers());
  return { user, field, submit, finishRequest };
};

const fillValid = async (
  user: ReturnType<typeof userEvent.setup>,
  field: (name: string) => HTMLElement,
  email = 'ada@example.com',
) => {
  await user.type(field('Full name'), 'Ada Lovelace');
  await user.type(field('Email'), email);
  await user.type(field('Your question'), 'Do you have team plans?');
};

afterEach(() => {
  jest.useRealTimers();
  jest.mocked(submitContact).mockClear();
});

describe('Contact', () => {
  it('is a section named by its heading, with the contact details', () => {
    render(<Contact />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Get in touch',
    });
    const section = screen.getByRole('region', { name: 'Get in touch' });
    expect(section).toHaveAttribute('id', 'contact');
    expect(section).toContainElement(heading);
    expect(
      screen.getByRole('link', { name: 'contact@luma.com' }),
    ).toHaveAttribute('href', 'mailto:contact@luma.com');
    expect(
      screen.getByText('Up to 24 hours on business days'),
    ).toBeInTheDocument();
  });

  it('lists the contact details', () => {
    render(<Contact />);

    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Emailcontact@luma.com');
    expect(items[1]).toHaveTextContent(
      'Response TimeUp to 24 hours on business days',
    );
  });

  it('labels every field and names the form', () => {
    render(<Contact />);

    const form = screen.getByRole('form', { name: 'Contact us' });
    expect(within(form).getByLabelText('Full name')).toHaveAttribute(
      'autocomplete',
      'name',
    );
    expect(within(form).getByLabelText('Email')).toHaveAttribute(
      'type',
      'email',
    );
    expect(within(form).getByLabelText('Your question').tagName).toBe(
      'TEXTAREA',
    );
  });

  describe('validation', () => {
    it('shows no errors before the first submit', async () => {
      const { user, field } = renderContact();

      await user.type(field('Email'), 'ada');
      await user.tab();

      expect(field('Email')).not.toHaveAttribute('aria-invalid', 'true');
      expect(screen.queryByText(/valid email/)).not.toBeInTheDocument();
    });

    it('on submit, flags every invalid field and focuses the first', async () => {
      const { user, field, submit } = renderContact();

      await user.type(field('Email'), 'ada');
      await user.click(submit());

      expect(field('Full name')).toHaveAttribute('aria-invalid', 'true');
      expect(field('Full name')).toHaveAccessibleDescription(
        'Enter your full name.',
      );
      expect(field('Email')).toHaveAccessibleDescription(
        'Enter a valid email address, like name@example.com.',
      );
      expect(field('Your question')).toHaveAccessibleDescription(
        'Tell us how we can help.',
      );
      expect(field('Full name')).toHaveFocus();
    });

    it('after a failed submit, re-validates each field as it changes', async () => {
      const { user, field, submit } = renderContact();

      await user.click(submit());
      await user.type(field('Full name'), 'Ada');

      expect(field('Full name')).not.toHaveAttribute('aria-invalid', 'true');
      expect(
        screen.queryByText('Enter your full name.'),
      ).not.toBeInTheDocument();
      expect(field('Email')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('submit', () => {
    it('shows progress, then confirms and clears the form', async () => {
      const { user, field, submit, finishRequest } = renderContact();

      await fillValid(user, field);
      await user.click(submit());

      expect(submit()).toHaveTextContent('Sending…');
      expect(submit()).toHaveAttribute('aria-disabled', 'true');

      finishRequest();

      expect(screen.getByRole('status')).toContainElement(
        await screen.findByText(/your message is on its way/i),
      );
      expect(field('Full name')).toHaveValue('');
      expect(field('Email')).toHaveValue('');
      expect(field('Your question')).toHaveValue('');
      expect(submit()).not.toHaveAttribute('aria-disabled', 'true');
    });

    it('sends once when submitted again while sending', async () => {
      const { user, field, submit, finishRequest } = renderContact();

      await fillValid(user, field);
      await user.click(submit());
      await user.click(submit());
      finishRequest();

      expect(
        await screen.findByText(/your message is on its way/i),
      ).toBeInTheDocument();
      expect(submitContact).toHaveBeenCalledTimes(1);
    });

    it('locks the fields while sending, so nothing typed is lost on reset', async () => {
      const { user, field, submit, finishRequest } = renderContact();

      await fillValid(user, field);
      await user.click(submit());
      await user.type(field('Your question'), ' And more.');

      expect(field('Your question')).toHaveAttribute('readonly');
      expect(field('Your question')).toHaveValue('Do you have team plans?');

      finishRequest();
      await screen.findByText(/your message is on its way/i);
      expect(field('Your question')).not.toHaveAttribute('readonly');
    });

    it('reports a failure and keeps the values for a retry', async () => {
      const { user, field, submit, finishRequest } = renderContact();

      await fillValid(user, field, FAILING_EMAIL);
      await user.click(submit());
      finishRequest();

      expect(await screen.findByRole('alert')).toHaveTextContent(
        /couldn’t send your message/i,
      );
      expect(field('Email')).toHaveValue(FAILING_EMAIL);
      expect(field('Full name')).toHaveValue('Ada Lovelace');
      expect(screen.getByRole('status')).toBeEmptyDOMElement();
    });
  });
});
