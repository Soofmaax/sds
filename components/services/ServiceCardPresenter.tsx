// Fichier: components/services/ServiceCardPresenter.tsx
// Rôle: Affiche la carte de service. Composant Serveur, "bête" et réutilisable.

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// On exporte l'interface pour la partager
export interface Service {
  id: string; name: string; description: string; price: number; category: 'base' | 'addon';
  subCategory: string; features: string[]; duration?: string; popular?: boolean; dependencies?: string[];
  imageUrl?: string;
}

interface ServiceCardPresenterProps {
  service: Service;
  isSelected: boolean;
  children: React.ReactNode; // Pour injecter les boutons interactifs
  className?: string;
  priority?: boolean;
}

// Fonction pour obtenir l'image (ne change pas)
const getServiceImage = (service: Service): string => {
  const imageMap: Record<string, string> = {
    'visibilite': '/images/services/seo-visibility.jpg',
    'conversion': '/images/services/conversion-optimization.jpg',
    'vente': '/images/services/ecommerce-sales.jpg',
    'optimisation': '/images/services/performance-optimization.jpg',
    'growth': '/images/services/business-growth.jpg',
    'plateforme': '/images/services/platform-development.jpg',
    'innovation': '/images/services/innovation-tech.jpg'
  };
  return service.imageUrl || imageMap[service.subCategory] || '/images/services/default-service.jpg';
};

export function ServiceCardPresenter({ service, isSelected, children, className, priority }: ServiceCardPresenterProps) {
  return (
    <Card className={cn(
      "flex flex-col h-full transition-all duration-300 relative",
      isSelected 
        ? 'ring-2 ring-magenta shadow-rose-lg bg-rose-powder/5' 
        : 'hover:shadow-rose border-rose-powder/30 hover:border-magenta/30',
      className
    )}>
      <CardHeader className="pb-4">
        {service.popular && (
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-rose text-white shadow-rose z-10">
            <Star className="w-3 h-3 mr-1" /> Populaire
          </Badge>
        )}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-rose-powder/10">
          <Image
            src={getServiceImage(service)}
            alt={`Illustration pour le service ${service.name}`}
            fill
            className="object-cover"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <Link href={`/services/${service.id}`} className="group">
          <CardTitle className="font-playfair text-lg text-charcoal group-hover:text-magenta transition-colors line-clamp-2">
            {service.name}
          </CardTitle>
        </Link>
        <span className="font-bold text-magenta text-lg pt-1">
          {service.price.toLocaleString('fr-FR')}€
        </span>
      </CardHeader>

      <CardContent className="flex-grow py-0">
        <CardDescription className="text-charcoal/70 leading-relaxed line-clamp-3">
          {service.description}
        </CardDescription>
        <ul className="space-y-2 mt-4">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Check className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-sm text-charcoal/80">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4 mt-auto flex flex-col gap-2">
        {/* Les boutons interactifs (gérés par le composant Client) seront injectés ici */}
        {children}
      </CardFooter>
    </Card>
  );
}
