export interface Stat {
  value: string;
  label: string;
}

export const stats: readonly Stat[] = [
  { value: '24K+', label: 'active learners' },
  { value: '120+', label: 'expert-led courses' },
  { value: '92%', label: 'complete their first course' },
];
