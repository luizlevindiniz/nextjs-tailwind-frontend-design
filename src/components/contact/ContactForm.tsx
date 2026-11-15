'use client';

import { type ChangeEvent, type SubmitEvent, useId, useState } from 'react';

import {
  type ContactErrors,
  type ContactValues,
  submitContact,
  validateContact,
} from '@/lib/contact';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/Button';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

interface FieldConfig {
  name: keyof ContactValues;
  label: string;
  placeholder: string;
  autoComplete: string;
  type?: 'text' | 'email';
  multiline?: boolean;
}

const fields: readonly FieldConfig[] = [
  {
    name: 'name',
    label: 'Full name',
    placeholder: 'Your name',
    autoComplete: 'name',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'youremail@example.com',
    autoComplete: 'email',
    type: 'email',
  },
  {
    name: 'question',
    label: 'Your question',
    placeholder: 'Tell us how we can help...',
    autoComplete: 'off',
    multiline: true,
  },
];

const emptyValues: ContactValues = { name: '', email: '', question: '' };

const controlClasses =
  'w-full rounded-lg bg-background-light-yellow inset-ring inset-ring-line-input px-4 text-mobile-subtitle-1 text-text-primary outline-primary-blue placeholder:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 aria-invalid:inset-ring-error lg:text-desktop-body-1';

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [validateLive, setValidateLive] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const sending = status === 'sending';

  const fieldId = (name: keyof ContactValues) => `${id}-${name}`;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const next = { ...values, [event.target.name]: event.target.value };
    setValues(next);
    if (validateLive) setErrors(validateContact(next));
    if (!sending) setStatus('idle');
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    const found = validateContact(values);
    setErrors(found);
    setValidateLive(true);
    const firstInvalid = fields.find((field) => found[field.name]);
    if (firstInvalid) {
      setStatus('idle');
      document.getElementById(fieldId(firstInvalid.name))?.focus();
      return;
    }

    setStatus('sending');
    try {
      await submitContact(values);
      setValues(emptyValues);
      setValidateLive(false);
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  return (
    <form
      aria-labelledby={`${id}-title`}
      noValidate
      onSubmit={handleSubmit}
      className='flex flex-col'
    >
      <div className='mb-6 flex flex-col gap-2'>
        <h3
          id={`${id}-title`}
          className='font-heading text-desktop-h5 text-text-primary'
        >
          Contact us
        </h3>
        <p className='text-mobile-body-1 text-text-secondary lg:text-desktop-body-1'>
          Fill out the fields and we will get in touch.
        </p>
      </div>

      <div className='mb-6 flex flex-col gap-5'>
        {fields.map((field) => {
          const error = errors[field.name];
          const controlProps = {
            id: fieldId(field.name),
            name: field.name,
            value: values[field.name],
            placeholder: field.placeholder,
            autoComplete: field.autoComplete,
            required: true,
            readOnly: sending,
            'aria-invalid': error ? true : undefined,
            'aria-describedby': error
              ? `${fieldId(field.name)}-error`
              : undefined,
            onChange: handleChange,
          };

          return (
            <div key={field.name} className='flex flex-col gap-2'>
              <label
                htmlFor={fieldId(field.name)}
                className='text-mobile-body-1 font-bold text-text-primary lg:text-desktop-body-1'
              >
                {field.label}
              </label>
              {field.multiline ? (
                <textarea
                  {...controlProps}
                  className={cn(controlClasses, 'h-25 resize-y py-3.5 lg:h-30')}
                />
              ) : (
                <input
                  {...controlProps}
                  type={field.type ?? 'text'}
                  className={cn(controlClasses, 'py-2.75 lg:py-3')}
                />
              )}
              {error && (
                <p
                  id={`${fieldId(field.name)}-error`}
                  className='text-mobile-body-1 text-error lg:text-desktop-body-1'
                >
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Always rendered: a live region must already be in the accessibility tree to be announced. */}
      <div role='status'>
        {status === 'sent' && (
          <p className='mb-6 rounded-lg bg-primary-blue-light px-4 py-3 text-mobile-body-1 text-text-primary lg:text-desktop-body-1'>
            Thanks! Your message is on its way. We’ll reply within 24 hours on
            business days.
          </p>
        )}
      </div>
      {status === 'failed' && (
        <p
          role='alert'
          className='mb-6 rounded-lg border border-error px-4 py-3 text-mobile-body-1 text-error lg:text-desktop-body-1'
        >
          We couldn’t send your message. Please try again in a moment.
        </p>
      )}
      <Button
        type='submit'
        aria-disabled={sending || undefined}
        className='w-full aria-disabled:cursor-wait'
      >
        {sending ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
