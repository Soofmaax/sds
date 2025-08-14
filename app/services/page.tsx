import { ServiceCard } from '@/components/services/ServiceCard';
import { PenTool, Code, Rocket } from 'lucide-react';

// Définition des types pour les services
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

// Liste COMPLÈTE et mise à jour des services
const allServices: Service[] = [
  // --- SERVICES DE BASE ---
  {
    id: 'site-vitrine',
    name: 'Site Vitrine 5 Pages',
    description: 'Site web professionnel avec design sur-mesure, responsive et optimisé SEO. Inclut les pages essentielles pour votre présence en ligne.',
    price: 1200,
    category: 'base',
    popular: true,
    duration: '7-10 jours',
    features: ['Design responsive', 'Optimisation SEO', '5 pages incluses', 'Formulaire de contact', 'Analytics intégré'],
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Page de conversion haute performance avec design accrocheur et call-to-actions optimisés pour maximiser vos conversions.',
    price: 600,
    category: 'base',
    duration: '3-5 jours',
    features: ['Design conversion-focused', 'A/B testing ready', 'Intégration analytics', 'Optimisation mobile', 'Temps de chargement < 2s'],
  },
  {
    id: 'site-ecommerce',
    name: 'Boutique en Ligne Performante',
    description: 'Vendez vos produits avec une boutique en ligne complète, sécurisée et facile à gérer pour vous et vos clients.',
    price: 2500,
    category: 'base',
    duration: '4-6 semaines',
    features: ['Catalogue produits illimité', 'Paiement sécurisé (Stripe, PayPal)', 'Gestion des commandes', 'Comptes clients'],
  },
  // --- ADD-ONS & OPTIONS ---
  {
    id: 'blog',
    name: 'Blog Markdown',
    description: 'Système de blog intégré avec support Markdown, catégories, tags et RSS. Parfait pour votre content marketing.',
    price: 400,
    category: 'addon',
    dependencies: ['site-vitrine', 'site-ecommerce'],
    features: ['Éditeur Markdown', 'Système de catégories', 'Flux RSS', 'Commentaires', 'Partage social'],
  },
  {
    id: 'seo-avance',
    name: 'SEO Avancé',
    description: 'Optimisation SEO complète avec schema markup, sitemap, meta tags dynamiques et analyse de performance.',
    price: 300,
    category: 'addon',
    dependencies: ['site-vitrine', 'landing-page', 'site-ecommerce'],
    features: ['Schema markup', 'Sitemap XML', 'Meta tags dynamiques', 'Open Graph', 'Audit SEO'],
  },
  {
    id: 'connexion-web3',
    name: 'Connexion Wallet Web3',
    description: 'Intégration Web3 avec connexion wallet (MetaMask, WalletConnect), gestion des NFTs et interactions blockchain.',
    price: 800,
    category: 'addon',
    dependencies: ['site-vitrine', 'landing-page', 'site-ecommerce'],
    features: ['Multi-wallet support', 'Gestion NFT', 'Smart contracts', 'Transaction history', 'Web3 auth'],
  },
  {
    id: 'internationalisation',
    name: 'Internationalisation',
    description: 'Support multi-langues avec détection automatique, traductions dynamiques et gestion des contenus localisés.',
    price: 500,
    category: 'addon',
    dependencies: ['site-vitrine', 'site-ecommerce'],
    features: ['Support multi-langues', 'Détection automatique', 'URLs localisées', 'Contenus traduits', 'Fallback intelligent'],
  },
  {
    id: 'maintenance-annuelle',
    name: 'Maintenance & Sérénité',
    description: 'Gardez votre site à jour, sécurisé et performant sans avoir à vous en soucier. Mises à jour, sauvegardes et support.',
    price: 450,
    category: 'addon',
    dependencies: ['site-vitrine', 'landing-page', 'site-ecommerce'],
    features: ['Mises à jour techniques', 'Sauvegardes mensuelles', 'Rapport de performance', 'Support prioritaire'],
  },
];

export default function ServicesPage() {
  const baseServices = allServices.filter(s => s.category === 'base');
  const addonServices = allServices.filter(s => s.category === 'addon');

  return (
    <div className="bg-cream py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-4xl">
            Découvrez nos services sur-mesure
          </h2>
          <p className="mt-6 text-lg leading-8 text-charcoal/80">
            Chaque projet est unique. Choisissez une base solide et complétez-la avec les options qui correspondent parfaitement à vos ambitions.
          </p>
        </div>

        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-playfair font-bold text-charcoal">Notre Processus Simplifié</h3>
            <p className="mt-4 text-lg text-charcoal/80">De l'idée au lancement, nous suivons 3 étapes claires pour garantir un résultat qui vous ressemble.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center"><div className="flex items-center justify-center w-16 h-16 rounded-full bg-rose-powder/20 mb-4"><PenTool className="w-8 h-8 text-magenta" /></div><h4 className="text-lg font-playfair font-bold text-charcoal">1. Conception & Stratégie</h4><p className="mt-2 text-charcoal/70">Nous discutons de votre vision pour définir un design unique et une stratégie digitale efficace.</p></div>
            <div className="flex flex-col items-center"><div className="flex items-center justify-center w-16 h-16 rounded-full bg-rose-powder/20 mb-4"><Code className="w-8 h-8 text-magenta" /></div><h4 className="text-lg font-playfair font-bold text-charcoal">2. Développement & Création</h4><p className="mt-2 text-charcoal/70">Votre projet prend vie avec un code propre, performant et des technologies modernes.</p></div>
            <div className="flex flex-col items-center"><div className="flex items-center justify-center w-16 h-16 rounded-full bg-rose-powder/20 mb-4"><Rocket className="w-8 h-8 text-magenta" /></div><h4 className="text-lg font-playfair font-bold text-charcoal">3. Lancement & Suivi</h4><p className="mt-2 text-charcoal/70">Nous déployons votre solution et restons à vos côtés pour assurer son succès continu.</p></div>
          </div>
        </div>

        <div className="mt-20"><h3 className="text-2xl font-playfair font-bold text-charcoal mb-8 text-center">1. Choisissez votre fondation</h3><div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">{baseServices.map(service => (<ServiceCard key={service.id} service={service} />))}</div></div>
        <div className="mt-20"><h3 className="text-2xl font-playfair font-bold text-charcoal mb-8 text-center">2. Agrémentez avec nos options</h3><div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">{addonServices.map(service => (<ServiceCard key={service.id} service={service} />))}</div></div>
      </div>
    </div>
  );
}
