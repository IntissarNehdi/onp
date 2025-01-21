// Import React modules and resources
import React, { useState } from 'react';
import './Forms.css'; 

// Main component definition for "Attachement"
const Attachement = () => {
  // State to manage the selected checkbox (either "genderBalance", "employmentStatus", or "none")
  const [selectedCheckbox, setSelectedCheckbox] = useState<'none' | 'genderBalance' | 'employmentStatus'>('none');

  // State to store the date, initialized to today's date
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // ISO-formatted date as YYYY-MM-DD
  });
 
  // State to store the explanation for the selected checkbox
  const [explanation, setExplanation] = useState({
    genderBalance: '',
    employmentStatus: ''
  });
  
  // State to store the "Kennwort"
  const [kennwort, setKennwort] = useState('');
  
  // Handler to update the explanation based on textarea input
  const handleExplanationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExplanation({
      ...explanation,
      [event.target.name]: event.target.value
    });
  };
  
  // Handler to toggle checkbox selection
  const handleCheckboxChange = (checkbox: 'genderBalance' | 'employmentStatus') => {
    setSelectedCheckbox(selectedCheckbox === checkbox ? 'none' : checkbox);
  };
  
  // Handler to validate and process the form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form behavior

    // Validation before submission
    if (!kennwort) {
      alert('Bitte geben Sie das Kennwort ein!');
      return;
    }
    if (selectedCheckbox === 'none') {
      alert('Bitte wählen Sie eine der Checkboxen aus!');
      return;
    }
    if (!date) {
      alert('Bitte wählen Sie ein Datum aus!');
      return;
    }

    // Log form values to the console
    console.log('Formular abgesendet', { kennwort, explanation, date });
  };

  // Handler to update the date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate !== '') {
      setDate(newDate);
    } else {
      alert('Das Datum darf nicht leer sein!');
    }
  };

  // Render the user interface
  return (
    <div className="proposal-list-container">
      {/* TU Darmstadt logo */}
      <img src="" alt="TU_DA Logo" className="top-right-image" />
      <h1 className="title">Anlage zur Vorschlagsliste</h1>

      {/* Form for user input */}
      <form onSubmit={handleSubmit} className="proposal-form">
        {/* Input field for "Kennwort" */}
        <div className="form-section">
          <label>Kennwort:</label>
          <input
            type="text"
            name="kennwort"
            value={kennwort}
            onChange={(e) => setKennwort(e.target.value)}
          />
        </div>

        {/* Description of requirements as per § 16 Abs. 2 WahlO */}
        <div className="form-section">
          <h3>
            Bei der Aufstellung von Wahlvorschlägen sollen Frauen und Männer entsprechend ihrem
            jeweiligen Anteil in der jeweiligen Statusgruppe angemessen berücksichtigt werden. Für die Gruppe
            der wissenschaftlichen Mitglieder sollen zusätzlich unbefristet und befristet Beschäftigte
            entsprechend ihrem Anteil in der Gruppe angemessen berücksichtigt werden. Eine entsprechende
            Erklärung, dass diese Anforderungen erfüllt sind oder eine Begründung für die Abweichung ist
            schriftlich dem Wahlvorschlag beizufügen (§ 16 Abs. 2 WahlO). Die Erklärung wird bei Zulassung des
            Wahlvorschlages mit der Bekanntmachung der Zulassung veröffentlicht (§ 18 Abs. 10 WahlO).
          </h3>
        </div>

        {/* Checkbox selection and optional text area for justification */}
        <div className="form-section">
          <h2>Erklärung gemäß § 16 Abs. 2 WahlO </h2>
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
                name="genderBalance"
                value={explanation.genderBalance}
                onChange={handleExplanationChange}
                placeholder="Bitte geben Sie Ihre Begründung ein..."
                rows={4}
                cols={50}
              />
            )}
          </div>
        </div>

        {/* Date and signature fields */}
        <section className="signature-section">
          <label htmlFor="date">Darmstadt, den </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date} 
            onChange={handleDateChange} 
            required
          />
        </section>
        <section className="signature-section">
          <label htmlFor="signature">Unterschrift der Vertrauensperson: </label>
          <input
            type="text"
            id="signature"
            disabled
          />
        </section>

        {/* Submit button */}
        <button type="submit" className="submit-button">
          Abschicken
        </button>
      </form>
    </div>
  );
};

export default Attachement;
