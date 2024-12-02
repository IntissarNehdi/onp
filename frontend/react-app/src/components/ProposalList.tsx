import React, { useState } from 'react';
import './Forms.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


const ProposalList: React.FC = () => {
  // Zustand für die Anzahl der Kandidaten (nun als Zahl)
  const [numCandidates, setNumCandidates] = useState<number>(0); // Die Zahl der Kandidaten
  const [candidates, setCandidates] = useState<any[]>([]); // Array für die Kandidaten
  const [semester, setSemester] = useState<string>(''); // Winter oder Sommersemester
  const [semesterYear, setSemesterYear] = useState<string>(''); // Semesterjahr

  // Funktion zum Hinzufügen von Kandidaten basierend auf der Anzahl
  const handleAddCandidates = () => {
    if (numCandidates < 1 || isNaN(numCandidates)) {
      alert("Bitte geben Sie eine gültige Zahl für die Anzahl der Kandidaten ein.");
      return;
    }

    // Wenn die Anzahl geändert wird, passen wir die Felder entsprechend an
    const newCandidates = Array.from({ length: numCandidates }, (_, index) => ({
      lastName: "",
      firstName: "",
      birthYear: "",
      fbSbDesignation: "",
    }));
    setCandidates(newCandidates); // Kandidatenfelder erstellen
  };

  // Funktion zum Hinzufügen eines zusätzlichen Kandidaten
  const handleAddSingleCandidate = () => {
    setNumCandidates(numCandidates + 1);
    setCandidates([...candidates, {
      lastName: "",
      firstName: "",
      birthYear: "",
      fbSbDesignation: ""
    }]);
  };

  // Funktion zum Entfernen eines Kandidaten
  const handleRemoveCandidate = (index: number) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(updatedCandidates);
    setNumCandidates(updatedCandidates.length); // Anzahl an Kandidaten anpassen
  };

  // Funktion zum Aktualisieren eines Kandidaten
  const handleCandidateChange = (index: number, field: string, value: string) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = { ...updatedCandidates[index], [field]: value };
    setCandidates(updatedCandidates);
  };

  // Funktion zum Aktualisieren der Anzahl der Kandidaten und Anpassung der Felder
  const handleNumCandidatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseInt(value, 10);
    if (/^\d*$/.test(value)) { // Validiert, dass nur Zahlen eingegeben werden
      setNumCandidates(isNaN(numberValue) ? 0 : numberValue);
      
      // Anpassen der Kandidatenfelder, falls die Anzahl geändert wird
      if (numberValue < candidates.length) {
        setCandidates(candidates.slice(0, numberValue)); // Entfernt überschüssige Kandidatenfelder
      } else {
        // Fügt neue Kandidatenfelder hinzu
        const newCandidates = Array.from({ length: numberValue - candidates.length }, (_, index) => ({
          lastName: "",
          firstName: "",
          birthYear: "",
          fbSbDesignation: ""
        }));
        setCandidates([...candidates, ...newCandidates]);
      }
    }
  };

  const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSemester(event.target.value);
    setSemesterYear(""); // Zurücksetzen des Jahres, wenn das Semester geändert wird
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSemesterYear(e.target.value);
  };
  

  return (
    <div className="proposal-list-container">
      <h1 className="title">VORSCHLAGSLISTE für die Wahl zur UNIVERSITÄTSVERSAMMLUNG </h1>
      
      {/* Ergänzungswahlen im Formular */}
      
      <form className='nomination-semester'>
        <label>Ergänzungswahlen im</label>
      </form>

      {/* Semesterwahl */}
      <FormControl className="semester-choice">
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={semester}
          onChange={handleSemesterChange}
        >
          <FormControlLabel value="winterSemester" control={<Radio />} label="Wintersemester" />
          <FormControlLabel value="sommerSemester" control={<Radio />} label="Sommersemester" />
        </RadioGroup>
      </FormControl>

      {/* Eingabefeld für Jahr des Semesters, wenn Semester ausgewählt wurde */}
      {semester && (
        <section className="form-section">
          <label htmlFor="semesterYear">Semesterjahr:</label>
          <input
            type="text"
            id="semesterYear"
            value={semesterYear}
            onChange={handleYearChange}
            placeholder={semester === 'winterSemester' ? "24/25" : "25"}
          />
        </section>
      )}

      <form className="proposal-form">
        <section className="form-section">
          <label htmlFor="department">Statusgruppe:</label>
          <input type="text" id="department" placeholder="Fachbereich eintragen" />
        </section>

        

        <section className="form-section">
          <label htmlFor="listPassword">Kennwort der Liste:</label>
          <input type="text" id="listPassword" placeholder="Kennwort eintragen" />
        </section>


        <label htmlFor="trusteeName" style={{ textAlign: 'left' }}>Vertrauensperson:</label>
        <section className="form-section">
          <label htmlFor="trusteeName" style={{ textAlign: 'left' }}>Name, Vorname</label>
          <input type="text" id="trusteeName" placeholder="Name, Vorname" />
          <label htmlFor="fbSb" style={{ textAlign: 'left' }}>FB Nr./SB</label>
          <input type="text" id="fbSb" placeholder="FB Nr./SB" />
          <label htmlFor="address" style={{ textAlign: 'left' }}>Anschrift</label>
          <input type="text" id="address" placeholder="Anschrift" />
          <label htmlFor="email" style={{ textAlign: 'left' }}>E-mail Adresse</label>
          <input type="email" id="email" placeholder="E-Mail" />
          <label htmlFor="tel" style={{ textAlign: 'left' }}>Telefonnummer</label>
          <input type="tel" id="phone" placeholder="Telefonnummer" />
        </section>

        <section className="form-section">
          <label htmlFor="numCandidates">Anzahl der Kandidierenden:</label>
          <input
            type="text"
            id="numCandidates"
            value={numCandidates === 0 ? "" : numCandidates.toString()} // Verhindert null
            onChange={handleNumCandidatesChange}
            placeholder="Anzahl der Kandidierenden"
          />
          <button type="button" className="add-candidates-button" onClick={handleAddCandidates}>
            Kandidaten hinzufügen
          </button>
        </section>

        {/* Anzeige der Kandidatenfelder in einer Tabelle */}
        {numCandidates > 0 && candidates.length > 0 && (
          <section className="form-section">
            <label>Als Bewerber/Bewerberinnen werden vorgeschlagen:</label>
            <table className="candidates-table">
              <thead>
                <tr>
                  <th>Ifd.Nr.</th>
                  <th>Nachname</th>
                  <th>Vorname</th>
                  <th>Geburtsjahr</th>
                  <th>FB Nr./SB Bezeichnung</th>
                  
                </tr>
              </thead>
              <tbody>
                {candidates.map((_, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={index + 1} // Automatische Nummerierung
                        disabled // Verhindert Bearbeitung
                        className="ifd-input" // Optional: CSS-Klasse für Styling
                      />
                    </td>
                   
                    <td>
                      <input
                        type="text"
                        placeholder="Nachname"
                        value={candidates[index].lastName}
                        onChange={(e) => handleCandidateChange(index, 'lastName', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Vorname"
                        value={candidates[index].firstName}
                        onChange={(e) => handleCandidateChange(index, 'firstName', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Geburtsjahr"
                        value={candidates[index].birthYear}
                        onChange={(e) => handleCandidateChange(index, 'birthYear', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="FB Nr./SB Bezeichnung"
                        value={candidates[index].fbSbDesignation}
                        onChange={(e) => handleCandidateChange(index, 'fbSbDesignation', e.target.value)}
                      />
                    </td>
                    <td>

                    </td>
                    <td>
                      <button type="button" onClick={() => handleRemoveCandidate(index)} className="remove-candidate-button">
                        Entfernen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Möglichkeit, einen weiteren Kandidaten hinzuzufügen */}
        <button type="button" className="add-another-candidate" onClick={handleAddSingleCandidate}>
          Einen weiteren Kandidaten hinzufügen
        </button>

        <section className="form-section">
          <label htmlFor="notes">Wichtige Anmerkungen:</label>
          <textarea id="notes" placeholder="Anmerkungen einfügen"></textarea>
        </section>

        <button type="submit" className="submit-button">Abschicken</button>
      </form>
    </div>
  );
};

export default ProposalList;
