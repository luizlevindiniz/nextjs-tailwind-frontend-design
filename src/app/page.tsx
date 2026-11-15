import { Categories } from '@/components/categories/Categories';
import { FeaturedCourse } from '@/components/featured-course/FeaturedCourse';
import { Hero } from '@/components/hero/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCourse />
    </>
  );
}
