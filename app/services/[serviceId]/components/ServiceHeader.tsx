'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Star, Zap, Globe, Target, BarChart, Shield, Layers } from 'lucide-react';
import type { Service } from '@/lib/services-data';

interface ServiceHeaderProps {
  service: Service;
  imageProps: { src: string; blurDataURL: string };
}

const getCategoryIcon = (subCategory: string) => {
  const icons = { 
    'visibilite': Globe, 'conversion': Target, 'vente': BarChart, 
    'optimisation': Shield, 'growth': Star, 'plateforme': Layers, 'innovation': Zap 
  };
  return icons[subCategory as keyof typeof icons] || Layers;
};

const getCategoryColor = (subCategory: string) => {
  const colors = { 
    'visibilite': 'bg-blue-100 text-blue-800', 'conversion': 'bg-green-100 text-green-800', 
    'vente': 'bg-purple-100 text-purple-800', 'optimisation': 'bg-orange-100 text-orange-800', 
    'growth': 'bg-pink-100 text-pink-800', 'plateforme': 'bg-indigo-100 text-indigo-800', 
    'innovation': 'bg-red-100 text-red-800' 
  };
  return colors[subCategory as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export default function ServiceHeader({ service, imageProps }: ServiceHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const CategoryIcon = getCategoryIcon(service.subCategory);
  const stats = { avgRating: 4.9, totalReviews: 127 };

  return (
    <header className={`text-center lg:text-left transition-all duration-500 ${isScrolled ? 'transform -translate-y-2' : ''}`}>
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
        <div className="relative w-full lg:w-80 aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-rose-powder/20 to-magenta/10 shadow-lg group">
          <Image
            src={imageProps.src}
            alt={`${service.name} - Service ${service.subCategory} professionnel`}
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 320px"
            placeholder="blur"
            blurDataURL={imageProps.blurDataURL}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Badge className={`${getCategoryColor(service.subCategory)} flex items-center gap-2 animate-fade-in`}>
              <CategoryIcon className="w-4 h-4" />
              {service.subCategory}
            </Badge>
            <div className="flex items-center gap-2 animate-fade-in-delay">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(stats.avgRating) ? 'fill-current' : 'text-gray-300'} animate-pulse`} style={{ animationDelay: `${i * 100}ms` }} />
                ))}
              </div>
              <span className="text-sm text-charcoal/70">{stats.avgRating}/5 ({stats.totalReviews} avis)</span>
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-charcoal leading-tight animate-fade-in-up">
            {service.name}
          </h1>
        </div>
      </div>
      <p className="text-xl lg:text-2xl text-charcoal/80 leading-relaxed max-w-4xl animate-fade-in-up-delay">
        {service.description}
      </p>
    </header>
  );
}
