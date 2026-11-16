import { render, screen } from '@testing-library/react';

import { AvatarStack } from '@/components/ui/AvatarStack';

import learner1 from '@/assets/images/avatars/learner-1.jpg';
import learner2 from '@/assets/images/avatars/learner-2.jpg';

describe('AvatarStack', () => {
  it('renders each avatar as a decorative image at the given size', () => {
    const { container } = render(
      <AvatarStack avatars={[learner1, learner2]} size={40} />,
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
    images.forEach((image) => {
      expect(image).toHaveAttribute('alt', '');
      expect(image).toHaveAttribute('width', '40');
      expect(image).toHaveAttribute('height', '40');
    });
  });
});
