'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Check, Search, Tag } from 'lucide-react';

// On importe notre liste de services depuis son propre fichier
import { allServices, Service } from '@/lib/services-data';
import { ServiceCard } from '@/components/services/ServiceCard';

// Définition des Packs
const servicePacks = [
    {
        name: 'Pack Présence Digitale', price: 'Dès 1200€',
        description: 'La solution idéale pour lancer votre activité en ligne avec une image professionnelle et percutante.',
        features: ['Site Vitrine 5 Pages sur-mesure', 'Optimisation SEO de base', 'Design 100% responsive', 'Maintenance & Sécurité incluses (1 an)'],
        cta: 'Choisir ce pack', popular: true,
    },
    {
        name: 'Pack E-commerce Pro', price: 'Dès 3500€',
        description: 'Lancez votre boutique en ligne et commencez à vendre avec des outils puissants pour la croissance.',
        features: ['Boutique en ligne complète', 'Paiements sécurisés intégrés', 'Gestion d\'inventaire intelligente (IA)', 'Module de parrainage & fidélité'],
        cta: 'Choisir ce pack', popular: false,
    },
];

// Définition des catégories pour les filtres
const serviceCategories = [
    { id: 'tous', name: 'Tous' }, { id: 'visibilite', name: 'Visibilité' }, { id: 'conversion', name: 'Conversion' },
    { id: 'vente', name: 'Vente' }, { id: 'optimisation', name: 'Optimisation' }, { id: 'growth', name: 'Croissance' },
    { id: 'plateforme', name: 'Plateformes' }, { id: 'innovation', name: 'Innovation' },
];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState('tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    let services = allServices;
    if (activeFilter !== 'tous') {
      services = services.filter(s => s.subCategory === activeFilter);
    }
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      services = services.filter(s => 
        s.name.toLowerCase().includes(lowerCaseQuery) || 
        s.description.toLowerCase().includes(lowerCaseQuery)
      );
    }
    return services;
  }, [activeFilter, searchQuery]);

  return (
    <div className="bg-cream py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
        {/* --- SECTION 1 : LES PACKS --- */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-5xl">
            Commencez avec une Solution Complète
          </h2>
          <p className="mt-6 text-lg leading-8 text-charcoal/80">
            Nos packs sont conçus pour répondre à vos objectifs principaux. La voie rapide vers le succès.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {servicePacks.map((pack) => (
            <div key={pack.name} className={`rounded-2xl p-8 flex flex-col border ${pack.popular ? 'bg-charcoal text-white border-magenta ring-2 ring-magenta' : 'bg-white text-charcoal border-rose-powder/30'}`}>
              {pack.popular && <div className="text-center mb-4"><span className="bg-magenta text-white text-xs font-semibold px-3 py-1 rounded-full">LE PLUS POPULAIRE</span></div>}
              <h3 className="font-playfair text-2xl font-bold">{pack.name}</h3>
              <p className={`mt-4 text-lg font-semibold ${pack.popular ? 'text-rose-powder' : 'text-magenta'}`}>{pack.price}</p>
              <p className={`mt-4 flex-1 ${pack.popular ? 'text-cream/80' : 'text-charcoal/80'}`}>{pack.description}</p>
              <ul className="mt-8 space-y-3">
                {pack.features.map((feature) => (<li key={feature} className="flex items-start"><Check className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${pack.popular ? 'text-green-400' : 'text-green-600'}`} /><span>{feature}</span></li>))}
              </ul>
              <Link href="/contact" className={`mt-10 block w-full text-center rounded-lg px-6 py-3 text-lg font-semibold transition-opacity ${pack.popular ? 'bg-white text-charcoal hover:opacity-90' : 'bg-gradient-rose text-white hover:opacity-90 shadow-rose'}`}>{pack.cta}</Link>
            </div>
          ))}
        </div>

        {/* --- SECTION 2 : LE CATALOGUE COMPLET --- */}
        <div className="mt-24 pt-20 border-t border-rose-powder/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-5xl">
              Ou Construisez sur Mesure
            </h2>
            <p className="mt-6 text-lg leading-8 text-charcoal/80">
              Explorez notre catalogue complet de services pour créer la solution unique qui correspond parfaitement à votre vision.
            </p>
          </div>

          {/* Filtres et Recherche */}
          <div className="mt-16 sticky top-16 bg-cream/80 backdrop-blur-md py-4 z-10 flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="relative w-full md:w-1/3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                  <input 
                      type="text"
                      placeholder="Rechercher un service..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-rose-powder/30 rounded-full bg-white focus:ring-2 focus:ring-magenta"
                  />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                  {serviceCategories.map(category => (
                      <button key={category.id} onClick={() => setActiveFilter(category.id)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeFilter === category.id ? 'bg-magenta text-white' : 'bg-white text-charcoal hover:bg-rose-powder/20'}`}>
                          {category.name}
                      </button>
                  ))}
              </div>
          </div>

          {/* Grille des services */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.length > 0 ? (
              filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <Tag className="w-12 h-12 mx-auto text-charcoal/30" />
                <h3 className="mt-4 text-lg font-medium text-charcoal">Aucun service ne correspond à votre recherche</h3>
                <p className="mt-1 text-sm text-charcoal/60">Essayez d'autres mots-clés ou un autre filtre.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
