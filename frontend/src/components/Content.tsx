import React, { useRef } from 'react';
import './Content.css';
import { useNavigate } from 'react-router-dom';

const Content = () => {
  // Create refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Hook for navigation
  
  // Handle button click to navigate to login page
  const handleButtonClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  // Smooth scroll function
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="hero-section text-center mb-5">
        <h1>Willkommen bei Hochschulwahl</h1>
        <p className="lead text-justify">
          Sag Tschüss zu Papierchaos – die digitale Einreichung von Kandidatenlisten für Hochschulwahlen ist da! Schnell und sicher.
          Diese Plattform ersetzt den alten, papierbasierten Prozess und macht den gesamten Ablauf effizienter. Wahlamt, Vertrauenspersonen und
          Kandidaten profitieren von einer benutzerfreundlichen Lösung, die die Einreichung, Überprüfung und den Druck von Dokumenten vereinfacht.
        </p>
      </section>

      {/* Info Section */}
      <section id="info" ref={infoRef} className="info-section mb-5">
        <h2 className="text-center">So funktioniert die digitale Einreichung von Kandidatenlisten</h2>
        <div className="col-md-12">
          <p className="lead text-justify">
            Mit der Plattform wird die Einreichung von Kandidatenlisten schnell, einfach und digital. Die Vertrauensperson erstellt die Liste der
            Kandidierenden online, sicher mit der TU-ID. Kurz darauf erhalten die Kandidierenden eine E-Mail, um ihre Einverständniserklärung direkt
            auf der Webseite abzugeben. Alle Formulare werden sicher gespeichert und können jederzeit ausgedruckt werden, damit die Dokumente
            unterschrieben werden können. Nach der Unterschrift sammelt die Vertrauensperson alle Unterlagen und sendet sie entweder per E-Mail als
            PDF oder per Post an das Wahlamt. Dort wird alles überprüft, um sicherzustellen, dass die Wahlvorschlagslisten korrekt und nach den
            Regeln der TU Darmstadt bearbeitet werden.
          </p>
        </div>
        <div className="text-center mb-4">
          <img
            src="/src/assets/prozess.png"
            alt="Beschreibung des Bildes"
            className="img-fluid"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section id="cta" ref={ctaRef} className="cta-section text-center mb-5">
        <h2>Mach mit bei der Hochschulwahl!</h2>
        <button className="btn btn-primary" onClick={handleButtonClick}>
          Anmelden
        </button>
      </section>
    </div>
  );
};

export default Content;
