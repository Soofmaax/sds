// Fichier: components/services/ServiceActions.tsx
// Ce composant est un "Client Component" et gère TOUTE la logique des boutons.

'use client';

import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { type Service } from '@/lib/services-data'; // On importe le type
import { toast } from 'sonner'; // On peut utiliser toast ici

interface ServiceActionsProps {
  service: Service;
}

export function ServiceActions({ service }: ServiceActionsProps) {
  // 1. Les fonctions sont définies ICI, dans le Composant Client
  const handleAddToCart = () => {
    console.log(`Ajouté au panier : ${service.name}`);
    toast.success(`${service.name} ajouté au panier !`);
    // Ici, vous ajouteriez la logique du panier (useCart)
  };

  const handleRequestQuote = () => {
    console.log(`Devis demandé pour : ${service.name}`);
    // Ici, vous pourriez ouvrir un modal de contact ou rediriger
  };

  // 2. Les fonctions sont utilisées ICI, dans le même composant
  return (
    <div className="space-y-4">
      <Button 
        size="lg" 
        className="w-full bg-gradient-rose text-white shadow-rose text-lg h-14"
        onClick={handleAddToCart}
      >
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
}
