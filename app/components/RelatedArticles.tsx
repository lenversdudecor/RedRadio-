import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Données fictives (à remplacer par ton backend plus tard)
const RELATED = [
  {
    slug: "le-signal-wow",
    title: "Analyse du Signal Wow!",
    excerpt: "72 secondes d'intensité pure qui n'ont jamais trouvé d'explication.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    date: "Archive #42"
  },
  {
    slug: "ondes-binaurales",
    title: "Psychose et Ondes Binaurales",
    excerpt: "L'impact des fréquences décalées sur la perception du temps.",
    image: "https://images.unsplash.com/photo-1519111554667-3813bb38e523?auto=format&fit=crop&q=80&w=600",
    date: "Archive #19"
  }
];

export default function RelatedArticles() {
  return (
    <div className="mt-24 border-t border-neutral-800 pt-16">
      <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-500 mb-8">
        Dossiers Connexes
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {RELATED.map((item) => (
          <Link 
            key={item.slug} 
            href={`/articles/${item.slug}`}
            className="group block relative"
          >
            {/* Image Container avec effet de zoom */}
            <div className="relative h-64 w-full overflow-hidden bg-neutral-900 border border-white/5 mb-6">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover grayscale brightness-50 contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-75"
              />
              {/* Overlay Icon */}
              <div className="absolute top-4 right-4 bg-black/50 p-2 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
                <ArrowUpRight size={20} className="text-white" />
              </div>
            </div>

            {/* Texte */}
            <div className="pr-8">
              <span className="text-[10px] font-mono text-red-500 mb-2 block">
                {item.date}
              </span>
              <h4 className="font-serif text-2xl text-neutral-200 group-hover:text-white transition-colors mb-3 leading-tight">
                {item.title}
              </h4>
              <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                {item.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}