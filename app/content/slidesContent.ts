import radio from "@/public/img/slider0_radio.jpg";
import micro from "@/public/img/micro.jpg";
import camera from "@/public/img/camera.jpg";
import casque from "@/public/img/casque.jpg";
import terre from "@/public/img/terre.jpg";
import Casque from "@/public/img/casque2.jpg";





const slides = [
  // 1. SLIDE 0 (ACCUEIL)
  // 2. SLIDES TEXTE
  {
    id: 1,
    type: "text",
    text: " On reprend \"Vibrer\" et \"Passions\" mais avec élégance. Bienvenue dans L'Envers du Décor. Une radio qui vibre au rythme de vos passions. Ici, pas de barrières. Du sport à la gastronomie, de l'Histoire à la Pop Culture, nous réunissons une communauté d'insatiables curieux. Scrollez pour découvrir ce qui nous unit.",
    sub: "Introduction",
    img: micro
  },
  {
    id: 2,
    type: "text",
    text: "On mélange le Voyage et l'Histoire. L'Histoire s'écrit ensemble, du passé aux horizons lointains. Que ce soit pour explorer les secrets d'un lieu oublié ou pour s'évader à l'autre bout du monde, chaque émission est un voyage. Nous traversons les frontières et les époques pour nourrir votre imaginaire.",
    sub: "L'Origine",
    img: camera
  },
  {
    id: 3,
    type: "text",
    text: "On intègre la notion de \"Communauté\" et d'échange. Plus qu'une fréquence, un lieu de rencontre. Laissez-vous emporter par la magie de la radio. Loin des débats stériles, nous créons un espace d'échange authentique où supporters, voyageurs et passionnés du monde entier se retrouvent pour partager l'instant.",
    sub: "Le Chaos",
    img: casque
  },
  {
    id: 4,
    type: "text",
    text: "Le micro est ouvert. Rejoignez le débat. La communauté vous attend. Montez le son, vivez les moments forts avec nous et entrez dans la danse. C'est votre radio, c'est votre passion.",
    sub: "Rejoignez-nous",
    img: terre
  },
  // 3. SLIDE FINAL (BOUTONS)
  {
    id: 5,
    type: "cta", 
    text: "",
    sub: "",
    img: Casque
  }
];

export default slides;