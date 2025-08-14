// Fichier: app/service/[serviceId]/page.tsx
// VERSION CORRIGÉE - Utilise un composant client pour les actions

import { notFound, redirect } from 'next/navigation';
import { Suspense, cache } from 'react';
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
import { existsSync } from 'fs';
import { join } from 'path';
import { ServiceDetailActions } from '@/components/services/ServiceDetailActions'; // <-- IMPORTATION DU COMPOSANT CLIENT

// ============================================================================
// PARTIES 1 à 6 : TOUT RESTE IDENTIQUE
// (getServiceAnalytics, getVerifiedImage, URL_REDIRECTS, generateStaticParams, 
// generateMetadata, generateAdvancedStructuredData, getCategoryIcon, getCategoryColor)
// ...
// (Je ne remets pas tout ce code pour ne pas surcharger, il ne change pas)
// ============================================================================

const getServiceAnalytics = cache((serviceId: string) => {
  const service = allServices.find(s => s.id === serviceId);
  if (!service) return null;
  const categoryServices = allServices.filter(s => s.subCategory === service.subCategory);
  const avgPrice = Math.round(categoryServices.reduce((acc, s) => acc + s.price, 0) / categoryServices.length);
  const relatedServices = categoryServices.filter(s => s.id !== serviceId).slice(0, 3);
  const complementaryServices = service.category === 'base' ? allServices.filter(s => s.dependencies?.includes(serviceId)).slice(0, 4) : [];
  const totalReviews = 127;
  const avgRating = 4.9;
  const deliveredProjects = 500;
  const satisfactionRate = 98;
  return { service, avgPrice, relatedServices, complementaryServices, categoryServices, stats: { totalReviews, avgRating, deliveredProjects, satisfactionRate } };
});
const getVerifiedImage = (imagePath: string, fallback: string = '/images/services/default-service.jpg'): string => {
  try {
    const fullPath = join(process.cwd(), 'public', imagePath);
    return existsSync(fullPath) ? imagePath : fallback;
  } catch (error) {
    return fallback;
  }
};
const URL_REDIRECTS: Record<string, string> = { 'site-web': 'site-vitrine', 'ecommerce': 'site-ecommerce', 'seo': 'seo-avance', 'ia': 'chatbot-ia', 'marketplace': 'marketplace' };
export async function generateStaticParams() {
  const params = allServices.map(service => ({ serviceId: service.id }));
  Object.keys(URL_REDIRECTS).forEach(oldId => { params.push({ serviceId: oldId }); });
  return params;
}
export async function generateMetadata({ params }: { params: { serviceId: string } }): Promise<Metadata> {
  if (URL_REDIRECTS[params.serviceId]) { redirect(`/service/${URL_REDIRECTS[params.serviceId]}`); }
  const analytics = getServiceAnalytics(params.serviceId);
  if (!analytics) { return { title: 'Service non trouvé | Erreur 404', description: 'Le service recherché n\'existe pas.', robots: { index: false, follow: false } }; }
  const { service, avgPrice, stats } = analytics;
  const heroImage = getVerifiedImage(`/images/services/${service.id}-og.jpg`);
  const squareImage = getVerifiedImage(`/images/services/${service.id}-square.jpg`);
  const canonical = `/service/${service.id}`;
  const seoKeywords = [service.name, `${service.subCategory} professionnel`, `service ${service.category}`, ...service.features.slice(0, 3).map(f => f.toLowerCase().split(' ')[0]), `développement ${service.subCategory}`, `prix ${service.price}€`, service.duration || 'livraison rapide', 'agence web france', 'devis gratuit'];
  return {
    title: `${service.name} - ${service.price}€ | Expert ${service.subCategory} | Agence Web`,
    description: `${service.description} 🚀 À partir de ${service.price}€ ${service.duration ? `⏱ ${service.duration}` : ''} ✅ ${service.features.length} fonctions ⭐ ${stats.avgRating}/5 (${stats.totalReviews} avis) 📞 Devis gratuit 24h`,
    keywords: seoKeywords,
    authors: [{ name: 'Votre Agence Web', url: process.env.NEXT_PUBLIC_BASE_URL || '/' }],
    openGraph: { title: `${service.name} | Service ${service.subCategory} - ${service.price}€`, description: `${service.description.slice(0, 120)}... Prix moyen catégorie: ${avgPrice}€. Note: ${stats.avgRating}/5`, url: canonical, siteName: 'Votre Agence Web', images: [{ url: heroImage, width: 1200, height: 630, alt: `${service.name} - Service ${service.subCategory} professionnel` }, { url: squareImage, width: 800, height: 800, alt: `Icône ${service.id}` }], locale: 'fr_FR', type: 'website' },
    twitter: { card: 'summary_large_image', title: `🚀 ${service.name} | ${service.price}€`, description: `${service.description.slice(0, 140)}...`, images: [heroImage], site: '@VotreAgence' },
    alternates: { canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    verification: { google: process.env.GOOGLE_VERIFICATION, yandex: process.env.YANDEX_VERIFICATION },
    category: service.subCategory,
    other: { 'price:amount': service.price.toString(), 'price:currency': 'EUR', 'product:availability': 'in stock', 'product:condition': 'new', 'rating:average': stats.avgRating.toString(), 'rating:count': stats.totalReviews.toString() }
  };
}
const generateAdvancedStructuredData = (analytics: NonNullable<ReturnType<typeof getServiceAnalytics>>) => {
  const { service, avgPrice, stats } = analytics;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://votre-site.com';
  const serviceUrl = `${baseUrl}/service/${service.id}`;
  const heroImage = getVerifiedImage(`/images/services/${service.id}-og.jpg`);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": serviceUrl, name: `${service.name} | Service ${service.subCategory}`, description: service.description, url: serviceUrl, inLanguage: "fr-FR", datePublished: "2024-01-01T00:00:00+00:00", dateModified: new Date().toISOString(), isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/`, name: "Votre Agence Web", url: baseUrl }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: baseUrl }, { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` }, { "@type": "ListItem", position: 3, name: service.subCategory, item: `${baseUrl}/services?filter=${service.subCategory}` }, { "@type": "ListItem", position: 4, name: service.name, item: serviceUrl }] } },
      { "@type": ["Service", "Product"], "@id": `${serviceUrl}#service-product`, name: service.name, description: service.description, image: heroImage, url: serviceUrl, sku: service.id, mpn: service.id, brand: { "@type": "Brand", name: "Votre Agence Web" }, category: `Services ${service.subCategory}`, serviceType: service.subCategory, areaServed: "FR", provider: { "@type": "Organization", "@id": `${baseUrl}/#organization` }, offers: { "@type": "Offer", price: service.price, priceCurrency: "EUR", availability: "https://schema.org/InStock", priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), seller: { "@id": `${baseUrl}/#organization` }, warranty: "P30D", hasMerchantReturnPolicy: { "@type": "MerchantReturnPolicy", returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow", merchantReturnDays: 30 } }, aggregateRating: { "@type": "AggregateRating", ratingValue: stats.avgRating, reviewCount: stats.totalReviews, bestRating: 5, worstRating: 1 }, additionalProperty: service.features.map(feature => ({ "@type": "PropertyValue", name: "Fonctionnalité incluse", value: feature })) },
      { "@type": "Organization", "@id": `${baseUrl}/#organization`, name: "Votre Agence Web", url: baseUrl, logo: `${baseUrl}/images/logo.png`, description: "Agence web experte en développement digital sur-mesure", foundingDate: "2020-01-01", address: { "@type": "PostalAddress", streetAddress: "123 Rue de l'Innovation", addressLocality: "Paris", postalCode: "75001", addressCountry: "FR" }, contactPoint: [{ "@type": "ContactPoint", telephone: "+33-1-23-45-67-89", contactType: "customer service", email: "contact@votre-agence.com", availableLanguage: "French" }, { "@type": "ContactPoint", telephone: "+33-1-23-45-67-90", contactType: "sales", availableLanguage: "French" }], sameAs: ["https://www.linkedin.com/company/votre-agence", "https://twitter.com/votre_agence", "https://www.facebook.com/votre.agence"], aggregateRating: { "@type": "AggregateRating", ratingValue: stats.avgRating, reviewCount: stats.totalReviews } },
      { "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: `Combien coûte ${service.name} ?`, acceptedAnswer: { "@type": "Answer", text: `${service.name} coûte ${service.price}€. Prix moyen de la catégorie ${service.subCategory}: ${avgPrice}€. Devis personnalisé gratuit sous 24h.` } }, { "@type": "Question", name: `Quels sont les délais pour ${service.name} ?`, acceptedAnswer: { "@type": "Answer", text: service.duration ? `${service.name} est livré en ${service.duration}. Plus de ${stats.deliveredProjects} projets livrés à temps.` : `Délais variables selon complexité. Estimation personnalisée fournie avec le devis gratuit.` } }, { "@type": "Question", name: `Que comprend le service ${service.name} ?`, acceptedAnswer: { "@type": "Answer", text: `${service.name} inclut ${service.features.length} fonctionnalités: ${service.features.join(', ')}. Support inclus pendant 1 an.` } }, { "@type": "Question", name: `Pourquoi choisir votre agence pour ${service.name} ?`, acceptedAnswer: { "@type": "Answer", text: `${stats.satisfactionRate}% de clients satisfaits, ${stats.avgRating}/5 étoiles sur ${stats.totalReviews} avis. Expertise reconnue en ${service.subCategory}.` } }] }
    ]
  };
  return JSON.stringify(structuredData, null, 0);
};
const getCategoryIcon = (subCategory: string) => {
  const icons = { 'visibilite': Globe, 'conversion': Target, 'vente': BarChart, 'optimisation': Shield, 'growth': Star, 'plateforme': Layers, 'innovation': Zap };
  return icons[subCategory as keyof typeof icons] || BarChart;
};
const getCategoryColor = (subCategory: string) => {
  const colors = { 'visibilite': 'bg-blue-100 text-blue-800', 'conversion': 'bg-green-100 text-green-800', 'vente': 'bg-purple-100 text-purple-800', 'optimisation': 'bg-orange-100 text-orange-800', 'growth': 'bg-pink-100 text-pink-800', 'plateforme': 'bg-indigo-100 text-indigo-800', 'innovation': 'bg-red-100 text-red-800' };
  return colors[subCategory as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

// ============================================================================
// 🚀 PARTIE 7: COMPOSANT PRINCIPAL (CORRIGÉ)
// ============================================================================

export default function ServiceDetailPage({ params }: { params: { serviceId: string } }) {
  const { serviceId } = params;
  
  if (URL_REDIRECTS[serviceId]) {
    redirect(`/service/${URL_REDIRECTS[serviceId]}`);
  }

  const analytics = getServiceAnalytics(serviceId);
  if (!analytics) {
    notFound();
  }

  const { service, avgPrice, relatedServices, complementaryServices, stats } = analytics;
  
  const CategoryIcon = getCategoryIcon(service.subCategory);
  const heroImage = getVerifiedImage(`/images/services/${service.id}-og.jpg`); 

  // --- SUPPRESSION DES HANDLERS ---
  // const handleAddToCart = () => { ... };
  // const handleRequestQuote = () => { ... };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: generateAdvancedStructuredData(analytics) 
        }}
      />

      <article className="bg-cream min-h-screen" itemScope itemType="https://schema.org/Service">
        <meta itemProp="name" content={service.name} />
        <meta itemProp="description" content={service.description} />
        <meta itemProp="serviceType" content={service.subCategory} />
        <meta itemProp="provider" content="Votre Agence Web" />
        <meta itemProp="image" content={heroImage} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          
          <nav aria-label="Breadcrumb" className="mb-8">
            {/* ... (le breadcrumb reste identique) ... */}
          </nav>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-12 lg:gap-16">
            
            <main className="xl:col-span-3 space-y-12">
              {/* ... (toute la colonne principale reste identique) ... */}
            </main>
            
            <aside className="xl:col-span-2">
              <div className="sticky top-24 space-y-8">
                <Card className="border-magenta ring-2 ring-magenta/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-playfair text-2xl">Passez à l'action</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* --- APPEL AU COMPOSANT CLIENT --- */}
                    <ServiceDetailActions service={service} />
                  </CardContent>
                </Card>
                
                {/* ... (le reste de la colonne latérale reste identique) ... */}
              </div>
            </aside>

          </div>
        </div>
      </article>
    </>
  );
}
