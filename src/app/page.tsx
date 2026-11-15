import { Categories } from '@/components/categories/Categories';
import { Contact } from '@/components/contact/Contact';
import { FeaturedCourse } from '@/components/featured-course/FeaturedCourse';
import { FinalCta } from '@/components/final-cta/FinalCta';
import { Hero } from '@/components/hero/Hero';
import { HowItWorks } from '@/components/how-it-works/HowItWorks';
import { People } from '@/components/people/People';
import { Testimonial } from '@/components/testimonial/Testimonial';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCourse />
      <HowItWorks />
      <Testimonial />
      <People />
      <Contact />
      <FinalCta />
    </>
  );
}
