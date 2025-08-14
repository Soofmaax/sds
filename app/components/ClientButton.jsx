// app/components/ClientButton.jsx
// Ce composant va gérer le clic. Il doit donc être un composant client.
'use client';

import React from 'react';

// Composant de bouton réutilisable.
// Il doit être un Client Component car il gère l'événement onClick.
const ClientButton = ({ children, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ClientButton;

// app/page.jsx
// Ce composant est un Server Component par défaut, car il n'a pas la directive 'use client'.
// Il peut importer et utiliser le Client Component 'ClientButton'.
import ClientButton from './components/ClientButton';
import { Mail, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Ce code est une version simplifiée du fichier d'origine,
// en se concentrant sur la correction de l'erreur des "Client Components".
// Le code original plus complexe est omis pour des raisons de clarté.
export default function ServiceDetailPage({ params }) {
  // Les fonctions qui nécessitent une interaction utilisateur doivent être
  // soit dans un 'Client Component', soit passées à un 'Client Component'.
  const handleAddToCart = () => {
    console.log("Ajouté au panier !");
  };

  const handleRequestQuote = () => {
    console.log("Devis demandé !");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <main className="xl:col-span-3 space-y-12">
        <section>
          <h2 className="text-3xl font-playfair font-bold text-charcoal mb-8">
            Fonctionnalités et actions
          </h2>
          <p className="mb-8 text-charcoal/80">
            Cette section illustre comment utiliser un "Client Component"
            pour gérer les actions utilisateur sans rendre tout le composant de page côté client.
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* On utilise notre composant ClientButton pour gérer le clic */}
            <ClientButton onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Ajouter au panier
            </ClientButton>
            <ClientButton onClick={handleRequestQuote}>
              <Mail className="w-5 h-5 mr-2" />
              Demander un devis gratuit
            </ClientButton>
          </div>
        </section>
      </main>
    </div>
  );
}
