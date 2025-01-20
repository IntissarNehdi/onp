import React, { useState } from 'react';  // Importing React and useState hook
import './ConsentForms.css';  // Importing custom styles
import PersonalInfo from './PersonalInfo';  // Importing component for personal information section
import Field from './Field';  // Importing component for form fields section
import PasswordAndSemester from './PasswordAndSemester';  // Importing component for password and semester section
/*port { saveAsPdf } from '../PdfFunction/Utility';*/
import logo from '../../assets/tuda_logo.jpg';  // Importing logo image
import { generatePDF } from '../PdfFunction/Utility';
import DateAndSig from '../ProposalList/DateAndSig';

export interface ConsentFormInterface {
  "Zuname": string;
  "Vorname": string;
  "Geburtsjahr": number;
  "E-Mail": string;
  "Anschrift": string;
  "Semesteranschrift":string;
  "Matrikelnummer": number;
  "Studienbereichsbezeichnung:FB Nr./SB": string;
  "Kennwort":string;
  "für die Wahl im": string;
  "Semesterjahr":number;
  "Darmstadt, den":string;
  "Hinweis": string;
}
// Functional component for the Einverstaendniserklaerung (Consent Form)
const ConsentForms: React.FC = () => { 
  const [formData, setFormData] = useState<ConsentFormInterface>({
    "Zuname": "",
    "Vorname": "",
    "Geburtsjahr": 0,
    "E-Mail": "",
    "Anschrift": "",
    "Semesteranschrift":"",
    "Matrikelnummer": 0,
    "Studienbereichsbezeichnung:FB Nr./SB": "",
    "Kennwort": "",
    "für die Wahl im": "",
    "Semesterjahr":0,
    "Darmstadt, den": "",
    "Hinweis": "Rechtsgrundlage für die Erhebung der voran genannten personenbezogenen Daten ist § 16 der Wahlordnung der TU Darmstadt. Die Verarbeitung der Daten durch das Wahlamt sowie den Wahlvorstand erfolgt nach den Vorschriften der Datenschutz-Grundverordnung (DSGVO) und des Hessischen Datenschutz- und Informationsfreiheitsgesetzes (HDSIG). Gemäß § 18 Abs. 10 der Wahlordnung werden die Wahlvorschläge nur mit Name, Vorname und Fach- und Studienbereich bzw. Einrichtung der Bewerber:innen veröffentlicht. Eine Rücknahme der Erklärung ist gemäß § 16 Abs. 6 Satz 3 der Wahlordnung bis zur abschließenden Zulassungsprüfung durch schriftliche Erklärung gegenüber dem Wahlvorstand möglich."
  });

  // Function to update the form data when PersonalInfo component changes the input fields
  const updatePersonalInfo = (field: keyof ConsentFormInterface, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const updateFbSbField = (field: keyof ConsentFormInterface, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const updatePasswordAndSemester = (field: keyof ConsentFormInterface, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const updateDate = (field: keyof ConsentFormInterface, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleSaveAsPDF = (e: React.FormEvent) => {
    e.preventDefault();
    const obj = formData;
    generatePDF(obj);
  };
  return (
    <form className="proposal-list-container" id="consent-form-content">
    
      {/* TU Darmstadt logo */}
      <img src={logo} alt="TU_DA Logo" className="top-right-image" />
      <h1 className="title">Einverständniserklärung</h1>
      
      {/* Main form container */}
      <form className="proposal-form">
        <PersonalInfo updatePersonalInfo={updatePersonalInfo} /> {/* Section for personal information */}
        <Field updateFbSbField={updateFbSbField}/>  {/* Section for additional fields */}
        <PasswordAndSemester updatePasswordAndSemester={updatePasswordAndSemester}/>  {/* Section for password and semester info */}
        <DateAndSig updateDate={updateDate}/>
        
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
        <button type="submit" className="submit-button" onClick={handleSaveAsPDF}>
          Abschicken  {/* Button text */}
        </button>
      
      </form>
    </form>
  );
};

// Exporting the component to be used in other parts of the app
export default ConsentForms;