import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Active le mode export statique (génère un dossier 'out')
  output: 'export',

  // 2. Désactive l'optimisation d'image serveur (Indispensable pour l'export statique)
  images: {
    unoptimized: true, 
  },

  trailingSlash: true,

  // (Optionnel) Si votre site n'est pas à la racine du domaine, ajoutez basePath ici
  // basePath: '/mon-sous-dossier',
};

export default nextConfig;