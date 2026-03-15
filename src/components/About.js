import './About.css';
import { useScrollReveal } from '../hooks/useScrollReveal';

function About() {
  const imageRef = useScrollReveal();
  const textRef = useScrollReveal();

  return (
    <section id="about" className="about">
      <div className="about__inner">
        <div ref={imageRef} className="about__image reveal">
          <img src={`${process.env.PUBLIC_URL}/about_image.png`} alt="Artist portrait" />
        </div>
        <div ref={textRef} className="about__text reveal reveal-delay-2">
          <p className="about__eyebrow">About</p>
          <h2 className="about__title">Aramazd</h2>
          <p className="about__bio">
            A contemporary artist working across oil, acrylic, and mixed media.
            My work explores the interplay of light and shadow, drawing from
            the quieter moments of everyday experience.
          </p>
          <p className="about__bio">
            Born and raised in the city, I studied Fine Arts before establishing
            my studio practice. My pieces have been exhibited across galleries
            in Europe and North America.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
