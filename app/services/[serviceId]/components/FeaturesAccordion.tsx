'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check } from 'lucide-react';

interface Feature { title: string; description: string; }

export const FeaturesAccordion = ({ features }: { features: Feature[] }) => (
  <section>
    <h2 className="text-3xl font-playfair font-bold text-charcoal mb-6">Fonctionnalités et avantages détaillés</h2>
    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
      {features.map((feature, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b-rose-powder/20">
          <AccordionTrigger className="text-lg font-semibold text-charcoal hover:no-underline text-left">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>{feature.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-charcoal/80 pl-8">{feature.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);
