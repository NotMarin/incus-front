"use client";

import { useEffect, useState, useCallback } from "react";
import { NewsCategory, NewsArticle, categoryLabels } from "./types";
import { FeaturedNews } from "./components/featured-news";
import { NewsCard } from "./components/news-card";
import { Skeleton } from "@/components/ui/skeleton";

const API_BASE = "http://10.50.50.12:3004/api/noticias";

function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, _setCategory] = useState<string>(NewsCategory.ALL);

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = category === NewsCategory.ALL ? API_BASE : `${API_BASE}/categoria/${category}`;
      const response = await fetch(url);
      const data = await response.json();
      setNews(data.noticias ?? []);
    } catch {
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const featuredNews = news[0];
  const restNews = news.slice(1);

  return (
    <div className="min-h-screen space-y-4 py-4">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-lg" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))}
          </div>
        </div>
      ) : news.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">No hay noticias disponibles.</p>
      ) : (
        <>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2>Noticia Destacada</h2>
            </div>
            <FeaturedNews {...featuredNews} />
          </div>

          {restNews.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2>Últimas Noticias</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {restNews.map((article) => (
                  <NewsCard key={article._id} {...article} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NewsPage;
