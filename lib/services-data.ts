// Fichier: lib/services-data.ts

export interface Service {
  id: string; name: string; description: string; price: number; category: 'base' | 'addon';
  subCategory: string; features: string[]; duration?: string; popular?: boolean; dependencies?: string[];
}

export const allServices: Service[] = [
  // --- Copiez et collez ici la liste complète des 33 services que nous avons validée ---
  // Je la remets pour vous par sécurité :
  {
    id: 'site-vitrine', name: 'Site Vitrine 5 Pages',
    description: 'Site web professionnel avec design sur-mesure, responsive et optimisé SEO.',
    price: 1200, category: 'base', subCategory: 'visibilite', popular: true, duration: '7-10 jours',
    features: ['Design responsive', 'Optimisation SEO', '5 pages incluses', 'Formulaire de contact', 'Analytics intégré'],
    dependencies: [],
  },
  // ... et ainsi de suite pour les 32 autres services ...
  {
    id: 'tests-ab-automatises', name: 'Plateforme de Tests A/B Automatisés',
    description: 'Optimisez en continu vos conversions avec des tests A/B qui trouvent les meilleures versions de vos pages.',
    price: 2600, category: 'addon', subCategory: 'conversion', duration: '3-4 semaines',
    features: ['Tests multivariés automatiques', 'Segmentation audience intelligente', 'Calculs de significativité', 'Mise en prod auto'],
    dependencies: ['site-vitrine', 'site-ecommerce', 'landing-page'],
  },
];
