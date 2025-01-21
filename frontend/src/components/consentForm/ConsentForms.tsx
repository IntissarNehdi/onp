import React, { useState } from 'react';  // Importing React and useState hook
import './ConsentForms.css';  // Importing custom styles
import PersonalInfo from './PersonalInfo';  // Importing component for personal information section
import Field from './Field';  // Importing component for form fields section
import PasswordAndSemester from './PasswordAndSemester';  // Importing component for password and semester section

import logo from '../../assets/tuda_logo.jpg';  // Importing logo image

// Functional component for the Einverstaendniserklaerung (Consent Form)

const ConsentForms: React.FC = () => { 


  // useState hook to manage date state, initializing it to current date
  const [date, setDate] = useState(() => {
    const today = new Date();  // Getting today's date
    return today.toISOString().split('T')[0];  // Formatting date to 'YYYY-MM-DD'
  });

  return (
    <div className="proposal-list-container">
    
      {/* TU Darmstadt logo */}
      <img src={logo} alt="TU_DA Logo" className="top-right-image" />
      <h1 className="title">Einverständniserklärung</h1>
      
      {/* Main form container */}
      <form className="proposal-form">
        <PersonalInfo/>  {/* Section for personal information */}
        <Field/>  {/* Section for additional fields */}
        <PasswordAndSemester/>  {/* Section for password and semester info */}
        
        <div className="form-container">
        
          {/* Date input section */}
          <div className="date-form-section">
            <label htmlFor="date">Darmstadt, den </label>
            <input
              type="date"  // Date picker input
              id="date"
              name="date"
              value={date}  // Controlled input value set by the state
              onChange={(e) => setDate(e.target.value)}  // Updates the state when date changes
              required  // Makes the input required
            />
          </div>

          {/* Signature section */}
          <div className="signature-container">
            <div className="signature-area"></div>  {/* Placeholder for signature */}
            <label>Eigenhändige Unterschrift</label>  {/* Label for signature */}
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
          Abschicken  {/* Button text */}
        </button>
      
      </form>
    </div>
  );
};

// Exporting the component to be used in other parts of the app
export default ConsentForms;