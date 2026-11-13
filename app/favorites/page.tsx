'use client';

import { useMemo, useState } from 'react';
import { articleList, type Article } from '@/src/features/articles';
import { catalogProducts } from '@/src/features/cart';
import { PageShell } from '@/src/shared/components/page-shell';
import { useLocalStorage } from '@/src/shared/hooks/use-local-storage';

export default function FavoritesPage() {
  const [articleFavorites, setArticleFavorites] = useLocalStorage<string[]>('ishadeed-dashboard-favorites', []);
  const [productFavorites, setProductFavorites] = useLocalStorage<string[]>('ishadeed-product-favorites', ['skipper-bottle']);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const favoriteArticles = useMemo(
    () => articleList.filter((article) => articleFavorites.includes(article.id)),
    [articleFavorites],
  );

  const favoriteProducts = useMemo(
    () => catalogProducts.filter((product) => productFavorites.includes(product.id)),
    [productFavorites],
  );

  const toggleProduct = (id: string) => {
    setProductFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const toggleArticle = (id: string) => {
    setArticleFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <PageShell title="Favorite Items">
      <div className="favorites-grid">
        <div className="favorites-panel">
          <h2>Articles</h2>
          {favoriteArticles.length === 0 ? (
            <div className="empty-state empty-state--compact">
              <p>No favorite articles yet.</p>
            </div>
          ) : (
            <ul className="stack-list">
              {favoriteArticles.map((article) => (
                <li key={article.id}>
                  <button type="button" className="inline-link" onClick={() => setSelectedArticle(article)}>
                    {article.title}
                  </button>
                  <button type="button" className="text-button" onClick={() => toggleArticle(article.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="favorites-panel">
          <h2>Products</h2>
          {favoriteProducts.length === 0 ? (
            <div className="empty-state empty-state--compact">
              <p>No favorite products yet.</p>
            </div>
          ) : (
            <ul className="stack-list">
              {favoriteProducts.map((product) => (
                <li key={product.id}>
                  <span>{product.name}</span>
                  <button type="button" className="text-button" onClick={() => toggleProduct(product.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedArticle && (
        <div className="modal-backdrop" onClick={() => setSelectedArticle(null)}>
          <div className="modal-card modal-card--article" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelectedArticle(null)}>
              ×
            </button>
            <h3>{selectedArticle.title}</h3>
            <p>{selectedArticle.description}</p>
            <div className="article-modal__meta">
              <span>By {selectedArticle.author}</span>
              <button type="button" className="favorite-toggle is-active" onClick={() => toggleArticle(selectedArticle.id)}>
                Remove favorite
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
