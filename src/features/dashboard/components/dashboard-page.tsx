'use client';

import { useMemo, useState } from 'react';
import { articleList, matchesArticleQuery, type Article } from '@/src/features/articles';
import { filterSellers, sellerProfiles, type Seller, type SellerFilter } from '@/src/features/sellers';
import { AppShell } from '@/src/shared/components/app-shell';
import { useLocalStorage } from '@/src/shared/hooks/use-local-storage';

const topArticles = articleList.slice(0, 4);

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5c2.3 2.8 3.6 4.8 3.6 7 0 2.5-1.8 4.2-4 4.2s-4-1.7-4-4c0-1.7.8-3 2.3-5.1C9.8 3.9 10.8 2.8 12 2.5Zm-1.8 10.9c1 .8 1.8 1.8 1.8 3.1 0 1.9-1.3 3.5-3.1 3.5-1.9 0-3.5-1.6-3.5-3.5 0-2.2 1.5-3.8 3.6-4.8-.5 1.4-.1 2.9 1.2 4.2Z" fill="currentColor" />
    </svg>
  );
}

function ArticleThumb({ article }: { article: Article }) {
  const blueIcon = article.thumbnailType === 'trophy' ? <span className="icon-trophy">🏆</span> : <span className="icon-touch">✋</span>;

  return (
    <div className="article-thumb article-thumb--blue">
      <div className="article-thumb__pattern" aria-hidden="true" />
      {blueIcon}
    </div>
  );
}

function SellerCard({ seller, onSelect }: { seller: Seller; onSelect: (seller: Seller) => void }) {
  return (
    <button type="button" className="seller-card" onClick={() => onSelect(seller)}>
      <img src={seller.avatar} alt={seller.name} />
      <div>
        <span>{seller.name}</span>
        <small>{seller.orders} orders</small>
      </div>
    </button>
  );
}

export function DashboardPage() {
  const [sellerFilter, setSellerFilter] = useState<SellerFilter>('all');
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useLocalStorage<string[]>('ishadeed-dashboard-favorites', []);

  const filteredSellers = useMemo(
    () => filterSellers(sellerProfiles, sellerFilter),
    [sellerFilter],
  );

  const matchingArticles = useMemo(() => {
    const next = articleList.filter((article) => matchesArticleQuery(article, query));
    return next;
  }, [query]);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const toggleFavorite = (articleId: string) => {
    setFavorites((current) =>
      current.includes(articleId)
        ? current.filter((id) => id !== articleId)
        : [...current, articleId],
    );
  };

  return (
    <AppShell>
      <section className="card card--large">
        <div className="card-header card-header--between">
          <div className="card-title">
            <span className="card-title__icon flame"><FlameIcon /></span>
            <h2>Top Sellers</h2>
          </div>

          <div className="dropdown-wrap">
            <label htmlFor="seller-filter" className="sr-only">
              Filter sellers
            </label>
            <select
              id="seller-filter"
              value={sellerFilter}
              onChange={(event) => setSellerFilter(event.target.value as SellerFilter)}
            >
              <option value="all">All Sellers</option>
              <option value="most">Most Orders</option>
              <option value="least">Least Orders</option>
              <option value="recent">Recently Active</option>
            </select>
          </div>
        </div>

        <div className="seller-grid">
          {filteredSellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} onSelect={setSelectedSeller} />
          ))}
        </div>
      </section>

      <section className="card card--large top-articles">
        <div className="card-header">
          <div className="card-title">
            <span className="card-title__icon flame"><FlameIcon /></span>
            <h2>Top Articles</h2>
          </div>
        </div>

        <div className="article-mini-grid">
          {topArticles.map((article) => {
            const active = favoriteSet.has(article.id);
            return (
              <button
                type="button"
                key={article.id}
                className="article-mini"
                onClick={() => setSelectedArticle(article)}
              >
                <ArticleThumb article={article} />
                <div className="article-mini__meta">
                  <div className="article-mini__title">{article.title}</div>
                  <div className="article-mini__author">
                    By <span>{article.author}</span>
                  </div>
                </div>
                <span className={['favorite-chip', active ? 'is-favorite' : ''].join(' ')} aria-label="Toggle favorite">
                  ★
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card card--latest">
        <div className="card-header card-header--stack">
          <div className="card-title">
            <span className="card-title__icon flame"><FlameIcon /></span>
            <h2>Latest Bla Bla</h2>
          </div>

          <form
            className="search-form"
            onSubmit={(event) => {
              event.preventDefault();
              setQuery(query.trim());
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What are you looking for?"
              aria-label="Search articles"
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="latest-grid">
          {matchingArticles.length > 0 ? (
            matchingArticles.map((article) => {
              const active = favoriteSet.has(article.id);
              return (
                <article key={article.id} className="latest-card">
                  <button
                    type="button"
                    className="latest-card__button"
                    onClick={() => setSelectedArticle(article)}
                    aria-label={`Open ${article.title}`}
                  >
                    <div className="latest-card__thumb">
                      <div className="latest-card__thumb-pattern" aria-hidden="true" />
                    </div>
                    <div className="latest-card__content">
                      <h3>{article.title}</h3>
                      <p>
                        By <span>{article.author}</span>
                      </p>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={['favorite-toggle', active ? 'is-active' : ''].join(' ')}
                    onClick={() => toggleFavorite(article.id)}
                    aria-label={active ? 'Remove favorite' : 'Add to favorites'}
                  >
                    {active ? '♥' : '♡'}
                  </button>
                </article>
              );
            })
          ) : (
            <div className="empty-state">
              <p>No articles match your search.</p>
              <button type="button" onClick={() => setQuery('')}>
                Reset search
              </button>
            </div>
          )}
        </div>
      </section>

      {selectedSeller && (
        <div className="modal-backdrop" onClick={() => setSelectedSeller(null)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelectedSeller(null)}>
              ×
            </button>
            <img src={selectedSeller.avatar} alt={selectedSeller.name} className="modal-card__avatar" />
            <h3>{selectedSeller.name}</h3>
            <div className="modal-card__stats">
              <div>
                <span>Total Orders</span>
                <strong>{selectedSeller.orders}</strong>
              </div>
              <div>
                <span>Sales</span>
                <strong>{selectedSeller.totalSales}</strong>
              </div>
            </div>
            <p>{selectedSeller.description}</p>
            <div className="modal-card__meta">{selectedSeller.salesLabel}</div>
          </div>
        </div>
      )}

      {selectedArticle && (
        <div className="modal-backdrop" onClick={() => setSelectedArticle(null)}>
          <div className="modal-card modal-card--article" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelectedArticle(null)}>
              ×
            </button>
            <div className="article-modal__header">
              <div className="article-modal__thumb">
                <div className="latest-card__thumb-pattern" aria-hidden="true" />
              </div>
              <div>
                <span className="meta-label">{selectedArticle.category}</span>
                <h3>{selectedArticle.title}</h3>
                <p>
                  By <span>{selectedArticle.author}</span>
                </p>
              </div>
            </div>
            <div className="article-modal__body">
              <p>{selectedArticle.description}</p>
              <div className="article-modal__meta">
                <span>Published: {selectedArticle.publishedAt}</span>
                <button
                  type="button"
                  className={['favorite-toggle', favoriteSet.has(selectedArticle.id) ? 'is-active' : ''].join(' ')}
                  onClick={() => toggleFavorite(selectedArticle.id)}
                >
                  {favoriteSet.has(selectedArticle.id) ? 'Remove favorite' : 'Add to favorites'}
                </button>
              </div>
            </div>
            <div className="article-modal__tags">
              {selectedArticle.keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
