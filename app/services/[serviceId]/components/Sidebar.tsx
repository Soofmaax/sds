'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceDetailActions } from '@/components/services/ServiceDetailActions';
import { Award, Heart, TrendingUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { Service } from '@/lib/services-data';

const TrustBadges = () => (
  <div className="mt-8 bg-rose-powder/10 p-4 rounded-lg">
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="flex flex-col items-center gap-1"><Award className="w-6 h-6 text-magenta" /><span className="text-xs font-medium text-charcoal/80">Qualité Garantie</span></div>
      <div className="flex flex-col items-center gap-1"><Heart className="w-6 h-6 text-magenta" /><span className="text-xs font-medium text-charcoal/80">98% Satisfaits</span></div>
      <div className="flex flex-col items-center gap-1"><TrendingUp className="w-6 h-6 text-magenta" /><span className="text-xs font-medium text-charcoal/80">Résultats Prouvés</span></div>
    </div>
  </div>
);

const LazyRelatedServices = dynamic(() => import('./RelatedServices').then(mod => mod.RelatedServices), {
  loading: () => <div className="h-48 w-full animate-pulse bg-rose-powder/20 rounded-lg mt-8"></div>,
  ssr: false
});

interface SidebarProps {
  service: Service;
  relatedServices: Service[];
  complementaryServices: Service[];
}

export const Sidebar = ({ service, relatedServices, complementaryServices }: SidebarProps) => (
  <aside className="xl:col-span-2">
    <div className="sticky top-24 space-y-8">
      <Card className="border-magenta ring-2 ring-magenta/50 shadow-lg">
        <CardHeader><CardTitle className="font-playfair text-2xl">Passez à l'action</CardTitle></CardHeader>
        <CardContent>
          <ServiceDetailActions service={service} />
          <TrustBadges />
        </CardContent>
      </Card>
      <LazyRelatedServices relatedServices={relatedServices} complementaryServices={complementaryServices} />
    </div>
  </aside>
);
