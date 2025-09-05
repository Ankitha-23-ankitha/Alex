import React, { useEffect, useState } from 'react';

function Cover({ cover_i, title }) {
  const src = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : 'https://placehold.co/160x240?text=No+Cover';
  return <img src={src} alt={title} className="cover" />;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('bf:favs');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('bf:favs', JSON.stringify(favorites));
  }, [favorites]);

  async function search(e) {
    if (e) e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError('');
    setBooks([]);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(q)}&limit=30`);
      if (!res.ok) throw new Error('API error: ' + res.status);
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }

  function toggleFav(key) {
    setFavorites(prev => prev.includes(key) ? prev.filter(k=>k!==key) : [...prev, key]);
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Book Finder — for Alex</h1>
        <p className="muted">Search books by title using the Open Library API</p>
      </header>

      <form className="search" onSubmit={search}>
        <input
          aria-label="Search books by title"
          placeholder="Search by title (e.g. 'Pragmatic Programmer')"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="meta">
        {loading && <span>Loading…</span>}
        {error && <span className="error">{error}</span>}
        {!loading && !error && books.length>0 && <span>Found {books.length} results</span>}
        {favorites.length>0 && <span> · Favorites: {favorites.length}</span>}
      </div>

      <main className="grid">
        {books.map(b => (
          <article key={b.key} className="card">
            <div className="thumb">
              <Cover cover_i={b.cover_i} title={b.title} />
            </div>
            <div className="info">
              <h3 title={b.title}>{b.title}</h3>
              <p className="authors">{b.author_name ? b.author_name.join(', ') : 'Unknown'}</p>
              <p className="year">{b.first_publish_year || '–'}</p>
              <div className="row">
                <a href={b.key ? `https://openlibrary.org${b.key}` : '#'} target="_blank" rel="noreferrer" className="link">Open</a>
                <button onClick={() => toggleFav(b.key)} className="fav">{favorites.includes(b.key) ? 'Unsave' : 'Save'}</button>
              </div>
            </div>
          </article>
        ))}
      </main>

      <footer className="footer">
        <small>Data: Open Library · Built for Alex · Include ChatGPT conversation link for Level 1 proof.</small>
      </footer>
    </div>
  );
}
