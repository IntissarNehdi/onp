import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="col-md-3 sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-list-item"><a href="https://www.idm.tu-darmstadt.de/password/recovery" target="_blank" rel="noopener noreferrer" className="sidebar-link">Passwort vergessen?</a></li>
        <li className="sidebar-list-item"><a href="https://www.idm.tu-darmstadt.de/activation" target="_blank" rel="noopener noreferrer" className="sidebar-link">Aktivierung der TU-ID</a></li>
        <li className="sidebar-list-item"><a href="https://www.hrz.tu-darmstadt.de/services/regelwerk/index.de.jsp" target="_blank" rel="noopener noreferrer" className="sidebar-link">Regelwerke</a></li>
        <li className="sidebar-list-item"><a href="https://www.hrz.tu-darmstadt.de/kontakt" target="_blank" rel="noopener noreferrer" className="sidebar-link">Hilfe benötigt?</a></li>
        <li className="sidebar-list-item"><a href="https://www.idm.tu-darmstadt.de" target="_blank" rel="noopener noreferrer" className="sidebar-link">IDM-Portal</a></li>
        <li className="sidebar-list-item"><a href="https://login.tu-darmstadt.de/2fa" target="_blank" rel="noopener noreferrer" className="sidebar-link">2FA-Verwaltung</a></li>
        <li className="sidebar-list-item"><a href="https://www.hrz.tu-darmstadt.de/hrz_aktuelles/hrz_news/index.de.jsp" target="_blank" rel="noopener noreferrer" className="sidebar-link">HRZ-News</a></li>
      </ul>
      <p className="sidebar-notice"><strong>Hinweis:</strong><br />Aus Sicherheitsgründen sollten Sie sich bei Verlassen der geschützten Bereiche explizit ausloggen und Ihren Webbrowser schließen!</p>
    </div>
  );
};

export default Sidebar;

