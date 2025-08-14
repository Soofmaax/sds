// Fichier: components/services/ServiceCard.tsx
// Rôle: Gère la logique client (panier, clics) et utilise le Presenter pour l'affichage.

'use client'; // La directive est ici, au plus près de l'interactivité.

import { useCart } from '@/app/providers';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Check, Plus } from 'lucide-react';
import Link from 'next/link';
import { ServiceCardPresenter, Service } from './ServiceCardPresenter'; // On importe le visuel

// On ré-exporte le type pour que les pages n'aient qu'à importer depuis ce fichier
export type { Service };

interface ServiceCardProps {
  service: Service;
  className?: string;
  priority?: boolean;
}

export function ServiceCard({ service, className, priority }: ServiceCardProps) {
  const { services, addService, removeService } = useCart();
  const isSelected = services.some(s => s.id === service.id);
  
  const canAdd = service.category === 'base' || 
    (service.dependencies && service.dependencies.some(dep => services.some(s => s.id === dep)));

  const handleToggleService = () => {
    if (isSelected) {
      removeService(service.id);
      toast.success(`${service.name} retiré du panier`);
    } else {
      if (canAdd) {
        addService(service);
        toast.success(`${service.name} ajouté au panier`);
      } else {
        toast.error('Vous devez d\'abord sélectionner un service de base compatible.');
      }
    }
  };

  return (
    <ServiceCardPresenter 
      service={service} 
      isSelected={isSelected}
      className={className}
      priority={priority}
    >
      {/* On injecte les boutons interactifs comme enfants dans le Presenter */}
      <Button 
        onClick={handleToggleService} 
        disabled={service.category === 'addon' && !canAdd}
        className={`w-full transition-all duration-300 ${
          isSelected 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-gradient-rose hover:opacity-90 text-white shadow-rose'
        }`}
        aria-label={isSelected ? `Retirer ${service.name} du panier` : `Ajouter ${service.name} au panier`}
      >
        {isSelected ? (
          <><Check className="w-4 h-4 mr-2" /> Ajouté</>
        ) : (
          <><Plus className="w-4 h-4 mr-2" /> Ajouter</>
        )}
      </Button>
      <Link 
        href={`/services/${service.id}`}
        className="w-full text-center py-1.5 px-3 text-sm border border-magenta/30 text-magenta hover:bg-magenta hover:text-white rounded-md transition-all duration-300"
      >
        Détails
      </Link>
    </ServiceCardPresenter>
  );
}
