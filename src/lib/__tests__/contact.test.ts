import { FAILING_EMAIL, submitContact, validateContact } from '@/lib/contact';

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  question: 'Do you have team plans?',
};

describe('validateContact', () => {
  it('accepts a complete message', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('requires every field, ignoring surrounding spaces', () => {
    expect(validateContact({ name: '  ', email: '', question: ' ' })).toEqual({
      name: 'Enter your full name.',
      email: 'Enter your email address.',
      question: 'Tell us how we can help.',
    });
  });

  it.each(['ada', 'ada@', 'ada@example', 'ada @example.com'])(
    'rejects the malformed email %p',
    (email) => {
      expect(validateContact({ ...valid, email }).email).toBe(
        'Enter a valid email address, like name@example.com.',
      );
    },
  );

  it('needs at least 10 characters in the question', () => {
    expect(validateContact({ ...valid, question: 'Too short' }).question).toBe(
      'Your question needs at least 10 characters.',
    );
    expect(
      validateContact({ ...valid, question: 'Long enough' }).question,
    ).toBeUndefined();
  });
});

describe('submitContact', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('resolves after a simulated delay', async () => {
    const result = submitContact(valid);
    jest.runAllTimers();
    await expect(result).resolves.toBeUndefined();
  });

  it('rejects for the reserved failing address, whatever its case', async () => {
    const result = submitContact({
      ...valid,
      email: FAILING_EMAIL.toUpperCase(),
    });
    jest.runAllTimers();
    await expect(result).rejects.toThrow();
  });
});
