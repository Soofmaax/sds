// Fichier: components/services/ServiceCard.tsx
// Version SEO Premium avec microdata, accessibilité et performance

'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Plus, Clock, Star, ExternalLink, Info } from 'lucide-react';
import { useCart } from '@/app/providers';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';

// Interface enrichie avec métadonnées SEO
export interface Service {
  id: string; name: string; description: string; price: number; category: 'base' | 'addon';
  subCategory: string; features: string[]; duration?: string; popular?: boolean; dependencies?: string[];
  // Nouvelles propriétés pour le SEO (optionnelles pour compatibilité)
  imageUrl?: string; shortDescription?: string; tags?: string[]; rating?: number; reviewCount?: number;
}

interface ServiceCardProps {
  service: Service;
  viewMode?: 'grid' | 'list';
  priority?: boolean;
  showFullFeatures?: boolean;
  className?: string;
}

// Fonction utilitaire pour générer les données structurées
const generateServiceStructuredData = (service: Service) => ({
  "@type": "Service",
  "@id": `#service-${service.id}`,
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": "Votre Agence Web"
  },
  "serviceType": service.subCategory,
  "category": service.category === 'base' ? 'Service Principal' : 'Service Complémentaire',
  "offers": {
    "@type": "Offer",
    "price": service.price,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // Valide 1 an
    "seller": {
      "@type": "Organization",
      "name": "Votre Agence Web"
    }
  },
  // Ajout du rating si disponible
  ...(service.rating && service.reviewCount && {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": service.rating,
      "reviewCount": service.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    }
  })
});

// Fonction pour générer l'URL de l'image par défaut selon le type de service
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

