import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArtworks } from '../artworks';
import './GalleryPage.css';

const CATEGORIES = [
  { label: 'All', match: null },
  { label: 'Oil', match: 'oil' },
  { label: 'Pastel', match: 'pastel' },
];

function GalleryPage() {
  const [artworks, setArtworks] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    setArtworks(getArtworks());
  }, []);

  const filtered = category === 'All'
    ? artworks
    : artworks.filter((a) =>
        a.medium.toLowerCase().includes(
          CATEGORIES.find((c) => c.label === category).match
        )
      );

  const closeLightbox = () => setLightbox(null);

  const showPrev = () => {
    const idx = filtered.findIndex((a) => a.id === lightbox.id);
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length]);
  };

  const showNext = () => {
    const idx = filtered.findIndex((a) => a.id === lightbox.id);
    setLightbox(filtered[(idx + 1) % filtered.length]);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="gallery-page">
      <header className="gallery-page__header">
        <Link to="/" className="gallery-page__back">← Back</Link>
        <span className="gallery-page__brand">Aramazd</span>
        <span className="gallery-page__count">{filtered.length} works</span>
      </header>

      <div className="gallery-page__top">
        <h1 className="gallery-page__title">Gallery</h1>
        <div className="gallery-page__filters">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              className={`gallery-page__filter ${category === c.label ? 'active' : ''}`}
              onClick={() => setCategory(c.label)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-page__grid">
        {filtered.length === 0 ? (
          <p className="gallery-page__empty">No works in this category yet.</p>
        ) : (
          filtered.map((art) => (
            <div
              key={art.id}
              className={`gallery-page__item gallery-page__item--${art.size}`}
              onClick={() => setLightbox(art)}
            >
              <img src={art.img} alt={art.title} loading="lazy" />
              <div className="gallery-page__overlay">
                <p className="gallery-page__item-title">{art.title}</p>
                <p className="gallery-page__item-meta">{art.medium} · {art.year}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {lightbox && (
        <div className="gallery-page__lightbox" onClick={closeLightbox}>
          <button className="gallery-page__lb-close" onClick={closeLightbox}>✕</button>
          <button className="gallery-page__lb-prev" onClick={(e) => { e.stopPropagation(); showPrev(); }}>‹</button>
          <div className="gallery-page__lb-inner" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} />
            <div className="gallery-page__lb-info">
              <h3>{lightbox.title}</h3>
              <p>{lightbox.medium} · {lightbox.year}</p>
            </div>
          </div>
          <button className="gallery-page__lb-next" onClick={(e) => { e.stopPropagation(); showNext(); }}>›</button>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
