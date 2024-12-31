import React, { useState } from 'react';  
import './ConsentForm.css';  
import PersonalInfos from './PersonalInfos';  
import Fields from './Fields'; 
import KennwortSemester from './Kennwort&Semester';  
import logo from './tuda_logo.jpg';  // Importing logo image

// Functional component for the Einverstaendniserklaerung (Consent Form)
const Einverstaendniserklaerung: React.FC = () => { 

  // useState hook to manage date state, initializing it to current date
  const [date, setDate] = useState(() => {
    const today = new Date();  
    return today.toISOString().split('T')[0];  
  });

  return (
    <div className="proposal-list-container">
    
      {/* TU Darmstadt logo */}
      <img src={logo} alt="TU_DA Logo" className="top-right-image" />
      <h1 className="title">Einverständniserklärung</h1>
      
      {/* Main form container */}
      <form className="proposal-form">
        <PersonalInfos/>  {/* Section for personal information */}
        <Fields/>  {/* Section for additional fields */}
        <KennwortSemester/>  {/* Section for password and semester info */}
        
        <div className="form-container">
        
          {/* Date input section */}
          <div className="date-form-section">
            <label htmlFor="date">Darmstadt, den </label>
            <input
              type="date"  
              id="date"
              name="date"
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>

          {/* Signature section */}
          <div className="signature-container">
            <div className="signature-area"></div>  
            <label>Eigenhändige Unterschrift</label>  
          </div>

        </div>

        {/* Legal information section */}
        <div className="Hinweis">
          <label>Hinweis:</label>
          Rechtsgrundlage für die Erhebung der voran genannten personenbezogenen Daten ist § 16 der Wahlordnung der
          TU Darmstadt. Die Verarbeitung der Daten durch das Wahlamt sowie den Wahlvorstand erfolgt nach den Vorschriften der
          Datenschutz-Grundverordnung (DSGVO) und des Hessischen Datenschutz- und Informationsfreiheitsgesetzes (HDSIG).
          Gemäß § 18 Abs. 10 der Wahlordnung werden die Wahlvorschläge nur mit Name, Vorname und Fach- und Studienbereich
          bzw. Einrichtung der Bewerber:innen veröffentlicht. Eine Rücknahme der Erklärung ist gemäß § 16 Abs. 6 Satz 3 der
          Wahlordnung bis zur abschließenden Zulassungsprüfung durch schriftliche Erklärung gegenüber dem Wahlvorstand möglich.
        </div>
        
        {/* Submit button */}
        <button type="submit" className="submit-button">
          Abschicken 
        </button>
      
      </form>
    </div>
  );
};

export default Einverstaendniserklaerung;