export function ServiceCard({ 
  service, 
  viewMode = 'grid', 
  priority = false, 
  showFullFeatures = false,
  className = ''
}: ServiceCardProps) {
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
        addService({ ...service, isSelected: true });
        toast.success(`${service.name} ajouté au panier`);
        
        // Analytics tracking
        // gtag('event', 'add_to_cart', {
        //   currency: 'EUR',
        //   value: service.price,
        //   items: [{ item_id: service.id, item_name: service.name, category: service.subCategory, price: service.price }]
        // });
      } else {
        toast.error('Vous devez d\'abord sélectionner un service de base compatible');
      }
    }
  };

  // Génération des tags SEO automatiques
  const serviceTags = [
    service.subCategory,
    service.category === 'base' ? 'Service Principal' : 'Extension',
    ...(service.features.slice(0, 3).map(f => f.split(' ')[0])), // Premiers mots des features
    `${service.price}€`,
    ...(service.tags || [])
  ];

  // --- VUE EN LISTE OPTIMISÉE SEO ---
  if (viewMode === 'list') {
    return (
      <article 
        className={`flex flex-col lg:flex-row gap-6 items-start w-full p-6 bg-white rounded-xl border border-rose-powder/30 hover:border-magenta/30 transition-all duration-300 hover:shadow-rose ${className}`}
        itemScope 
        itemType="https://schema.org/Service"
        id={`service-${service.id}`}
      >
        {/* Métadonnées cachées pour le SEO */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceStructuredData(service)) }}
        />
        <meta itemProp="serviceType" content={service.subCategory} />
        <meta itemProp="provider" content="Votre Agence Web" />
        
        {/* Image du service */}
        <div className="w-full lg:w-48 flex-shrink-0">
          <div className="relative aspect-video lg:aspect-square rounded-lg overflow-hidden bg-rose-powder/10">
            <Image
              src={getServiceImage(service)}
              alt={`Service ${service.name} - ${service.shortDescription || service.description}`}
              fill
              className="object-cover"
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 192px"
              itemProp="image"
            />
            {service.popular && (
              <Badge className="absolute top-3 right-3 bg-gradient-rose text-white shadow-lg">
                <Star className="w-3 h-3 mr-1" />
                <span>Populaire</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          <header className="mb-4">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <Link 
                href={`/services/${service.id}`} 
                className="group flex items-center gap-2"
                aria-label={`Découvrir le service ${service.name}`}
              >
                <h3 
                  className="font-playfair text-xl lg:text-2xl text-charcoal group-hover:text-magenta transition-colors"
                  itemProp="name"
                >
                  {service.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-charcoal/40 group-hover:text-magenta transition-colors" />
              </Link>
              
              <div className="flex items-center gap-3">
                <span 
                  className="font-bold text-magenta text-xl lg:text-2xl"
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <span itemProp="price">{service.price.toLocaleString('fr-FR')}</span>
                  <span itemProp="priceCurrency" content="EUR">€</span>
                </span>
                {service.duration && (
                  <span className="flex items-center text-sm text-charcoal/60 bg-rose-powder/10 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 mr-1.5" />
                    <span>{service.duration}</span>
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-charcoal/70 leading-relaxed mb-4 line-clamp-2" itemProp="description">
              {service.description}
            </p>
            
            {/* Tags de service */}
            <div className="flex flex-wrap gap-2 mb-4">
              {serviceTags.slice(0, 4).map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs bg-rose-powder/10 text-charcoal/70 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Fonctionnalités clés */}
          <div className="mb-6">
            <h4 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Fonctionnalités incluses :
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" itemProp="includesObject">
              {(showFullFeatures ? service.features : service.features.slice(0, 4)).map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-charcoal/80">{feature}</span>
                </li>
              ))}
              {!showFullFeatures && service.features.length > 4 && (
                <li className="text-sm text-charcoal/60 italic col-span-full">
                  +{service.features.length - 4} autres fonctionnalités...
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-3">
          <Button 
            onClick={handleToggleService} 
            disabled={service.category === 'addon' && !canAdd}
            className={`w-full transition-all duration-300 ${
              isSelected 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' 
                : 'bg-gradient-rose hover:opacity-90 text-white shadow-rose'
            }`}
            aria-label={isSelected ? `Retirer ${service.name} du panier` : `Ajouter ${service.name} au panier`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                <span>Ajouté au panier</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                <span>Ajouter au panier</span>
              </>
            )}
          </Button>
          
          <Link 
            href={`/services/${service.id}`}
            className="w-full text-center py-2 px-4 border border-magenta text-magenta hover:bg-magenta hover:text-white rounded-lg transition-all duration-300"
          >
            En savoir plus
          </Link>
        </div>
      </article>
    );
  }

  // --- VUE EN GRILLE OPTIMISÉE SEO ---
  return (
    <Card 
      className={`flex flex-col h-full transition-all duration-300 relative ${
        isSelected 
          ? 'ring-2 ring-magenta shadow-rose-lg bg-rose-powder/5' 
          : 'hover:shadow-rose border-rose-powder/30 hover:border-magenta/30'
      } ${className}`}
      itemScope 
      itemType="https://schema.org/Service"
      id={`service-${service.id}`}
    >
      {/* Métadonnées SEO */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceStructuredData(service)) }}
      />
      <meta itemProp="serviceType" content={service.subCategory} />
      <meta itemProp="provider" content="Votre Agence Web" />

      <CardHeader className="relative pb-4">
        {/* Badge populaire */}
        {service.popular && (
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-rose text-white shadow-rose z-10">
            <Star className="w-3 h-3 mr-1" />
            <span>Populaire</span>
          </Badge>
        )}

        {/* Image du service */}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-rose-powder/10">
          <Image
            src={getServiceImage(service)}
            alt={`Service ${service.name}`}
            fill
            className="object-cover"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            itemProp="image"
          />
        </div>

        {/* Titre et prix */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <Link 
            href={`/services/${service.id}`} 
            className="group flex-1"
            aria-label={`Découvrir le service ${service.name}`}
          >
            <CardTitle 
              className="font-playfair text-lg text-charcoal group-hover:text-magenta transition-colors line-clamp-2"
              itemProp="name"
            >
              {service.name}
            </CardTitle>
          </Link>
          
          <span 
            className="font-bold text-magenta text-lg flex-shrink-0"
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <span itemProp="price">{service.price.toLocaleString('fr-FR')}</span>
            <span itemProp="priceCurrency" content="EUR">€</span>
          </span>
        </div>

        <CardDescription className="text-charcoal/70 leading-relaxed line-clamp-3" itemProp="description">
          {service.description}
        </CardDescription>

        {/* Informations complémentaires */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-rose-powder/20">
          {service.duration && (
            <span className="flex items-center text-xs text-charcoal/60">
              <Clock className="w-3 h-3 mr-1" />
              {service.duration}
            </span>
          )}
          <span className="text-xs bg-rose-powder/10 text-charcoal/70 px-2 py-1 rounded-full">
            {service.subCategory}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-grow py-4" itemProp="includesObject">
        <h4 className="sr-only">Fonctionnalités du service {service.name}</h4>
        <ul className="space-y-2">
          {service.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Check className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-sm text-charcoal/80 line-clamp-2">{feature}</span>
            </li>
          ))}
          {service.features.length > 4 && (
            <li className="text-xs text-charcoal/60 italic pt-1">
              +{service.features.length - 4} autres fonctionnalités...
            </li>
          )}
        </ul>
      </CardContent>

      <CardFooter className="pt-4 mt-auto flex flex-col gap-2">
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
            <>
              <Check className="w-4 h-4 mr-2" />
              <span>Ajouté</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              <span>Ajouter</span>
            </>
          )}
        </Button>

        <Link 
          href={`/services/${service.id}`}
          className="w-full text-center py-1.5 px-3 text-sm border border-magenta/30 text-magenta hover:bg-magenta hover:text-white rounded-md transition-all duration-300"
        >
          Détails
        </Link>
      </CardFooter>
    </Card>
  );
}