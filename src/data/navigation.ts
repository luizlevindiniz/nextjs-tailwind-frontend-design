export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: readonly NavLink[] = [
  { label: 'Courses', href: '#categories' },
  { label: 'For Teams', href: '#' },
  { label: 'Community', href: '#people' },
  { label: 'About', href: '#' },
];

export const logInLink: NavLink = { label: 'Log in', href: '#' };

export const startLearningLink: NavLink = {
  label: 'Start learning',
  href: '#',
};
