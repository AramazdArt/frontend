import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__name">Aramazd</p>
        <div className="footer__social">
          <a href="https://www.instagram.com/aramazdpetrosyan/" target="_blank" rel="noopener noreferrer" className="footer__social-link">Instagram</a>
          <a href="https://www.facebook.com/aramazd.petrosyan" target="_blank" rel="noopener noreferrer" className="footer__social-link">Facebook</a>
        </div>
        <p className="footer__copy">© {year} All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
