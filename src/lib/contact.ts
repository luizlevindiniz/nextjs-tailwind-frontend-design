export interface ContactValues {
  name: string;
  email: string;
  question: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const FAILING_EMAIL = 'fail@example.com';

const MIN_QUESTION_LENGTH = 10;
const SIMULATED_DELAY_MS = 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactValues): ContactErrors {
  const name = values.name.trim();
  const email = values.email.trim();
  const question = values.question.trim();
  const errors: ContactErrors = {};

  if (!name) errors.name = 'Enter your full name.';

  if (!email) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(email))
    errors.email = 'Enter a valid email address, like name@example.com.';

  if (!question) errors.question = 'Tell us how we can help.';
  else if (question.length < MIN_QUESTION_LENGTH)
    errors.question = `Your question needs at least ${MIN_QUESTION_LENGTH} characters.`;

  return errors;
}

// There is no backend: this stands in for a request, and the reserved
// address makes the failure path reachable on purpose.
export function submitContact(values: ContactValues): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.email.trim().toLowerCase() === FAILING_EMAIL) {
        reject(new Error('Simulated delivery failure'));
      } else {
        resolve();
      }
    }, SIMULATED_DELAY_MS);
  });
}
