// Import React modules and resources
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Forms.css';

// Main component definition for "Attachement"
const Attachement = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation
  const [selectedCheckbox, setSelectedCheckbox] = useState<'none' | 'genderBalance' | 'employmentStatus'>('none');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [explanation, setExplanation] = useState({
    genderBalance: '',
    employmentStatus: '',
  });
  const [kennwort, setKennwort] = useState('');

  const handleExplanationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExplanation({
      ...explanation,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (checkbox: 'genderBalance' | 'employmentStatus') => {
    setSelectedCheckbox(selectedCheckbox === checkbox ? 'none' : checkbox);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
    console.log('Formular abgesendet', { kennwort, explanation, date });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate !== '') {
      setDate(newDate);
    } else {
      alert('Das Datum darf nicht leer sein!');
    }
  };

  return (
    <div className="proposal-list-container">
      {/* TU Darmstadt logo */}
      <img src="" alt="TU_DA Logo" className="top-right-image" />
      <h1 className="title">Anlage zur Vorschlagsliste</h1>

      <form onSubmit={handleSubmit} className="proposal-form">
        <div className="form-section">
          <label>Kennwort:</label>
          <input
            type="text"
            name="kennwort"
            value={kennwort}
            onChange={(e) => setKennwort(e.target.value)}
          />
        </div>

        <div className="form-section">
          <h3>
            Bei der Aufstellung von Wahlvorschlägen sollen Frauen und Männer entsprechend ihrem
            jeweiligen Anteil in der jeweiligen Statusgruppe angemessen berücksichtigt werden...
          </h3>
        </div>

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

        <section className="signature-section">
          <label htmlFor="date">Darmstadt, den </label>
          <input type="date" id="date" name="date" value={date} onChange={handleDateChange} required />
        </section>
        <section className="signature-section">
          <label htmlFor="signature">Unterschrift der Vertrauensperson: </label>
          <input type="text" id="signature" disabled />
        </section>

        {/* Submit button */}
        <button type="submit" className="submit-button">
          Abschicken
        </button>
      </form>

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
