import { getArticleBySlug, getAllArticles, getAllSlugs } from '@/lib/articles';
import { notFound } from 'next/navigation';
import ArticlePageClient from './ArticlePageClient';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return notFound();

  const related = getAllArticles().filter((a) => a.slug !== article.slug).slice(0, 2);

  return <ArticlePageClient article={article} related={related} />;
}
