export enum NewsCategory {
  ALL = "all",
  TECHNOLOGY = "technology",
  BOOKS = "books",
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  source: string;
  category: NewsCategory;
  date: string;
  author: string;
  image: string;
  readTime: string;
}
