export interface Category {
  title: string;
  description: string;
  href: string;
}

export const categories: readonly Category[] = [
  {
    title: 'Product Design',
    description: 'Turn complex problems into clear, useful experiences.',
    href: '#',
  },
  {
    title: 'Technology',
    description:
      'Build a stronger understanding of the tools shaping digital products.',
    href: '#',
  },
  {
    title: 'Business',
    description:
      'Develop practical skills for better decisions and stronger teams.',
    href: '#',
  },
  {
    title: 'Creative',
    description: 'Explore new ways to communicate, create and tell stories.',
    href: '#',
  },
];
