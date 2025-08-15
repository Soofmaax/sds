'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Service } from '@/lib/services-data';

export const StickyCTA = ({ service }: { service: Service }) => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-cream/90 backdrop-blur-sm p-4 border-t border-rose-powder/30 z-40 animate-slide-in-bottom">
    <div className="flex items-center justify-between gap-4">
      <div><span className="font-bold text-lg text-charcoal">{service.name}</span><p className="text-magenta font-semibold">{service.price.toLocaleString('fr-FR')}€</p></div>
      <Button asChild className="bg-gradient-rose text-white shadow-rose flex-shrink-0"><Link href="/contact">Demander un devis</Link></Button>
    </div>
  </div>
);
