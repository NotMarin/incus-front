"use client";

import { NewsCategory, NewsArticle } from "./types";
import { FeaturedNews } from "./components/featured-news";
import { NewsCard } from "./components/news-card";

export const categoryLabels: Record<NewsCategory, string> = {
  [NewsCategory.ALL]: "Todos",
  [NewsCategory.TECHNOLOGY]: "Tecnología",
  [NewsCategory.BOOKS]: "Libros",
};

const newsData: NewsArticle[] = [
  {
    id: "1",
    title:
      "Avances revolucionarios en inteligencia artificial transforman la industria tecnológica",
    description:
      "Los últimos desarrollos en IA generativa están ca forma en que las empresas operan y crean valor para sus clientes.",
    category: NewsCategory.TECHNOLOGY,
    publishedAt: "2024-12-01",
    source: "María García",
    image:
      "https://images.unsplash.com/photo-1579532537902-1e50099867b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbmV3c3xlbnwxfHx8fDE3NjQ0OTg1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Laura Martínez",
    date: "30 Nov 2024",
    readTime: "6 min",
  },
  {
    id: "2",
    title: "Nuevas estrategias empresariales para el crecimiento sostenible en 2025",
    description:
      "Expertos en negocios comparten insights sobre cómo las empresas pueden adaptarse a un mercado en constante evolución.",
    category: NewsCategory.BOOKS,
    publishedAt: "2024-11-30",
    source: "Carlos Rodríguez",
    image:
      "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzY0NTE3OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Laura Martínez",
    date: "30 Nov 2024",
    readTime: "6 min",
  },
  {
    id: "3",
    title: "Nuevas estrategias empresariales para el crecimiento sostenible en 2025",
    description:
      "Expertos en negocios comparten insights sobre cómo las empresas pueden adaptarse a un mercado en constante evolución.",
    category: NewsCategory.BOOKS,
    publishedAt: "2024-11-30",
    source: "Carlos Rodríguez",
    image: "",
    author: "Laura Martínez",
    date: "30 Nov 2024",
    readTime: "6 min",
  },
  {
    id: "4",
    title: "Nuevas estrategias empresariales para el crecimiento sostenible en 2025",
    description:
      "Expertos en negocios comparten insights sobre cómo las empresas pueden adaptarse a un mercado en constante evolución.",
    category: NewsCategory.BOOKS,
    publishedAt: "2024-11-30",
    source: "Carlos Rodríguez",
    image:
      "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzY0NTE3OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Laura Martínez",
    date: "30 Nov 2024",
    readTime: "6 min",
  },
];

function NewsPage() {
  return (
    <div className="min-h-screen space-y-4 py-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2>Noticia Destacada</h2>
        </div>
        <FeaturedNews {...newsData[0]} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2>Últimas Noticias</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsData.slice(1, 4).map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
