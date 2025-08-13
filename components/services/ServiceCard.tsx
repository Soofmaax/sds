'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Plus, Sparkles, Clock, Star } from 'lucide-react';
import { useCart } from '@/app/providers';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'base' | 'addon';
  features: string[];
  duration?: string;
  popular?: boolean;
  dependencies?: string[];
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { services, addService, removeService } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
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
      } else {
        toast.error('Vous devez d\'abord sélectionner un service de base');
      }
    }
  };

  return (
    <Card 
      className={`service-card relative transition-all duration-300 cursor-pointer ${
        isSelected ? 'ring-2 ring-magenta shadow-rose-lg' : 'hover:shadow-rose border-rose-powder/30'
      } ${service.category === 'addon' && !canAdd ? 'opacity-60' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {service.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-rose text-white shadow-rose">
            <Star className="w-3 h-3 mr-1" />
            Populaire
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="font-playfair text-xl text-charcoal mb-2 flex items-center">
              {service.category === 'addon' && (
                <Plus className="w-4 h-4 mr-2 text-magenta" />
              )}
              {service.name}
            </CardTitle>
            <CardDescription className="text-charcoal/70 leading-relaxed">
              {service.description}
            </CardDescription>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-2xl font-bold text-magenta font-playfair">
            {service.price.toLocaleString('fr-FR')}€
          </div>
          {service.duration && (
            <div className="flex items-center text-sm text-charcoal/60">
              <Clock className="w-4 h-4 mr-1" />
              {service.duration}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="py-4">
        <ul className="space-y-3">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-charcoal/80">{feature}</span>
            </li>
          ))}
        </ul>

        {service.dependencies && service.dependencies.length > 0 && (
          <div className="mt-4 p-3 bg-rose-powder/10 rounded-lg">
            <p className="text-xs text-charcoal/60 mb-2">Nécessite :</p>
            <div className="flex flex-wrap gap-1">
              {service.dependencies.map((dep) => (
                <Badge key={dep} variant="outline" className="text-xs border-magenta/30 text-magenta">
                  {dep === 'site-vitrine' ? 'Site Vitrine' : dep}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          onClick={handleToggleService}
          disabled={service.category === 'addon' && !canAdd}
          className={`w-full transition-all duration-300 ${
            isSelected 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gradient-rose hover:opacity-90 text-white shadow-rose'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Ajouté au panier
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter au panier
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}