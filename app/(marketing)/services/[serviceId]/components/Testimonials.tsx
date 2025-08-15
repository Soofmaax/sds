'use client';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface TestimonialData { name: string; role: string; quote: string; avatar: string; }

export const Testimonials = ({ testimonials }: { testimonials: TestimonialData[] }) => {
  if (!testimonials || testimonials.length === 0) return null;
  return (
    <section>
      <h2 className="text-3xl font-playfair font-bold text-charcoal mb-8">Ce que nos clients disent</h2>
      <div className="space-y-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white/50 border-rose-powder/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Image src={testimonial.avatar} alt={`Avatar de ${testimonial.name}`} width={48} height={48} className="rounded-full" />
                <div className="flex-1">
                  <blockquote className="text-charcoal/80 italic">"{testimonial.quote}"</blockquote>
                  <footer className="mt-4 font-semibold text-charcoal">{testimonial.name}, <span className="font-normal text-charcoal/70">{testimonial.role}</span></footer>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
