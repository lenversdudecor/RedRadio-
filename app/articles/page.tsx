import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import ArticlesPageClient from './ArticlesPageClient';

export default function ArticlesPage() {
  const articles = getAllArticles();

  return <ArticlesPageClient articles={articles} />;
}
