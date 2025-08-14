import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { CartSidebar } from '@/components/cart/CartSidebar';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
      <CartSidebar />
    </>
  );
}
