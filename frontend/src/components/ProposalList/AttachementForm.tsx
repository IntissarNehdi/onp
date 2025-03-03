// Import React modules and resources
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Forms.css';



interface AttachementProps {
  updateAttachement: (field: "Kennwort" | "Hinweis" |"Erklärung gemäß § 16 Abs. 2 WahlO" | "Darmstadt, den" , value: string) => void;
}
// Main component definition for "Attachement"
const Attachement: React.FC<AttachementProps> = ({ updateAttachement }) => {
  const navigate = useNavigate(); // Initialize navigate for navigation
  const [selectedCheckbox, setSelectedCheckbox] = useState<'none' | 'genderBalance' | 'employmentStatus'>('none');
  const [date, setDate] = useState(() => {
  const today = new Date();
  const value = today.toISOString().split('T')[0];
  // Extract the day, month, and year
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
  const year = today.getFullYear();

  // Format the date as DD/MM/YYYY
  const formattedDate = `${day}/${month}/${year}`;

  // Update the date with the new format
  updateAttachement('Darmstadt, den', formattedDate);   
  return value; // ISO-formatted date as YYYY-MM-DD
  });
  // State to store the "Kennwort"
  const [kennwort, setKennwort] = useState('');
  const [explanation, setExplanation] = useState({
    genderBalance: "",
    employmentStatus: "",
  });
  useEffect(() => {
    if (selectedCheckbox !== 'none') {
      updateAttachement("Erklärung gemäß § 16 Abs. 2 WahlO", getSelectedPhrase(selectedCheckbox));
    }
  }, [selectedCheckbox, explanation]);
  // Handler to update the explanation based on textarea input
  const handleExplanationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setExplanation((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the correct key
    }));
  };
  
  
  // Handler to toggle checkbox selection
  const handleCheckboxChange = (checkbox: 'genderBalance' | 'employmentStatus') => {
    setSelectedCheckbox(selectedCheckbox === checkbox ? 'none' : checkbox);
    updateAttachement("Erklärung gemäß § 16 Abs. 2 WahlO", getSelectedPhrase(checkbox));
    };
  
  // Handler to update the date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate !== '') {
      setDate(newDate);
    } else {
      alert('Das Datum darf nicht leer sein!');
    }
    // Convert YYYY-MM-DD to DD-MM-YYYY
    const [year, month, day] = newDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    updateAttachement("Darmstadt, den", formattedDate);
  };

  const getSelectedPhrase = (input: string) => {
    // Switch case to return specific phrases based on the input type
    switch (input) {
      case 'genderBalance':
        // Return the gender balance statement
        return "Bei der Aufstellung des Wahlvorschlages wurden Frauen und Männer entsprechend ihrem jeweiligen Anteil in der Statusgruppe angemessen berücksichtigt.";
        
      case 'employmentStatus':
        // Retrieve explanation text if available; otherwise, return a default message
        { const explanationText = explanation[input] || "Keine Erklärung angegeben.";
        // Return the employment status statement with explanation
        return "Bei der Aufstellung des Wahlvorschlages wurden Frauen und Männer nicht entsprechend ihrem jeweiligen Anteil in der Statusgruppe angemessen berücksichtigt.\nBegründung: " + explanationText; }
        
      default:
        // Return an empty string if the input does not match any case
        return "";
    }
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Retrieve the input value
    const value = e.target.value;
    // Update the password state with the new value
    setKennwort(value);
    // Update the attachment with the new password value
    updateAttachement("Kennwort", value);
  };
  

  return (
    <div>
      {/* TU Darmstadt logo */}
      <img src="" alt="TU_DA Logo" className="top-right-image" />
      <h1 className="title">Anlage zur Vorschlagsliste</h1>

      {/* Form for user input */}
      <div className="proposal-form">
        {/* Input field for "Kennwort" */}
        <div className="form-section">
          <label>Kennwort:</label>
          <input
            type="text"
            name="kennwort"
            value={kennwort}
            onChange={handlePasswordChange}
            placeholder='Kennwort eintragen'
          />
        </div>

        <div className="form-section">
          <h3>
            Bei der Aufstellung von Wahlvorschlägen sollen Frauen und Männer entsprechend ihrem
            jeweiligen Anteil in der jeweiligen Statusgruppe angemessen berücksichtigt werden...
          </h3>
        </div>

        <div className="form-section">
          <h2>Erklärung gemäß § 16 Abs. 2 WahlO</h2>
          <div className="sentence">
            <label>
              <input
                type="checkbox"
                checked={selectedCheckbox === 'genderBalance'}
                onChange={() => handleCheckboxChange('genderBalance')}
              />
              Bei der Aufstellung des Wahlvorschlages wurden Frauen und Männer entsprechend ihrem
              jeweiligen Anteil in der Statusgruppe angemessen berücksichtigt.
            </label>
          </div>
          <div className="sentence">
            <label>
              <input
                type="checkbox"
                checked={selectedCheckbox === 'employmentStatus'}
                onChange={() => handleCheckboxChange('employmentStatus')}
              />
              Bei der Aufstellung des Wahlvorschlages wurden Frauen und Männer nicht entsprechend
              ihrem jeweiligen Anteil in der Statusgruppe angemessen berücksichtigt.
            </label>
            {selectedCheckbox === 'employmentStatus' && (
              <textarea
                name="employmentStatus"
                value={explanation.employmentStatus}
                onChange={handleExplanationChange}
                placeholder="Bitte geben Sie Ihre Begründung ein..."
                rows={4}
                cols={50}
              />
            )}
          </div>
        </div>

        <section className="signature-section">
          <label htmlFor="date">Darmstadt, den </label>
          <input
            type="date"
            id="date2"
            name="date"
            value={date} 
            onChange={handleDateChange} 
            required
          />
        </section>
        <section className="signature-section-attachement">
          <label htmlFor="signature">Unterschrift der Vertrauensperson: </label>
          <input type="text" id="signature" disabled />
        </section>
      </div>

      {/* Zurück button */}
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)} // Navigate back to the previous page
      >
        Zurück
      </button>
    </div>
  );
};

export default Attachement;
