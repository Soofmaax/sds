// Fichier: app/services/page.tsx
// Version SEO Premium avec données structurées et optimisations avancées

import Link from 'next/link';
import { Check, Gift } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

import { allServices } from '@/lib/services-data';

// --- SEO Metadata Optimisé ---
export const metadata: Metadata = {
  title: 'Services Web & Développement Digital | Packs et Solutions sur-Mesure',
  description: 'Découvrez nos packs web professionnels : Présence Digitale (1200€), E-commerce Pro (3500€). +30 services : SEO, IA, Web3, PWA. Devis gratuit.',
  keywords: [
    'développement web', 'création site internet', 'e-commerce', 'SEO', 
    'intelligence artificielle', 'web3', 'application mobile', 'pack web',
    'site vitrine', 'boutique en ligne', 'marketing digital'
  ],
  openGraph: {
    title: 'Services Web & Développement Digital | Solutions Complètes',
    description: 'Packs web à partir de 1200€. Site vitrine, e-commerce, IA, SEO. +30 services pour votre transformation digitale.',
    url: '/services',
    siteName: 'Votre Agence Web',
    images: [
      {
        url: '/images/services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Services web et packs digitaux',
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services Web & Packs Digitaux | À partir de 1200€',
    description: 'Découvrez nos solutions web complètes. Site vitrine, e-commerce, IA, SEO.',
    images: ['/images/services-twitter.jpg'],
  },
  alternates: {
    canonical: '/services',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// --- Lazy Loading avec meilleur fallback SEO ---
// SYNTAXE CORRECTE ET FINALE

const FullCatalogue = dynamic(
  // Premier argument : la fonction qui importe le composant
  () => import('@/components/sections/FullCatalogue').then(mod => mod.FullCatalogue), 
  
  // Deuxième argument : l'objet d'options
  { 
    ssr: false,
    loading: () => (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold text-charcoal mb-4">
          Catalogue Complet de Services
        </h3>
        <p className="text-charcoal/70 mb-2">
          Chargement de +30 services : Développement, SEO, IA, Web3...
        </p>
        <div className="animate-pulse bg-rose-powder/20 h-4 w-48 mx-auto rounded"></div>
      </div>
    )
  }
); // Une seule parenthèse fermante pour clore l'appel `dynamic`


// --- Logique de Packs avec Structured Data ---
const generatePack = (name: string, description: string, baseServiceId: string, addonIds: string[], popular: boolean) => {
  const baseService = allServices.find(s => s.id === baseServiceId);
  if (!baseService) return null;

  const validAddons = allServices.filter(addon => 
    addonIds.includes(addon.id) && addon.dependencies?.includes(baseServiceId)
  );

  const originalPrice = baseService.price + validAddons.reduce((sum, addon) => sum + addon.price, 0);
  const serviceCount = 1 + validAddons.length;
  const discountRate = serviceCount >= 3 ? 0.15 : 0.10;
  const discount = Math.ceil(originalPrice * discountRate);
  const finalPrice = originalPrice - discount;

  return {
    name, description, price: finalPrice, originalPrice, savings: discount,
    features: [baseService.name, ...validAddons.map(a => a.name)],
    complexity: serviceCount >= 3 ? 'Avancé' : 'Standard',
    cta: 'Configurer ce pack', popular,
    serviceId: baseServiceId, // Pour le structured data
  };
};

const dynamicPacks = [
  generatePack(
    'Pack Présence Digitale',
    'Solution complète pour créer votre site vitrine professionnel avec SEO avancé et maintenance incluse.',
    'site-vitrine',
    ['seo-avance', 'maintenance-annuelle'],
    true
  ),
  generatePack(
    'Pack E-commerce Pro',
    'Boutique en ligne complète avec gestion intelligente des stocks et programme de fidélité.',
    'site-ecommerce',
    ['gestion-inventaire-ia', 'systeme-parrainage'],
    false
  ),
].filter((p): p is NonNullable<typeof p> => p !== null);

// --- Données Structurées JSON-LD ---
const generateStructuredData = () => {
  const offers = dynamicPacks.map(pack => ({
    "@type": "Offer",
    "name": pack.name,
    "description": pack.description,
    "price": pack.price,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "validFrom": new Date().toISOString(),
    "url": `/services#${pack.serviceId}`,
    "seller": {
      "@type": "Organization",
      "name": "Votre Agence Web"
    }
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "/services",
        "name": "Services Web & Développement Digital",
        "description": "Catalogue complet de services web : création de sites, e-commerce, SEO, IA, applications mobiles.",
        "url": "/services",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "/",
          "name": "Votre Agence Web"
        }
      },
      {
        "@type": "Service",
        "name": "Services de Développement Web",
        "provider": {
          "@type": "Organization",
          "name": "Votre Agence Web"
        },
        "serviceType": "Développement Web",
        "areaServed": "FR",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Catalogue Services Web",
          "itemListElement": offers
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quels sont vos packs web disponibles ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nous proposons 2 packs principaux : Pack Présence Digitale à partir de 1200€ et Pack E-commerce Pro à partir de 3500€."
            }
          },
          {
            "@type": "Question", 
            "name": "Combien de temps prend le développement ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le délai varie selon le projet : 7-10 jours pour un site vitrine, 4-6 semaines pour un e-commerce complet."
            }
          }
        ]
      }
    ]
  };

  return JSON.stringify(structuredData);
};

