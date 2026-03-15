import { useState, useEffect } from 'react';
import './Hero.css';

const IMAGES = [
  `${process.env.PUBLIC_URL}/hero-bg.jpg`,
  `${process.env.PUBLIC_URL}/hero-bg-2.jpg`,
  `${process.env.PUBLIC_URL}/hero-bg-3.jpg`,
  `${process.env.PUBLIC_URL}/hero-bg-4.jpg`,
];

const INTERVAL = 5000; // ms between slides

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="hero">
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className="hero__bg"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}
      <div className="hero__content">
        <p className="hero__eyebrow">Contemporary Art</p>
        <h1 className="hero__title">Aramazd</h1>
        <p className="hero__tagline">Exploring light, emotion, and the spaces between</p>
        <a href="#gallery" className="hero__cta">View Gallery</a>
      </div>
      <div className="hero__scroll-hint">
        <span />
      </div>
    </section>
  );
}

export default Hero;
