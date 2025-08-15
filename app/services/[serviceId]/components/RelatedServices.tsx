'use client';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/lib/services-data';

interface RelatedServicesProps {
  relatedServices: Service[];
  complementaryServices: Service[];
}

export const RelatedServices = ({ relatedServices, complementaryServices }: RelatedServicesProps) => (
  <>
    {relatedServices.length > 0 && (
      <section>
        <h3 className="text-xl font-playfair font-bold text-charcoal mb-4">Services similaires</h3>
        <div className="space-y-4">
          {relatedServices.map(related => (
            <Card key={related.id} className="border-rose-powder/20">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex-1"><p className="font-semibold text-charcoal">{related.name}</p><p className="text-sm text-magenta">{related.price.toLocaleString('fr-FR')}€</p></div>
                <Link href={`/services/${related.id}`}><Button variant="ghost" size="icon"><ArrowRight className="w-4 h-4" /></Button></Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )}
    {/* ... code pour complementaryServices ... */}
  </>
);
