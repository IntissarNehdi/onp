import React, { useState } from 'react';
import './Forms.css'; // Importiere die CSS-Datei
import logo from '../tuda_logo.jpg';

const Attachement = () => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Gibt das Datum im Format "YYYY-MM-DD" zurück
  });

  // Zustand für die Begründung
  const [explanation, setExplanation] = useState({
    genderBalance: '',
    employmentStatus: ''
  });

  // Zustände für die Checkboxen (nur eine darf gleichzeitig aktiviert sein)
  const [selectedCheckbox, setSelectedCheckbox] = useState<'none' | 'genderBalance' | 'employmentStatus'>('none');

  // Zustand für das Kennwort
  const [kennwort, setKennwort] = useState('');

  // Handler für das Eingabefeld der Begründung
  const handleExplanationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExplanation({
      ...explanation,
      [event.target.name]: event.target.value
    });
  };

  // Handler für das Wechseln der Checkboxen
  const handleCheckboxChange = (checkbox: 'genderBalance' | 'employmentStatus') => {
    // Wenn die angeklickte Checkbox bereits ausgewählt ist, wird sie abgewählt
    setSelectedCheckbox(selectedCheckbox === checkbox ? 'none' : checkbox);
  };

  // Form-Submit Handler
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Verhindert die Standardformularübermittlung

    // Überprüfe, ob das Kennwort ausgefüllt ist
    if (!kennwort) {
      alert('Bitte geben Sie das Kennwort ein!');
      return;
    }

    // Überprüfe, ob mindestens eine der Checkboxen ausgewählt wurde
    if (selectedCheckbox === 'none') {
      alert('Bitte wählen Sie eine der Checkboxen aus!');
      return;
    }

    // Überprüfe, ob das Datum nicht leer ist
    if (!date) {
      alert('Bitte wählen Sie ein Datum aus!');
      return;
    }

    // Füge hier die Logik zum Absenden des Formulars hinzu
    console.log('Formular abgesendet', { kennwort, explanation, date });
  };

  // Handler für das Datum (verhindert leeren Wert)
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    // Verhindert das Löschen des Datums
    if (newDate !== '') {
      setDate(newDate);
    } else {
      alert('Das Datum darf nicht leer sein!');
    }
  };

  return (
    <div className="proposal-list-container">
      {/* logo der TU oben rechts */}
      <img src={logo} alt="TU_DA Logo" className="top-right-image" />
      <h1 className="title">Anlage zur Vorschlagsliste</h1>

      <form onSubmit={handleSubmit} className="proposal-form">
        {/* Kennwort */}
        <div className="form-section">
          <label>Kennwort:</label>
          <input
            type="text"
            name="kennwort"
            value={kennwort}
            onChange={(e) => setKennwort(e.target.value)}
            
          />
        </div>

        {/* Direkt nach dem Kennwort: Der erklärende Text */}
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

        {/* Gender Balance Erklärung */}
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
          {/* Zweite Checkbox für Begründung */}
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
            
            {/* Zeige das Textfeld nur, wenn die zweite Checkbox aktiviert ist */}
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

        {/* Datum und Unterschrift */}
        <section className="signature-section">
          <label htmlFor="date">Darmstadt, den </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date} // Verwendet den Zustand für das aktuelle Datum
            onChange={handleDateChange} // Ermöglicht die Änderung des Datums
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

        {/* Absenden Button */}
        <button type="submit" className="submit-button">
          Abschicken
        </button>
      </form>
    </div>
  );
};

export default Attachement;
