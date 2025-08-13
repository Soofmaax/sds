import { ServiceCard } from '@/components/services/ServiceCard';

// Définition des types pour la clarté
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

// Liste des services proposés
const allServices: Service[] = [
  {
    id: 'site-vitrine',
    name: 'Site Vitrine Glamour',
    description: 'Une présence en ligne élégante et professionnelle pour présenter votre activité, vos valeurs et attirer vos clients idéaux.',
    price: 1200,
    category: 'base',
    popular: true,
    duration: '2-3 semaines',
    features: ['Jusqu\'à 5 pages', 'Design 100% personnalisé', 'Optimisation SEO de base', 'Responsive mobile & tablette', 'Formulaire de contact'],
  },
  {
    id: 'landing-page',
    name: 'Landing Page Impactante',
    description: 'Une page unique conçue pour convertir. Idéale pour un lancement de produit, un événement ou une campagne marketing.',
    price: 750,
    category: 'base',
    duration: '1-2 semaines',
    features: ['Section unique optimisée', 'Appels à l\'action clairs', 'Intégration auto-répondeur', 'Tests A/B possibles'],
  },
  {
    id: 'integration-web3',
    name: 'Intégration Web3',
    description: 'Connectez votre site à la blockchain. Permettez à vos utilisateurs de se connecter avec leur wallet et d\'interagir avec des smart contracts.',
    price: 1800,
    category: 'base',
    duration: '3-4 semaines',
    features: ['Connexion par Wallet (MetaMask, etc.)', 'Interaction avec Smart Contract', 'Affichage de soldes de tokens', 'Sécurité renforcée'],
  },
  {
    id: 'maintenance-annuelle',
    name: 'Maintenance & Sérénité',
    description: 'Gardez votre site à jour, sécurisé et performant sans avoir à vous en soucier. Mises à jour, sauvegardes et support.',
    price: 450,
    category: 'addon',
    dependencies: ['site-vitrine', 'landing-page', 'integration-web3'],
    features: ['Mises à jour techniques', 'Sauvegardes mensuelles', 'Rapport de performance', 'Support prioritaire'],
  },
  {
    id: 'blog',
    name: 'Module Blog & Contenu',
    description: 'Ajoutez un blog puissant à votre site pour partager votre expertise, améliorer votre SEO et créer une communauté.',
    price: 600,
    category: 'addon',
    dependencies: ['site-vitrine'],
    features: ['Gestion simple des articles', 'Catégories et tags', 'Optimisation SEO avancée', 'Partage sur les réseaux sociaux'],
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

        {/* Services de Base */}
        <div className="mt-16">
          <h3 className="text-2xl font-playfair font-bold text-charcoal mb-8 text-center">
            1. Choisissez votre fondation
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {baseServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="mt-20">
          <h3 className="text-2xl font-playfair font-bold text-charcoal mb-8 text-center">
            2. Agrémentez avec nos options
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {addonServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
