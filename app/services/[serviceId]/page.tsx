// 🏆 Template EXPERT LEVEL - Toutes optimisations Senior intégrées

import { notFound, redirect } from 'next/navigation';
import { Suspense, cache } from 'react';
import { allServices, type Service } from '@/lib/services-data';
import { 
  Check, Clock, Users, BarChart, ArrowRight, Star, Shield, Zap, Globe, 
  Phone, Mail, Download, Play, ExternalLink, ChevronRight, Trophy, Target, Layers,
  ShoppingCart // Ajout de l'import manquant
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { existsSync } from 'fs';
import { join } from 'path';

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
// 🎯 PARTIE 3: GÉNÉRATION STATIQUE OPTIMISÉE
// ============================================================================

export async function generateStaticParams() {
  const params = allServices.map(service => ({ serviceId: service.id }));
  Object.keys(URL_REDIRECTS).forEach(oldId => {
    params.push({ serviceId: oldId });
  });
  return params;
}

// ============================================================================
// 🔍 PARTIE 4: MÉTADONNÉES SEO EXPERT + VÉRIFICATIONS
// ============================================================================

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
  const squareImage = getVerifiedImage(`/images/services/${service.id}-square.jpg`);
  const canonical = `/service/${service.id}`;
  const alternateUrls = getAlternateUrls(service.id);

  const seoKeywords = [
    service.name,
    `${service.subCategory} professionnel`,
    `service ${service.category}`,
    ...service.features.slice(0, 3).map(f => f.toLowerCase().split(' ')[0]),
    `développement ${service.subCategory}`,
    `prix ${service.price}€`,
    service.duration || 'livraison rapide',
    'agence web france',
    'devis gratuit'
  ];

  return {
    title: `${service.name} - ${service.price}€ | Expert ${service.subCategory} | Agence Web`,
    description: `${service.description} 🚀 À partir de ${service.price}€ ${service.duration ? `⏱ ${service.duration}` : ''} ✅ ${service.features.length} fonctions ⭐ ${stats.avgRating}/5 (${stats.totalReviews} avis) 📞 Devis gratuit 24h`,
    keywords: seoKeywords,
    authors: [{ name: 'Votre Agence Web', url: process.env.NEXT_PUBLIC_BASE_URL || '/' }],
    creator: 'Votre Agence Web',
    publisher: 'Votre Agence Web',
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
        {
          url: squareImage,
          width: 800,
          height: 800,
          alt: `Icône ${service.name}`,
        }
      ],
      locale: 'fr_FR',
      type: 'website',
      // Suppression de la ligne tags: seoKeywords qui causait l'erreur
    },
    twitter: {
      card: 'summary_large_image',
      title: `🚀 ${service.name} | ${service.price}€`,
      description: `${service.description.slice(0, 140)}...`,
      images: [heroImage],
      site: '@VotreAgence',
      creator: '@VotreAgence',
    },
    alternates: {
      canonical,
      languages: alternateUrls,
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
      google: process.env.GOOGLE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
    },
    category: service.subCategory,
    other: {
      'price:amount': service.price.toString(),
      'price:currency': 'EUR',
      'product:availability': 'in stock',
      'product:condition': 'new',
      'rating:average': stats.avgRating.toString(),
      'rating:count': stats.totalReviews.toString(),
    }
  };
}

// ============================================================================
// 🏗 PARTIE 5: DONNÉES STRUCTURÉES MULTI-TYPE (Product + Service)
// ============================================================================

