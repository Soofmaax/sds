'use client';

import { ServiceCard } from '@/components/services/ServiceCard';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'site-vitrine',
    name: 'Site Vitrine 5 Pages',
    description: 'Site web professionnel avec design sur-mesure, responsive et optimisé SEO. Inclut les pages essentielles pour votre présence en ligne.',
    price: 1200,
    category: 'base' as const,
    features: ['Design responsive', 'Optimisation SEO', '5 pages incluses', 'Formulaire de contact', 'Analytics intégré'],
    duration: '7-10 jours',
    popular: true,
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Page de conversion haute performance avec design accrocheur et call-to-actions optimisés pour maximiser vos conversions.',
    price: 600,
    category: 'base' as const,
    features: ['Design conversion-focused', 'A/B testing ready', 'Intégration analytics', 'Optimisation mobile', 'Temps de chargement < 2s'],
    duration: '3-5 jours',
  },
  {
    id: 'blog-addon',
    name: '+ Blog Markdown',
    description: 'Système de blog intégré avec support Markdown, catégories, tags et RSS. Parfait pour votre content marketing.',
    price: 400,
    category: 'addon' as const,
    features: ['Éditeur Markdown', 'Système de catégories', 'Flux RSS', 'Commentaires', 'Partage social'],
    dependencies: ['site-vitrine'],
  },
  {
    id: 'seo-advanced',
    name: '+ SEO Avancé',
    description: 'Optimisation SEO complète avec schema markup, sitemap, meta tags dynamiques et analyse de performance.',
    price: 300,
    category: 'addon' as const,
    features: ['Schema markup', 'Sitemap XML', 'Meta tags dynamiques', 'Open Graph', 'Audit SEO'],
    dependencies: ['site-vitrine', 'landing-page'],
  },
  {
    id: 'web3-wallet',
    name: '+ Connexion Wallet Web3',
    description: 'Intégration Web3 avec connexion wallet (MetaMask, WalletConnect), gestion des NFTs et interactions blockchain.',
    price: 800,
    category: 'addon' as const,
    features: ['Multi-wallet support', 'Gestion NFT', 'Smart contracts', 'Transaction history', 'Web3 auth'],
    dependencies: ['site-vitrine', 'landing-page'],
  },
  {
    id: 'i18n',
    name: '+ Internationalisation',
    description: 'Support multi-langues avec détection automatique, traductions dynamiques et gestion des contenus localisés.',
    price: 500,
    category: 'addon' as const,
    features: ['Support multi-langues', 'Détection automatique', 'URLs localisées', 'Contenus traduits', 'Fallback intelligent'],
    dependencies: ['site-vitrine'],
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-rose-powder/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-magenta" />
            <span className="text-sm font-medium text-magenta">Services Sur-Mesure</span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Configurez Votre
            <span className="text-gradient block">Projet Parfait</span>
          </h2>
          <p className="text-xl text-charcoal/70 leading-relaxed">
            Commencez par un service de base et ajoutez les options qui correspondent à vos besoins. 
            Chaque projet est unique, comme vous.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Custom Service CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-rose-powder/20 to-magenta/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-magenta" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">
              Besoin d'un Service Personnalisé ?
            </h3>
            <p className="text-charcoal/70 mb-6 max-w-2xl mx-auto">
              Votre projet nécessite une approche unique ? Discutons ensemble de vos besoins spécifiques 
              pour créer la solution parfaite.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-rose hover:opacity-90 text-white shadow-rose">
                Demander un Devis Personnalisé
                <Sparkles className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}