import './Footer.css';  // Make sure to import your updated styles

const Footer = () => {
  return (
    <footer className="footer-section bg-primary text-white">
      <div className="footer-container d-flex justify-content-between align-items-center py-3">
        <div className="footer-left">
          <h5 className="footer-title mb-2">Hochschulwahl</h5>
          <p className="footer-description mb-0">Dein Portal zu den Hochschulwahlen.</p>
        </div>
        <div className="footer-right"  id='footer'>
          <p className="footer-address mb-0"><strong>Anschrift:</strong> Wahlamt, Hochschulstraße 1, 64289 Darmstadt</p>
          <p className="footer-address mb-0"><strong>Email:</strong> wahlamt@zv.tu-darmstadt.de</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