// --- Composant Principal avec Optimisations SEO ---
export default function ServicesPage() {
  return (
    <>
      {/* Données Structurées */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
      />
      
      <div className="bg-cream py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              
          {/* --- SECTION 1 : Header SEO Optimisé --- */}
          <header className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-playfair font-bold tracking-tight text-charcoal sm:text-6xl">
              Services Web & Développement Digital
            </h1>
            <p className="mt-6 text-xl leading-8 text-charcoal/80 max-w-3xl mx-auto">
              Transformez votre présence en ligne avec nos <strong>packs web complets</strong> et plus de <strong>30 services spécialisés</strong>. 
              Du site vitrine à l'e-commerce, de l'IA au Web3.
            </p>
            
            {/* Breadcrumb pour SEO */}
            <nav aria-label="Breadcrumb" className="mt-8">
              <ol className="flex items-center justify-center space-x-2 text-sm text-charcoal/60">
                <li><Link href="/" className="hover:text-magenta">Accueil</Link></li>
                <li className="before:content-['/'] before:mx-2">Services</li>
              </ol>
            </nav>
          </header>

          {/* --- SECTION 2 : Packs avec Rich Snippets --- */}
          <section className="mt-20" aria-labelledby="packs-heading">
            <h2 id="packs-heading" className="text-3xl font-playfair font-bold text-center text-charcoal mb-8">
              Nos Packs Solutions Complètes
            </h2>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {dynamicPacks.map((pack, index) => (
                <article 
                  key={pack.name}
                  id={pack.serviceId}
                  className={`rounded-2xl p-8 flex flex-col border transition-all duration-300 ${
                    pack.popular 
                      ? 'bg-rose-powder/10 text-charcoal border-magenta ring-2 ring-magenta hover:shadow-rose-lg hover:scale-[1.02]' 
                      : 'bg-white text-charcoal border-rose-powder/30 hover:border-magenta hover:shadow-rose'
                  }`}
                  itemScope 
                  itemType="https://schema.org/Product"
                >
                  <div className="flex justify-between items-center mb-4">
                    {pack.popular ? 
                      <span className="bg-magenta text-white text-xs font-semibold px-3 py-1 rounded-full">LE PLUS POPULAIRE</span> : <div />}
                    <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">{pack.complexity}</span>
                  </div>

                  <h3 className="font-playfair text-2xl font-bold" itemProp="name">
                    {pack.name}
                  </h3>
                  
                  <div className="mt-4 flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-magenta" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                      <span itemProp="price">{pack.price.toLocaleString('fr-FR')}</span>
                      <span itemProp="priceCurrency" content="EUR">€</span>
                    </p>
                    <p className="text-lg text-charcoal/50 line-through">{pack.originalPrice.toLocaleString('fr-FR')}€</p>
                  </div>
                  
                  {pack.savings > 0 && (
                    <div className="mt-2 text-sm font-semibold text-green-600 flex items-center gap-2 p-2 bg-green-100 rounded-lg">
                      <Gift className="w-4 h-4" />
                      <span>Économie de {pack.savings.toLocaleString('fr-FR')}€ !</span>
                    </div>
                  )}

                  <p className="mt-4 flex-1 text-charcoal/90" itemProp="description">
                    {pack.description}
                  </p>
                  
                  <div className="mt-8">
                    <h4 className="font-semibold text-charcoal mb-3">Services inclus :</h4>
                    <ul className="space-y-3" itemProp="includesObject">
                      {pack.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    href="/contact" 
                    className="mt-10 block w-full text-center rounded-lg px-6 py-3 text-lg font-semibold transition-opacity bg-gradient-rose text-white hover:opacity-90 shadow-rose"
                    aria-label={`Configurer le ${pack.name}`}
                  >
                    {pack.cta}
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* --- SECTION 3 : Catalogue Complet avec Lazy Loading --- */}
          <section className="mt-24 pt-20 border-t border-rose-powder/20" aria-labelledby="catalogue-heading">
            <header className="max-w-3xl mx-auto text-center">
              <h2 id="catalogue-heading" className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-5xl">
                Catalogue Complet de Services
              </h2>
              <p className="mt-6 text-lg leading-8 text-charcoal/80">
                Explorez nos <strong>+30 services spécialisés</strong> : développement web, SEO, intelligence artificielle, 
                Web3, applications mobiles et bien plus.
              </p>
            </header>
            
            <FullCatalogue />
          </section>

        </div>
      </div>
    </>
  );
}