const generateAdvancedStructuredData = (analytics: NonNullable<ReturnType<typeof getServiceAnalytics>>) => {
  const { service, avgPrice, stats } = analytics;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://votre-site.com';
  const serviceUrl = `${baseUrl}/service/${service.id}`;
  const heroImage = getVerifiedImage(`/images/services/${service.id}-hero.jpg`);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": serviceUrl,
        "name": `${service.name} | Service ${service.subCategory}`,
        "description": service.description,
        "url": serviceUrl,
        "inLanguage": "fr-FR",
        "datePublished": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${baseUrl}/`,
          "name": "Votre Agence Web",
          "url": baseUrl
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": baseUrl },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${baseUrl}/services` },
            { "@type": "ListItem", "position": 3, "name": service.subCategory, "item": `${baseUrl}/services?filter=${service.subCategory}` },
            { "@type": "ListItem", "position": 4, "name": service.name, "item": serviceUrl }
          ]
        }
      },
      {
        "@type": ["Service", "Product"],
        "@id": `${serviceUrl}#service-product`,
        "name": service.name,
        "description": service.description,
        "image": heroImage,
        "url": serviceUrl,
        "sku": service.id,
        "mpn": service.id,
        "brand": {
          "@type": "Brand",
          "name": "Votre Agence Web"
        },
        "category": `Services ${service.subCategory}`,
        "serviceType": service.subCategory,
        "areaServed": "FR",
        "provider": {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`
        },
        "offers": {
          "@type": "Offer",
          "price": service.price,
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          "seller": { "@id": `${baseUrl}/#organization` },
          "warranty": "P30D",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": stats.avgRating,
          "reviewCount": stats.totalReviews,
          "bestRating": 5,
          "worstRating": 1
        },
        "additionalProperty": service.features.map(feature => ({
          "@type": "PropertyValue",
          "name": "Fonctionnalité incluse",
          "value": feature
        }))
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Votre Agence Web",
        "url": baseUrl,
        "logo": `${baseUrl}/images/logo.png`,
        "description": "Agence web experte en développement digital sur-mesure",
        "foundingDate": "2020-01-01",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Rue de l'Innovation",
          "addressLocality": "Paris",
          "postalCode": "75001",
          "addressCountry": "FR"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+33-1-23-45-67-89",
            "contactType": "customer service",
            "email": "contact@votre-agence.com",
            "availableLanguage": "French"
          },
          {
            "@type": "ContactPoint",
            "telephone": "+33-1-23-45-67-90",
            "contactType": "sales",
            "availableLanguage": "French"
          }
        ],
        "sameAs": [
          "https://www.linkedin.com/company/votre-agence",
          "https://twitter.com/votre_agence",
          "https://www.facebook.com/votre.agence"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": stats.avgRating,
          "reviewCount": stats.totalReviews
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Combien coûte ${service.name} ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${service.name} coûte ${service.price}€. Prix moyen de la catégorie ${service.subCategory}: ${avgPrice}€. Devis personnalisé gratuit sous 24h.`
            }
          },
          {
            "@type": "Question",
            "name": `Quels sont les délais pour ${service.name} ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": service.duration 
                ? `${service.name} est livré en ${service.duration}. Plus de ${stats.deliveredProjects} projets livrés à temps.`
                : `Délais variables selon complexité. Estimation personnalisée fournie avec le devis gratuit.`
            }
          },
          {
            "@type": "Question",
            "name": `Que comprend le service ${service.name} ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${service.name} inclut ${service.features.length} fonctionnalités: ${service.features.join(', ')}. Support inclus pendant 1 an.`
            }
          },
          {
            "@type": "Question",
            "name": `Pourquoi choisir votre agence pour ${service.name} ?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${stats.satisfactionRate}% de clients satisfaits, ${stats.avgRating}/5 étoiles sur ${stats.totalReviews} avis. Expertise reconnue en ${service.subCategory}.`
            }
          }
        ]
      }
    ]
  };

  return JSON.stringify(structuredData, null, 0);
};

// ============================================================================
// 🎨 PARTIE 6: COMPOSANTS ET UTILS
// ============================================================================

