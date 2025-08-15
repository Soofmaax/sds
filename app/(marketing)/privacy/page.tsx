// Fichier: app/privacy/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { PRIVACY_POLICY_CONTENT as content } from './privacy-content';

// Les métadonnées peuvent aussi être générées dynamiquement à partir du contenu
export const metadata: Metadata = {
  title: content.title,
  description: content.subtitle,
  robots: { index: true, follow: true },
};

// --- Composants de Présentation (peuvent être dans leur propre fichier UI) ---

// Composant pour parser le texte et remplacer les liens
const FormattedText = ({ text }: { text: string }) => {
  const linkRegex = /page de contact/g;
  const parts = text.split(linkRegex);

  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && <Link href="/contact">page de contact</Link>}
        </span>
      ))}
    </>
  );
};

// --- La Page ---

export default function PrivacyPage() {
  return (
    <div className="bg-cream">
      <div className="container mx-auto max-w-4xl px-4 py-24 sm:py-32">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-playfair font-bold text-charcoal sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-4 text-lg text-charcoal/80 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </header>

        <article className="prose prose-lg prose-slate mx-auto max-w-full 
                          prose-headings:font-playfair prose-headings:text-charcoal 
                          prose-a:text-magenta hover:prose-a:text-magenta/80 prose-strong:text-charcoal
                          prose-p:my-3 prose-ul:my-4">
          
          <p className="lead !text-xl !text-charcoal/90">{content.lead}</p>

          {content.sections.map((section) => (
            <section key={section.id} className="mt-10">
              <h2>{section.title}</h2>
              {section.content.map((item, index) => {
                if (typeof item === 'string') {
                  return <p key={index}><FormattedText text={item} /></p>;
                }
                if (item.type === 'list') {
                  return (
                    <ul key={index}>
                      {item.items.map((li, liIndex) => (
                        <li key={liIndex} dangerouslySetInnerHTML={{ __html: li }} />
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </section>
          ))}

          <footer className="mt-12 text-center text-sm text-charcoal/60">
            <p>Dernière mise à jour le {content.lastUpdated}.</p>
          </footer>
        </article>
      </div>
    </div>
  );
}
