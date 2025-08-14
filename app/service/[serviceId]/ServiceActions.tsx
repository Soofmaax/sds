'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Mail } from 'lucide-react';
import { useConsentTracking } from '@/hooks/useConsentTracking';
import { Service } from '@/lib/services-data';

interface ServiceActionsProps {
  service: Service;
}

const ServiceActions: React.FC<ServiceActionsProps> = ({ service }) => {
  const { trackEvent } = useConsentTracking();

  const handleAddToCart = () => {
    trackEvent('add_to_cart', { serviceId: service.id, price: service.price });
  };

  const handleRequestQuote = () => {
    trackEvent('generate_lead', { serviceId: service.id });
  };

  return (
    <div>
      <Button 
        size="lg" 
        className="w-full bg-gradient-rose text-white shadow-rose text-lg h-14"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Ajouter au Panier - {service.price.toLocaleString('fr-FR')}€
      </Button>
      <Button 
        size="lg" 
        variant="outline" 
        className="w-full border-magenta text-magenta hover:bg-magenta hover:text-white h-14"
        onClick={handleRequestQuote}
      >
        <Mail className="w-5 h-5 mr-2" />
        Demander un devis gratuit
      </Button>
    </div>
  );
};

export default ServiceActions;