const getCategoryIcon = (subCategory: string) => {
  const icons = {
    'visibilite': Globe, 'conversion': Target, 'vente': BarChart,
    'optimisation': Shield, 'growth': Star, 'plateforme': Layers, 'innovation': Zap
  };
  return icons[subCategory as keyof typeof icons] || BarChart;
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

const useConsentTracking = () => {
  return {
    hasAnalyticsConsent: true,
    hasMarketingConsent: true,
    trackEvent: (eventName: string, data: any) => {
      if (typeof window !== 'undefined' && (window as any).gtag && true) {
        (window as any).gtag('event', eventName, data);
      }
    }
  };
};

// ============================================================================
// 🚀 PARTIE 7: COMPOSANT PRINCIPAL
// ============================================================================

export default function ServiceDetailPage({ params }: { params: { serviceId: string } }) {
  if (URL_REDIRECTS[params.serviceId]) {
    redirect(`/service/${URL_REDIRECTS[params.serviceId]}`);
  }

  const analytics = getServiceAnalytics(params.serviceId);
  if (!analytics) {
    notFound();
    return null;
  }

  const { service, avgPrice, relatedServices, complementaryServices, stats } = analytics;
  const { trackEvent } = useConsentTracking();
  
  const CategoryIcon = getCategoryIcon(service.subCategory);
  const heroImage = getVerifiedImage(`/images/services/${service.id}-hero.jpg`);

  const handleAddToCart = () => {
    trackEvent('add_to_cart', {
      currency: 'EUR',
      value: service.price,
      items: [{
        item_id: service.id,
        item_name: service.name,
        category: service.subCategory,
        price: service.price
      }]
    });
  };

  const handleRequestQuote = () => {
    trackEvent('generate_lead', {
      currency: 'EUR',
      value: service.price,
      service_id: service.id,
      service_name: service.name
    });
  };

  return (
    <>
      {/* Données structurées multi-type */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: generateAdvancedStructuredData(analytics) 
        }}
      />

      <article className="bg-cream min-h-screen" itemScope itemType="https://schema.org/Service">
        {/* Métadonnées cachées pour microdata */}
        <meta itemProp="name" content={service.name} />
        <meta itemProp="description" content={service.description} />
        <meta itemProp="serviceType" content={service.subCategory} />
        <meta itemProp="provider" content="Votre Agence Web" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          
          {/* Breadcrumb SEO optimisé */}
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
                <Link 
                  href={`/services?filter=${service.subCategory}`} 
                  className="hover:text-magenta transition-colors capitalize" 
                  itemProp="item"
                >
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
              
              {/* Hero Section optimisée */}
              <header className="text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
                  
                  {/* Image hero vérifiée */}
                  <div className="relative w-full lg:w-80 aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-rose-powder/20 to-magenta/10 shadow-lg">
                    <Image
                      src={heroImage}
                      alt={`${service.name} - Service ${service.subCategory} professionnel`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 320px"
                      itemProp="image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/services/default-service.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent"></div>
                    {service.popular && (
                      <Badge className="absolute top-4 right-4 bg-gradient-rose text-white shadow-lg">
                        <Trophy className="w-4 h-4 mr-1" />
                        Populaire
                      </Badge>
                    )}
                  </div>
                  
                  {/* Contenu hero */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Badge className={`${getCategoryColor(service.subCategory)} flex items-center gap-2`}>
                        <CategoryIcon className="w-4 h-4" />
                        {service.subCategory}
                      </Badge>
                      <div className="flex items-center gap-2" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                        <div className="flex text-yellow-500">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-charcoal/70">
                          <span itemProp="ratingValue">{stats.avgRating}</span>/5 
                          (<span itemProp="reviewCount">{stats.totalReviews}</span> avis)
                        </span>
                      </div>
                    </div>
                    
                    <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-charcoal leading-tight" itemProp="name">
                      {service.name}
                    </h1>
                    
                    {/* Prix avec comparaison intelligente */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-magenta" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                          <span itemProp="price">{service.price.toLocaleString('fr-FR')}</span>
                          <span itemProp="priceCurrency" content="EUR">€</span>
                          <meta itemProp="availability" content="https://schema.org/InStock" />
                        </span>
                        {Math.abs(service.price - avgPrice) > avgPrice * 0.15 && (
                          <span className={`text-sm px-3 py-1 rounded-full ${
                            service.price < avgPrice 
                              ? 'text-green-700 bg-green-100' 
                              : 'text-orange-700 bg-orange-100'
                          }`}>
                            {service.price < avgPrice ? '💰 Économique' : '⭐ Premium'} 
                            (Moy: {avgPrice}€)
                          </span>
                        )}
                      </div>
                      {service.duration && (
                        <div className="flex items-center text-charcoal/70 bg-rose-powder/10 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Livraison en {service.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-xl lg:text-2xl text-charcoal/80 leading-relaxed max-w-4xl" itemProp="description">
                  {service.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[service.subCategory, `${service.price}€`, service.duration, `${service.features.length} fonctions`]
                    .filter(Boolean)
                    .map((tag, i) => (
                      <span key={i} className="text-xs bg-rose-powder/10 text-charcoal/60 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))
                  }
                </div>
              </header>

              <section>
                <h2 className="text-3xl font-playfair font-bold text-charcoal mb-8">
                  Fonctionnalités incluses dans {service.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" itemProp="includesObject">
                  {service.features.map((feature, index) => (
                    <Card key={index} className="border-rose-powder/30 hover:border-magenta/30 transition-all group">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-rose flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1" itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
                            <meta itemProp="name" content="Fonctionnalité" />
                            <h3 className="font-semibold text-charcoal mb-2 group-hover:text-magenta transition-colors" itemProp="value">
                              {feature}
                            </h3>
                            <p className="text-sm text-charcoal/70">
                              Fonctionnalité professionnelle incluse dans votre service {service.name}.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Trust signals */}
                <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-green-700" />
                    <span className="font-semibold text-green-800">
                      Garantie satisfaction {stats.satisfactionRate}% – support premium inclus.
                    </span>
                  </div>
                  <div className="text-sm text-green-700">
                    Plus de {stats.deliveredProjects} projets livrés à temps. Note moyenne {stats.avgRating}/5 sur {stats.totalReviews} avis.
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="mt-12">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <Button size="lg" className="bg-magenta text-white" onClick={handleAddToCart}>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Ajouter au panier
                  </Button>
                  <Button size="lg" variant="outline" className="border-magenta text-magenta" onClick={handleRequestQuote}>
                    <Mail className="w-5 h-5 mr-2" />
                    Demander un devis gratuit
                  </Button>
                </div>
              </section>

              {/* Related services */}
              {relatedServices.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-2xl font-bold mb-6">Services similaires</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedServices.map(rs => (
                      <Card key={rs.id} className="hover:border-magenta/30 transition-all">
                        <CardHeader>
                          <CardTitle>
                            <Link href={`/service/${rs.id}`}>
                              {rs.name}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-magenta">{rs.price}€</span>
                            <span className="text-xs text-charcoal/60">{rs.duration}</span>
                          </div>
                          <div className="text-sm mt-2">{rs.description.slice(0, 60)}...</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Complementary services */}
              {complementaryServices.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-2xl font-bold mb-6">Services complémentaires</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {complementaryServices.map(cs => (
                      <Card key={cs.id} className="hover:border-magenta/30 transition-all">
                        <CardHeader>
                          <CardTitle>
                            <Link href={`/service/${cs.id}`}>
                              {cs.name}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-magenta">{cs.price}€</span>
                            <span className="text-xs text-charcoal/60">{cs.duration}</span>
                          </div>
                          <div className="text-sm mt-2">{cs.description.slice(0, 60)}...</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </main>
            {/* COLONNE ASIDE */}
            <aside className="xl:col-span-2">
              {/* Ajoutez ici des widgets, contact, trust signals etc. */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Contactez-nous</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-magenta" />
                    <span>+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-magenta" />
                    <span>contact@votre-agence.com</span>
                  </div>
                  <Button asChild className="mt-4 w-full bg-magenta text-white">
                    <Link href="/devis">Demander un devis</Link>
                  </Button>
                </CardContent>
              </Card>
              {/* Ajoutez plus de widgets ici */}
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
