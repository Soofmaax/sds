// app/service/[serviceId]/page.tsx
// 🚀 Template SENIOR - Dev Expert + SEO Master Level

import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';
import { allServices, type Service } from '@/lib/services-data';
import { 
  Check, Clock, Users, BarChart, ArrowRight, Star, Shield, Zap, Globe, 
  Phone, Mail, Download, Play, ExternalLink, ChevronRight, Trophy, Target, Layers
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

// ============================================================================
// 🎯 PARTIE 1: GÉNÉRATION STATIQUE + REDIRECTIONS INTELLIGENTES
// ============================================================================

export async function generateStaticParams() {
  // Génère toutes les pages à build time pour performance maximale
  return allServices.map((service) => ({
    serviceId: service.id,
  }));
}

// Redirections SEO pour anciennes URLs ou variantes
const URL_REDIRECTS: Record<string, string> = {
  'site-web': 'site-vitrine',
  'ecommerce': 'site-ecommerce',
  'seo': 'seo-avance',
  'ia': 'chatbot-ia',
};

// ============================================================================
// 🔍 PARTIE 2: MÉTADONNÉES SEO EXPERT LEVEL
// ============================================================================

export async function generateMetadata({ params }: { params: { serviceId: string } }): Promise<Metadata> {
  // Gestion des redirections avant génération metadata
  if (URL_REDIRECTS[params.serviceId]) {
    redirect(`/service/${URL_REDIRECTS[params.serviceId]}`);
  }

  const service = allServices.find((s) => s.id === params.serviceId);
  
  if (!service) {
    return {
      title: 'Service non trouvé | Erreur 404',
      description: 'Le service recherché n\'existe pas. Découvrez notre catalogue complet de services web.',
      robots: { index: false, follow: false }
    };
  }

  // Calculs SEO intelligents
  const relatedCount = allServices.filter(s => s.subCategory === service.subCategory).length - 1;
  const avgPrice = Math.round(allServices.filter(s => s.subCategory === service.subCategory)
    .reduce((acc, s) => acc + s.price, 0) / allServices.filter(s => s.subCategory === service.subCategory).length);
  
  const seoKeywords = [
    service.name,
    `${service.subCategory} professionnel`,
    `service ${service.category}`,
    ...service.features.slice(0, 3).map(f => f.toLowerCase()),
    `développement ${service.subCategory}`,
    `prix ${service.price}€`,
    service.duration || 'livraison rapide'
  ];

  const canonical = `/service/${service.id}`;
  const imageUrl = `/images/services/${service.id}-og.jpg`;

  return {
    title: `${service.name} - ${service.price}€ | Expert ${service.subCategory} | Agence Web`,
    description: `${service.description} 🚀 À partir de ${service.price}€ ${service.duration ? `⏱️ Livré en ${service.duration}` : ''} ✅ ${service.features.length} fonctionnalités incluses ${relatedCount > 0 ? `📊 ${relatedCount} services complémentaires` : ''}`,
    
    keywords: seoKeywords,
    
    authors: [{ name: 'Votre Agence Web', url: '/' }],
    creator: 'Votre Agence Web',
    publisher: 'Votre Agence Web',
    
    openGraph: {
      title: `${service.name} | Service ${service.subCategory} - ${service.price}€`,
      description: `${service.description.slice(0, 150)}... Prix moyen catégorie: ${avgPrice}€`,
      url: canonical,
      siteName: 'Votre Agence Web',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${service.name} - Service ${service.subCategory} professionnel`,
        },
        {
          url: `/images/services/${service.id}-square.jpg`,
          width: 800,
          height: 800,
          alt: `Icône ${service.name}`,
        }
      ],
      locale: 'fr_FR',
      type: 'website',
      tags: seoKeywords,
    },
    
    twitter: {
      card: 'summary_large_image',
      title: `🚀 ${service.name} | ${service.price}€`,
      description: `${service.description.slice(0, 140)}...`,
      images: [imageUrl],
      site: '@VotreAgence',
      creator: '@VotreAgence',
    },
    
    alternates: {
      canonical,
      languages: {
        'fr-FR': canonical,
        'en-US': `/en/service/${service.id}`, // Si multilingue
      }
    },
    
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    verification: {
      google: 'votre-google-verification-code', // À remplacer
      yandex: 'votre-yandex-verification',
      yahoo: 'votre-yahoo-verification',
    },
    
    category: service.subCategory,
  };
}

// ============================================================================
// 🏗️ PARTIE 3: DONNÉES STRUCTURÉES SCHEMA.ORG COMPLÈTES
// ============================================================================

const generateAdvancedStructuredData = (service: Service, relatedServices: Service[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://votre-site.com';
  const serviceUrl = `${baseUrl}/service/${service.id}`;
  const imageUrl = `${baseUrl}/images/services/${service.id}-hero.jpg`;
  
  // Calculs pour enrichir les données
  const avgPrice = Math.round(allServices.filter(s => s.subCategory === service.subCategory)
    .reduce((acc, s) => acc + s.price, 0) / allServices.filter(s => s.subCategory === service.subCategory).length);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. WebPage avec navigation complète
      {
        "@type": "WebPage",
        "@id": serviceUrl,
        "name": `${service.name} | Service ${service.subCategory}`,
        "description": service.description,
        "url": serviceUrl,
        "inLanguage": "fr-FR",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${baseUrl}/`,
          "name": "Votre Agence Web",
          "url": baseUrl,
          "publisher": {
            "@type": "Organization",
            "@id": `${baseUrl}/#organization`
          }
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": baseUrl
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "Services",
              "item": `${baseUrl}/services`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": service.subCategory,
              "item": `${baseUrl}/services?filter=${service.subCategory}`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": service.name,
              "item": serviceUrl
            }
          ]
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "xpath": ["/html/head/title", "//*[@id='service-description']"]
        }
      },

      // 2. Service principal avec détails complets
      {
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        "name": service.name,
        "description": service.description,
        "image": imageUrl,
        "url": serviceUrl,
        "serviceType": service.subCategory,
        "category": `Service ${service.category === 'base' ? 'Principal' : 'Complémentaire'}`,
        "areaServed": {
          "@type": "Country",
          "name": "France"
        },
        "availableLanguage": "French",
        "provider": {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          "name": "Votre Agence Web",
          "url": baseUrl,
          "logo": `${baseUrl}/images/logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33-1-23-45-67-89",
            "contactType": "customer service",
            "availableLanguage": "French",
            "areaServed": "FR"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `Fonctionnalités ${service.name}`,
          "itemListElement": service.features.map((feature, index) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": feature,
              "description": `${feature} inclus dans ${service.name}`
            }
          }))
        },
        "audience": {
          "@type": "Audience",
          "audienceType": service.category === 'base' ? 'Entreprises' : 'Entreprises avec besoins avancés'
        }
      },

      // 3. Offre commerciale détaillée
      {
        "@type": "Offer",
        "@id": `${serviceUrl}#offer`,
        "name": `Offre ${service.name}`,
        "description": `Service ${service.name} au prix de ${service.price}€`,
        "price": service.price,
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString(),
        "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        "itemOffered": {
          "@id": `${serviceUrl}#service`
        },
        "seller": {
          "@id": `${baseUrl}/#organization`
        },
        "businessFunction": "https://schema.org/Sell",
        "warranty": "Garantie satisfaction 30 jours",
        ...(service.duration && {
          "deliveryLeadTime": {
            "@type": "QuantitativeValue",
            "value": service.duration
          }
        }),
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": service.price,
          "priceCurrency": "EUR",
          "valueAddedTaxIncluded": true
        }
      },

      // 4. FAQ enrichie pour rich snippets
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Quel est le prix de ${service.name} ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Le service ${service.name} coûte ${service.price}€. Le prix moyen pour cette catégorie (${service.subCategory}) est de ${avgPrice}€. Tous nos tarifs sont transparents et sans frais cachés.`
            }
          },
          {
            "@type": "Question",
            "name": `Quels sont les délais de livraison pour ${service.name} ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": service.duration 
                ? `Le développement de ${service.name} prend ${service.duration}. Nous respectons nos délais grâce à notre méthodologie éprouvée.`
                : `Les délais dépendent de la complexité. Pour ${service.name}, comptez généralement 2-4 semaines. Contactez-nous pour une estimation précise.`
            }
          },
          {
            "@type": "Question",
            "name": `Quelles fonctionnalités sont incluses dans ${service.name} ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${service.name} inclut ${service.features.length} fonctionnalités principales : ${service.features.slice(0, 5).join(', ')}${service.features.length > 5 ? ` et ${service.features.length - 5} autres fonctionnalités` : ''}.`
            }
          },
          {
            "@type": "Question",
            "name": `${service.name} est-il compatible avec d'autres services ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": service.dependencies && service.dependencies.length > 0
                ? `${service.name} nécessite l'un de ces services de base : ${service.dependencies.map(dep => allServices.find(s => s.id === dep)?.name).join(', ')}. Il peut ensuite être combiné avec d'autres extensions.`
                : `${service.name} est un service ${service.category === 'base' ? 'autonome qui peut servir de base à d\'autres extensions' : 'complémentaire'}.`
            }
          }
        ]
      },

      // 5. Organization (entreprise)
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Votre Agence Web",
        "url": baseUrl,
        "logo": `${baseUrl}/images/logo.png`,
        "description": "Agence web spécialisée en développement digital sur-mesure",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Rue de la Innovation",
          "addressLocality": "Paris",
          "postalCode": "75001",
          "addressCountry": "FR"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+33-1-23-45-67-89",
          "contactType": "customer service",
          "email": "contact@votre-agence.com",
          "availableLanguage": "French",
          "areaServed": "FR"
        },
        "sameAs": [
          "https://www.linkedin.com/company/votre-agence",
          "https://twitter.com/votre_agence",
          "https://www.facebook.com/votre.agence"
        ]
      }
    ]
  };

  return JSON.stringify(structuredData, null, 0);
};

// ============================================================================
// 🎨 PARTIE 4: COMPOSANTS UTILITAIRES
// ============================================================================

const getCategoryIcon = (subCategory: string) => {
  const icons = {
    'visibilite': Globe,
    'conversion': Target,
    'vente': BarChart,
    'optimisation': Shield,
    'growth': Star,
    'plateforme': Layers,
    'innovation': Zap
  };
  return icons[subCategory as keyof typeof icons] || BarChart;
};

const getCategoryColor = (subCategory: string) => {
  const colors = {
    'visibilite': 'bg-blue-100 text-blue-800',
    'conversion': 'bg-green-100 text-green-800', 
    'vente': 'bg-purple-100 text-purple-800',
    'optimisation': 'bg-orange-100 text-orange-800',
    'growth': 'bg-pink-100 text-pink-800',
    'plateforme': 'bg-indigo-100 text-indigo-800',
    'innovation': 'bg-red-100 text-red-800'
  };
  return colors[subCategory as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

// Composant pour le loading des sections
const ServiceDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-rose-powder/20 rounded w-24 mb-4"></div>
    <div className="h-16 bg-rose-powder/20 rounded mb-6"></div>
    <div className="h-24 bg-rose-powder/20 rounded"></div>
  </div>
);

// ============================================================================
// 🚀 PARTIE 5: COMPOSANT PRINCIPAL
// ============================================================================

export default function ServiceDetailPage({ params }: { params: { serviceId: string } }) {
  // Gestion redirections
  if (URL_REDIRECTS[params.serviceId]) {
    redirect(`/service/${URL_REDIRECTS[params.serviceId]}`);
  }

  const service = allServices.find((s) => s.id === params.serviceId);

  if (!service) {
    notFound();
  }

  // Calculs intelligents pour recommandations
  const relatedServices = allServices
    .filter(s => s.subCategory === service.subCategory && s.id !== service.id)
    .slice(0, 3);
    
  const complementaryServices = service.category === 'base' 
    ? allServices.filter(s => s.dependencies?.includes(service.id)).slice(0, 4)
    : [];
    
  const CategoryIcon = getCategoryIcon(service.subCategory);
  const avgCategoryPrice = Math.round(
    allServices.filter(s => s.subCategory === service.subCategory)
      .reduce((acc, s) => acc + s.price, 0) / 
    allServices.filter(s => s.subCategory === service.subCategory).length
  );

  return (
    <>
      {/* Données structurées */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: generateAdvancedStructuredData(service, relatedServices) 
        }}
      />

      <article className="bg-cream min-h-screen" itemScope itemType="https://schema.org/Service">
        {/* Métadonnées cachées */}
        <meta itemProp="name" content={service.name} />
        <meta itemProp="description" content={service.description} />
        <meta itemProp="provider" content="Votre Agence Web" />
        <meta itemProp="serviceType" content={service.subCategory} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          {/* Breadcrumb SEO */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-charcoal/60" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
                <Link href="/" className="hover:text-magenta transition-colors" itemProp="item">
                  <span itemProp="name">Accueil</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <ChevronRight className="w-4 h-4" />
              <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
                <Link href="/services" className="hover:text-magenta transition-colors" itemProp="item">
                  <span itemProp="name">Services</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <ChevronRight className="w-4 h-4" />
              <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
                <Link href={`/services?filter=${service.subCategory}`} className="hover:text-magenta transition-colors" itemProp="item">
                  <span itemProp="name">{service.subCategory}</span>
                </Link>
                <meta itemProp="position" content="3" />
              </li>
              <ChevronRight className="w-4 h-4" />
              <li className="text-charcoal font-medium" itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
                <span itemProp="name">{service.name}</span>
                <meta itemProp="position" content="4" />
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-12 lg:gap-16">
            
            {/* COLONNE PRINCIPALE */}
            <main className="xl:col-span-3 space-y-12">
              
              {/* En-tête Hero */}
              <header className="text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
                  <div className="relative w-full lg:w-80 aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-rose-powder/20 to-magenta/10">
                    <Image
                      src={`/images/services/${service.id}-hero.jpg`}
                      alt={`${service.name} - Service ${service.subCategory} professionnel`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 320px"
                      itemProp="image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent"></div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Badge className={`${getCategoryColor(service.subCategory)} flex items-center gap-2`}>
                        <CategoryIcon className="w-4 h-4" />
                        {service.subCategory}
                      </Badge>
   