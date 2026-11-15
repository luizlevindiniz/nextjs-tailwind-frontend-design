import type { NavLink } from '@/data/navigation';

export interface FooterGroup {
  title: string;
  links: readonly NavLink[];
}

export const footerNav: readonly FooterGroup[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Courses', href: '#categories' },
      { label: 'Categories', href: '#categories' },
      { label: 'Instructors', href: '#people' },
      { label: 'For Teams', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Journal', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact', href: '#contact' },
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
];
