import React, { useState } from 'react';
import './ConsentForm.css';
import PersonalInfos from './PersonalInfos';
import Fields from './Fields';
import KennwortSemester from './Kennwort&Semester';

import logo from './tuda_logo.jpg';

const Einverstaendniserklaerung: React.FC = () => { 

  const [date, setDate] = useState(() => {
          const today = new Date();
          return today.toISOString().split('T')[0]; // Gibt das Datum im Format "YYYY-MM-DD" zurück
  });
  

  return (
    <div className="proposal-list-container">
      {/* logo der TU oben rechts */}
      <img src={logo} alt="TU_DA Logo" className="top-right-image" />
      <h1 className="title">Einverständniserklärung</h1>
      <form className="proposal-form">
        <PersonalInfos/>
        <Fields/>
        <KennwortSemester/>
        <div className="form-container">
        <div className="date-form-section">
            <label htmlFor="date">Darmstadt, den </label>
                <input
                type="date"
                id="date"
                name="date"
                value={date} // Verwendet den Zustand für das aktuelle Datum
                onChange={(e) => setDate(e.target.value)} // Ermöglicht die Änderung des Datums
                required
            />
            </div>


          <div className="signature-container">
            <div className="signature-area"></div>
              <label>Eigenhändige Unterschrift</label>
            </div>

        </div>

        <div className="Hinweis">
        <label>Hinweis:</label>
        Rechtsgrundlage für die Erhebung der voran genannten personenbezogenen Daten ist § 16 der Wahlordnung der
        TU Darmstadt. Die Verarbeitung der Daten durch das Wahlamt sowie den Wahlvorstand erfolgt nach den Vorschriften der
        Datenschutz-Grundverordnung (DSGVO) und des Hessischen Datenschutz- und Informationsfreiheitsgesetzes (HDSIG).
        Gemäß § 18 Abs. 10 der Wahlordnung werden die Wahlvorschläge nur mit Name, Vorname und Fach- und Studienbereich
        bzw. Einrichtung der Bewerber:innen veröffentlicht. Eine Rücknahme der Erklärung ist gemäß § 16 Abs. 6 Satz 3 der
        Wahlordnung bis zur abschließenden Zulassungsprüfung durch schriftliche Erklärung gegenüber dem Wahlvorstand möglich.
        </div>
        
        <button type="submit" className="submit-button">
          Abschicken
        </button>
      
      </form>
    </div>
  );
};

export default Einverstaendniserklaerung;
