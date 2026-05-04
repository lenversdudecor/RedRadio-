import radio from "@/public/img/slider0_radio.jpg";
import micro from "@/public/img/micro.jpg";
import camera from "@/public/img/camera.jpg";
import casque from "@/public/img/casque.jpg";
import terre from "@/public/img/terre.jpg";
import Casque from "@/public/img/casque2.jpg";

const slides = [
  // 1. SLIDE 0 (ACCUEIL) - Répond au "Qui, Quoi, Pour qui"
  {
    id: 1,
    type: "text",
    text: "L'Envers du Décor : La webradio qui lève le voile.",
    sub: "R.E.D : Votre média de proximité en Seine-et-Marne. Sport, Gastronomie et Culture racontés sans filtre pour une communauté d'insatiables curieux.",
    img: micro
  },

  // 2. SLIDE SPORT - Met en avant le premier pilier d'émissions
  {
    id: 2,
    type: "text",
    text: "Le Sport au cœur de l'action.",
    sub: "Du débriefing PSG aux initiatives locales, nous vibrons avec vous derrière le micro pour partager l'essentiel, sans langue de bois.",
    img: camera
  },

  // 3. SLIDE CULTURE & HISTOIRE - Met en avant le second pilier
  {
    id: 3,
    type: "text",
    text: "L'Histoire et la Culture en immersion.",
    sub: "Explorez les secrets de notre territoire et évadez-vous à travers des récits authentiques qui nourrissent l'imaginaire.",
    img: casque
  },

  // 4. SLIDE GASTRONOMIE & ÉCHANGE - Met en avant le troisième pilier
  {
    id: 4,
    type: "text",
    text: "La Gastronomie et l'Art de vivre.",
    sub: "Découvrez les talents et les saveurs qui font la richesse de nos terroirs. Un espace d'échange bienveillant où chaque voix compte.",
    img: terre
  },

  // 5. SLIDE FINAL (BOUTONS) - Call-to-action vers le direct et les podcasts
  {
    id: 5,
    type: "cta", 
    text: "Prêt à passer derrière le rideau ?",
    sub: "Rejoignez la communauté R.E.D et vivez l'instant avec nous.",
    img: Casque
  }
];

export default slides;
