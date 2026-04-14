"use client";

import Link from 'next/link';
import InterfaceOverlay from "@/app/components/InterfaceOverlay";
import MenuOverlay from "@/app/components/MenuOverlay";
import { useState } from "react";

export default function PrivacyPolicyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-[#e0d5c1] selection:bg-orange-900 selection:text-white font-sans overflow-x-hidden">
      
      <div className="noise-overlay" />
      <div className="ambient-light fixed inset-0 opacity-20 pointer-events-none" />
      
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <InterfaceOverlay openMenu={() => setIsMenuOpen(true)} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
        
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-orange-400 transition-colors mb-12">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 2L4 8l6 6"/>
          </svg>
          <span className="text-sm font-medium">Retour à l'accueil</span>
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 text-transparent bg-clip-text bg-linear-to-r from-neutral-200 via-orange-100 to-neutral-200">
          Politique de Confidentialité
        </h1>

        <div className="prose prose-invert max-w-none text-neutral-300 [&_h2]:text-orange-200 [&_h2]:font-serif [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_p]:mb-4 [&_p]:leading-relaxed [&_a]:text-orange-400 [&_a:hover]:text-orange-300">
          <p className="text-neutral-500 mb-8 italic">Dernière mise à jour : 8 Avril 2026</p>

          <h2>1. Responsable du traitement</h2>
          <p>Le responsable du traitement des données est <strong>La Radio de l'Envers du Décor</strong>.</p>
          <p>Contact : <a href="mailto:lenversdudecorsainedecrime@gmail.com">lenversdudecorsainedecrime@gmail.com</a></p>

          <h2>2. Données collectées</h2>
          <p>Lorsque vous utilisez notre formulaire de contact, nous collectons de manière explicite les données suivantes :</p>
          <ul className="list-disc pl-6 mb-4 marker:text-orange-600">
            <li>Identifiant (Nom de Code)</li>
            <li>Adresse email (Fréquence de Retour)</li>
            <li>Contenu du message (Données Cryptées)</li>
          </ul>

          <h2>3. Finalité et base légale</h2>
          <p>Ces données sont collectées dans l'unique but de traiter votre demande et de vous répondre.</p>
          <p>La base légale de ce traitement est votre consentement (article 6.1.a du RGPD) lorsque vous validez l'envoi du formulaire.</p>

          <h2>4. Stockage et Destinataires (Absence de base de données web)</h2>
          <p>Nous ne stockons aucune de vos données personnelles sur la base de données de notre site web. Les informations saisies dans le formulaire génèrent un email envoyé de manière sécurisée directement vers notre boîte de réception professionnelle (GMAIL).</p>
          <p>Le seul destinataire de ces données est <strong>La Radio de l'Envers du Décor</strong>. Vos données ne sont ni vendues, ni louées, ni cédées à des tiers.</p>

          <h2>5. Durée de conservation</h2>
          <p>Les emails reçus via le formulaire sont conservés dans notre boîte de réception uniquement le temps nécessaire au traitement de votre demande.</p>
          <p>Si la demande n'aboutit pas à un échange continu, l'email est supprimé au bout de 1 an maximum.</p>
          <p>Si une relation s'établit, les échanges sont conservés pendant toute la durée de la relation, puis archivés à des fins légales, administratives ou de prospection pendant une durée maximale de 3 ans après la fin de la relation.</p>

          <h2>6. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :</p>
          <ul className="list-disc pl-6 mb-4 marker:text-orange-600">
            <li>Droit d'accès et de portabilité</li>
            <li>Droit de rectification</li>
            <li>Droit d'effacement (droit à l'oubli)</li>
            <li>Droit de limitation et d'opposition au traitement</li>
          </ul>
          <p>Pour exercer ces droits, vous pouvez nous contacter directement par email à : <a href="mailto:lenversdudecorsainedecrime@gmail.com">lenversdudecorsainedecrime@gmail.com</a>. Une réponse vous sera apportée sous 30 jours maximum.</p>

          <h2>7. Politique relative aux cookies et traceurs</h2>
          <p>La Radio de l'Envers du Décor utilise des cookies et technologies similaires (comme le stockage local de votre navigateur) pour améliorer votre expérience de navigation et gérer le lecteur audio de manière fluide.</p>
          <ul className="list-disc pl-6 mb-4 marker:text-orange-600">
            <li><strong>Obligatoires / Strictement nécessaires :</strong> Cookies essentiels au bon fonctionnement du site (ex: maintenir la lecture audio continue en arrière-plan pendant la navigation, ou se souvenir de votre choix de consentement). Ils ne nécessitent pas de consentement préalable.</li>
            <li><strong>Analytiques / Optionnels :</strong> Peuvent être utilisés pour mieux comprendre l'audience de nos ondes et améliorer nos contenus.</li>
          </ul>
          <p>Lors de votre première visite, un bandeau vous informe de l'utilisation de ces technologies et vous permet de donner ou refuser votre consentement (pour les cookies non essentiels). Votre préférence est sauvegardée (dans un cookie/localStorage strictement nécessaire) afin de ne pas vous redemander à chaque page, pour une durée maximale de 6 mois.</p>
          <p>Vous avez le droit de modifier ce choix à tout moment en effaçant les cookies de votre navigateur via les paramètres de ce dernier.</p>

          <h2>8. Autorité de contrôle</h2>
          <p>Si vous estimez, après nous avoir contactés, que vos droits sur vos données ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">www.cnil.fr</a>.</p>
        </div>
      </div>
    </main>
  );
}
