'use client';

import { useEffect, useState } from 'react';

interface NewsArticle {
  title: string;
  url: string;
  source: string;
  published_at: string;
}

export default function NewsFeedModule() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Replace with your actual API or TwelveData later
        const response = await fetch('/api/news');
        const data = await response.json();
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching news:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-feed-module">
      {loading ? (
        <p>Loading news...</p>
      ) : articles.length === 0 ? (
        <p>No news articles found.</p>
      ) : (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
              <div className="meta">
                {article.source} — {new Date(article.published_at).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
