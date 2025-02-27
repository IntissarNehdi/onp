import React, { useState } from 'react';  // Importing React and useState hook
import './ConsentForms.css';  // Importing custom styles
import PersonalInfo from './PersonalInfo';  // Importing component for personal information section
import Field from './Field';  // Importing component for form fields section
import PasswordAndSemester from './PasswordAndSemester';  // Importing component for password and semester section
import logo from '../../assets/tuda_logo.jpg';  // Importing logo image
import { generatePDF } from '../PdfFunctions/ConsentFormPDF'; // Importing function to generate PDF
import DateAndSig from '../ProposalList/DateAndSig'; // Importing component for date and signature section

// Defining an interface for form data structure
export interface ConsentFormInterface {
  "Zuname": string;
  "Vorname": string;
  "Geburtsjahr": number;
  "E-Mail": string;
  "Anschrift": string;
  "Semesteranschrift": string;
  "Matrikelnummer": number;
  "Studienbereichsbezeichnung:FB Nr./SB": string;
  "Kennwort": string;
  "für die Wahl im": string;
  "Semesterjahr": string;
  "zu": string;
  "Hinweis": string;
  "Darmstadt, den": string;
}

// Functional component for the Consent Form
const ConsentForms: React.FC = () => { 
  // State to manage form data
  const [formData, setFormData] = useState<ConsentFormInterface>({
    "Zuname": "",
    "Vorname": "",
    "Geburtsjahr": 0,
    "E-Mail": "",
    "Anschrift": "",
    "Semesteranschrift": "",
    "Matrikelnummer": 0,
    "Studienbereichsbezeichnung:FB Nr./SB": "",
    "Kennwort": "",
    "für die Wahl im": "",
    "Semesterjahr": "",
    "zu": "",
    "Hinweis": "Rechtsgrundlage für die Erhebung der voran genannten personenbezogenen Daten ist § 16 der Wahlordnung der TU Darmstadt. Die Verarbeitung der Daten durch das Wahlamt sowie den Wahlvorstand erfolgt nach den Vorschriften der Datenschutz-Grundverordnung (DSGVO) und des Hessischen Datenschutz- und Informationsfreiheitsgesetzes (HDSIG). Gemäß § 18 Abs. 10 der Wahlordnung werden die Wahlvorschläge nur mit Name, Vorname und Fach- und Studienbereich bzw. Einrichtung der Bewerber:innen veröffentlicht. Eine Rücknahme der Erklärung ist gemäß § 16 Abs. 6 Satz 3 der Wahlordnung bis zur abschließenden Zulassungsprüfung durch schriftliche Erklärung gegenüber dem Wahlvorstand möglich.",
    "Darmstadt, den": ""
  });

  // State to manage validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Function to update form data
  const updateData = (field: keyof ConsentFormInterface, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Function to update error messages
  const updateErrors = (field: string, error: string) => {
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [field]: error
    }));
  };
  
  // Function to handle form submission and generate PDF
  const handleSaveAsPDF = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Required fields that must be filled out
    const requiredFields: (keyof ConsentFormInterface)[] = [
      "Zuname", "Vorname", "Geburtsjahr", "E-Mail", "Semesteranschrift", "Anschrift", "Matrikelnummer",
      "Studienbereichsbezeichnung:FB Nr./SB", "Kennwort", "Semesterjahr",
    ];
    
    // Filtering out fields with errors
    const currentErrors = Object.entries(errors).filter(([, message]) => message.trim() !== "");
    const falseFields = currentErrors.map(([field]) => field);

    // Finding empty required fields
    const emptyFields = requiredFields.filter(field => !formData[field]);
    if (emptyFields.length > 0 || currentErrors.length > 0) {
      const missingFieldsMessage = emptyFields.length > 0 ? `Fehlende Felder: ${emptyFields.join(", ")}` : "";
      const invalidFieldsMessage = falseFields.length > 0 ? `Fehlerhafte Felder: ${falseFields.join(", ")}` : "";
      const combinedMessage = [missingFieldsMessage, invalidFieldsMessage].filter(msg => msg).join("\n");
      
      alert(`Bitte füllen Sie alle erforderlichen Felder korrekt aus:\n${combinedMessage}`);
      return;
    }
    
    // Generate PDF if all fields are valid
    generatePDF(formData);
  };

  return (
    <form className="proposal-list-container" id="consent-form-content">
      
      {/* TU Darmstadt logo */}
      <img src={logo} alt="TU_DA Logo" className="top-right-image" />
      <h1 className="title">Einverständniserklärung</h1>
      
      {/* Main form container */}
      <form className="proposal-form">
        <PersonalInfo updatePersonalInfo={updateData} updateErrors={updateErrors} /> {/* Personal information section */}
        <Field updateFbSbField={updateData}/>  {/* Additional fields section */}
        <PasswordAndSemester updatePasswordAndSemester={updateData} updateErrors={updateErrors}/>  {/* Password and semester section */}
        <DateAndSig updateDate={updateData}/>  {/* Date and signature section */}
        
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
          Abschicken  {/* Button to submit the form and generate PDF */}
        </button>
      </form>
    </form>
  );
};

// Exporting the component for use in other parts of the application
export default ConsentForms;