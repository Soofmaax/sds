// 🏆 Template EXPERT LEVEL - Toutes optimisations Senior intégrées

import { notFound, redirect } from 'next/navigation';
import { Suspense, cache } from 'react';
import { allServices, type Service } from '@/lib/services-data';
import { 
  Check, Clock, Users, BarChart, ArrowRight, Star, Shield, Zap, Globe, 
  Phone, Mail, Download, Play, ExternalLink, ChevronRight, Trophy, Target, Layers,
  ShoppingCart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { existsSync } from 'fs';
import { join } from 'path';
import { useState } from 'react'; // Ajouté pour la gestion des états dans les composants Client

// ============================================================================
// 🧮 PARTIE 1: CALCULS CACHÉS ET OPTIMISÉS
// ============================================================================

const getServiceAnalytics = cache((serviceId: string) => {
  const service = allServices.find(s => s.id === serviceId);
  if (!service) return null;

  const categoryServices = allServices.filter(s => s.subCategory === service.subCategory);
  const avgPrice = Math.round(categoryServices.reduce((acc, s) => acc + s.price, 0) / categoryServices.length);
  const relatedServices = categoryServices.filter(s => s.id !== serviceId).slice(0, 3);
  const complementaryServices = service.category === 'base' 
    ? allServices.filter(s => s.dependencies?.includes(serviceId)).slice(0, 4)
    : [];
  
  // Calculs pour rich snippets
  const totalReviews = 127; // À remplacer par vraies données
  const avgRating = 4.9;
  const deliveredProjects = 500;
  const satisfactionRate = 98;

  return {
    service,
    avgPrice,
    relatedServices,
    complementaryServices,
    categoryServices,
    stats: {
      totalReviews,
      avgRating,
      deliveredProjects,
      satisfactionRate
    }
  };
});

// Vérification existence images avec fallbacks
const getVerifiedImage = (imagePath: string, fallback: string = '/images/services/default-service.jpg'): string => {
  if (process.env.NODE_ENV === 'development') {
    return imagePath;
  }
  try {
    const fullPath = join(process.cwd(), 'public', imagePath);
    return existsSync(fullPath) ? imagePath : fallback;
  } catch {
    return fallback;
  }
};

// ============================================================================
// 🌍 PARTIE 2: GESTION MULTILINGUE ET REDIRECTIONS
// ============================================================================

const URL_REDIRECTS: Record<string, string> = {
  'site-web': 'site-vitrine',
  'ecommerce': 'site-ecommerce',
  'seo': 'seo-avance',
  'ia': 'chatbot-ia',
  'marketplace': 'marketplace',
};

const SUPPORTED_LOCALES = ['fr', 'en'] as const;
const getAlternateUrls = (serviceId: string) => {
  const alternates: Record<string, string> = {};
  SUPPORTED_LOCALES.forEach(locale => {
    alternates[`${locale}-${locale.toUpperCase()}`] = `/${locale === 'fr' ? '' : locale + '/'}service/${serviceId}`;
  });
  return alternates;
};

// ============================================================================
// 🎨 PARTIE 3: COMPOSANT IMAGE AVEC GESTION DU FALLBACK
// ============================================================================

const FallbackImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      src={imageError ? '/images/services/default-service.jpg' : src}
      alt={alt}
      fill
      priority
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 320px"
      onError={() => setImageError(true)}
    />
  );
};

// ============================================================================
// 🎯 PARTIE 4: PAGE PRINCIPALE
// ============================================================================

export async function generateStaticParams() {
  const params = allServices.map(service => ({ serviceId: service.id }));
  Object.keys(URL_REDIRECTS).forEach(oldId => {
    params.push({ serviceId: oldId });
  });
  return params;
}

export async function generateMetadata({ params }: { params: { serviceId: string } }): Promise<Metadata> {
  if (URL_REDIRECTS[params.serviceId]) {
    redirect(`/service/${URL_REDIRECTS[params.serviceId]}`);
  }

  const analytics = getServiceAnalytics(params.serviceId);
  if (!analytics) {
    return {
      title: 'Service non trouvé | Erreur 404',
      description: 'Le service recherché n\'existe pas. Découvrez notre catalogue complet.',
      robots: { index: false, follow: false }
    };
  }

  const { service, avgPrice, stats } = analytics;
  const heroImage = getVerifiedImage(`/images/services/${service.id}-og.jpg`);
  const canonical = `/service/${service.id}`;
  const alternateUrls = getAlternateUrls(service.id);

  return {
    title: `${service.name} - ${service.price}€ | Expert ${service.subCategory} | Agence Web`,
    description: `${service.description} 🚀 À partir de ${service.price}€ ${service.duration ? `⏱ ${service.duration}` : ''} ✅ ${service.features.length} fonctions ⭐ ${stats.avgRating}/5 (${stats.totalReviews} avis) 📞 Devis gratuit 24h`,
    openGraph: {
      title: `${service.name} | Service ${service.subCategory} - ${service.price}€`,
      description: `${service.description.slice(0, 120)}... Prix moyen catégorie: ${avgPrice}€. Note: ${stats.avgRating}/5`,
      url: canonical,
      siteName: 'Votre Agence Web',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: `${service.name} - Service ${service.subCategory} professionnel`,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical,
      languages: alternateUrls,
    },
  };
}

export default function ServiceDetailPage({ params }: { params: { serviceId: string } }) {
  if (URL_REDIRECTS[params.serviceId]) {
    redirect(`/service/${URL_REDIRECTS[params.serviceId]}`);
  }

  const analytics = getServiceAnalytics(params.serviceId);
  if (!analytics) {
    notFound();
    return null;
  }

  const { service, avgPrice, stats } = analytics;

  return (
    <article className="bg-cream min-h-screen" itemScope itemType="https://schema.org/Service">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <header className="text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
            <div className="relative w-full lg:w-80 aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-rose-powder/20 to-magenta/10 shadow-lg">
              <FallbackImage
                src={`/images/services/${service.id}-hero.jpg`}
                alt={`${service.name} - Service ${service.subCategory} professionnel`}
              />
            </div>
            <div className="flex-1 space-y-4">
              <Badge className="bg-blue-100 text-blue-800 flex items-center gap-2">
                <Star className="w-4 h-4" />
                {service.subCategory}
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-charcoal leading-tight" itemProp="name">
                {service.name}
              </h1>
              <p className="text-xl lg:text-2xl text-charcoal/80 leading-relaxed max-w-4xl" itemProp="description">
                {service.description}
              </p>
            </div>
          </div>
        </header>
      </div>
    </article>
  );
}
