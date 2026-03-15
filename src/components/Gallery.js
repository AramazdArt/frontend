import { useState, useEffect } from 'react';
import { getArtworks } from '../artworks';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Gallery.css';

const CATEGORIES = [
  { label: 'All', match: null },
  { label: 'Oil', match: 'oil' },
  { label: 'Pastel', match: 'pastel' },
];

function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [category, setCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.05 });

  useEffect(() => {
    setArtworks(getArtworks());
  }, []);

  const filtered = category === 'All'
    ? artworks
    : artworks.filter((a) => a.medium.toLowerCase().includes(
        CATEGORIES.find((c) => c.label === category).match
      ));

  const openLightbox = (artwork) => setLightbox(artwork);
  const closeLightbox = () => setLightbox(null);

  return (
    <section id="gallery" className="gallery">
      <div ref={headerRef} className="gallery__header reveal">
        <p className="gallery__eyebrow">Works</p>
        <h2 className="gallery__title">Gallery</h2>
        <div className="gallery__categories">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              className={`gallery__cat-btn ${category === c.label ? 'active' : ''}`}
              onClick={() => setCategory(c.label)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="gallery__grid reveal">
        {filtered.length === 0 ? (
          <p className="gallery__empty">No works in this category yet.</p>
        ) : (
          filtered.map((art) => (
            <div
              key={art.id}
              className={`gallery__item gallery__item--${art.size}`}
              onClick={() => openLightbox(art)}
            >
              <img src={art.img} alt={art.title} loading="lazy" />
              <div className="gallery__overlay">
                <p className="gallery__item-title">{art.title}</p>
                <p className="gallery__item-meta">{art.medium} · {art.year}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">✕</button>
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} />
            <div className="lightbox__info">
              <h3>{lightbox.title}</h3>
              <p>{lightbox.medium} · {lightbox.year}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
