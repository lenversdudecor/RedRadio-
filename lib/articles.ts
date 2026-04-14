import raw from './articles.json';

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string; // ISO
  tags?: string[];
};

const articles: Article[] = raw as Article[];

export function getAllArticles(): Article[] {
  return articles.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}
