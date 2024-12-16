import React, { useState } from 'react';
import './Forms.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import logo from '../tuda_logo.jpg';

const WAHLFACHSCHAFT_OPTION=[
     { value: "Psychologie", label: "Wahlfachschaft Psychologie" },
     { value: "BEdMEd", label: "Wahlfachschaft B.Ed. und M.Ed." },
     { value: "18IST", label: "Wahlfachschaft 18-IST" },
     { value: "MedTec", label: "Wahlfachschaft MedTec" },
     { value: "LaG", label: "Wahlfachschaft LaG" },
     { value: "Sportwissenschaft", label: "Wahlfachschaft Sportwissenschaft" }]
 
   const STUDIENBEREICH_OPTIONS = [
     { value: "CE", label: "CE – Computational Engineering" },
     { value: "ESE", label: "ESE – Energy Science and Engineering" },
     { value: "Mechanik", label: "Mechanik" },
     { value: "Mechatronik", label: "Mechatronik" }
   ];
 
 const FACHSCHAFT_OPTIONS = [
     { value: "1", label: "1 – Rechts- und Wirtschaftswissenschaften" },
     { value: "2", label: "2 – Gesellschafts- und Geschichtswissenschaften" },
     { value: "3", label: "3 – Humanwissenschaften" },
     { value: "4", label: "4 – Mathematik" },
     { value: "5", label: "5 – Physik" },
     { value: "7", label: "7 – Chemie" },
     { value: "10", label: "10 – Biologie" },
     { value: "11", label: "11 – Material- und Geowissenschaften" },
     { value: "13", label: "13 – Bau- und Umweltingenieurwissenschaften" },
     { value: "15", label: "15 – Architektur" },
     { value: "16", label: "16 – Maschinenbau" },
     { value: "18", label: "18 – Elektrotechnik und Informationstechnik" },
     { value: "20", label: "20 – Informatik" }];
  const allOptions = [...WAHLFACHSCHAFT_OPTION, ...STUDIENBEREICH_OPTIONS, ...FACHSCHAFT_OPTIONS];
  const FB_SB_CANDIDATE =[
    { value: "CE", label: "CE" },
    { value: "ESE", label: "ESE" },
    { value: "Mechanik", label: "Mechanik" },
    { value: "Mechatronik", label: "Mechatronik" },
    { value: "1", label: "1" },
     { value: "2", label: "2" },
     { value: "3", label: "3" },
     { value: "4", label: "4" },
     { value: "5", label: "5" },
     { value: "7", label: "7" },
     { value: "10", label: "10" },
     { value: "11", label: "11" },
     { value: "13", label: "13" },
     { value: "15", label: "15" },
     { value: "16", label: "16" },
     { value: "18", label: "18" },
     { value: "20", label: "20" }
  ];

const ProposalList: React.FC = () => {
  const [selectedInput1, setSelectedInput1] = useState<string>('');
  const [selectedInput2, setSelectedInput2] = useState<string>('');
  // Zustand für die Anzahl der Kandidaten (nun als Zahl)
  const [numCandidates, setNumCandidates] = useState<number>(0); // Die Zahl der Kandidaten
  const [candidates, setCandidates] = useState<any[]>([]); // Array für die Kandidaten
  const [semesterYear, setSemesterYear] = useState<string>(''); // Semesterjahr
  const [semesterYearError, setSemesterYearError] = useState('');
  const [selectedFB, setSelectedFB] = useState("");  // State für die ausgewählte Fachbereichsnummer
  const [selectedFbSb, setSelectedFbSb] = useState<string>("");
  const[address,setAddress]=useState('');
  const [addressError, setAddressError] = useState('');


 // Event-Handler für die Auswahl im ersten Dropdown
 const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  setSelectedInput1(value); // Setze den Wert von selectedInput1

  // Wenn eine Auswahl im ersten Dropdown getroffen wird, resetten wir selectedInput2
  setSelectedInput2('');
};

// Event-Handler für das zweite Dropdown, wenn es angezeigt wird
const handleAdditionalSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  setSelectedInput2(value); // Setze den Wert von selectedInput2
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


  // Funktion, die beim Ändern des Dropdowns aufgerufen wird
const handleFBChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  setSelectedFB(event.target.value);
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


  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+ \d{1,6}, \d{4,10}$ [A-Za-zÄäÖöÜüß]+$/;

    setAddress(value);

    if (addressPattern.test(value)) {
      setAddressError(''); // Clear error if valid
    } else {
      setAddressError(
        'Die Anschrift muss im Format "Straßenname Hausnummer, PLZ Wohnort" vorliegen.'
      );
    }
  };
  
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Gibt das Datum im Format "YYYY-MM-DD" zurück
  });
  const [semester, setSemester] = useState<string>("winterSemester");

  // Handler für die Änderung des Semesterwerts
  const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSemester(event.target.value);
  };


  const handleFbSbChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFbSb(e.target.value);
  };

  const handleSemesterYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    // Check the selected semester and apply the appropriate pattern
    let semesterYearPattern: RegExp;
  
    if (semester === "winterSemester") {
      // For Wintersemester: Expecting "nn/nn" format
      semesterYearPattern = /^\d{2}\/\d{2}$/;
    } else if (semester === "sommerSemester") {
      // For Sommersemester: Expecting "nn" format
      semesterYearPattern = /^\d{2}$/;
    } else {
      semesterYearPattern = /^\s*$/; // Allow empty value if no semester is selected
    }
  
    setSemesterYear(value);
  
    if (semesterYearPattern.test(value)) {
      if (semester === "winterSemester") {
        // Additional validation for Wintersemester: Check if YY = XX + 1
        const [xx, yy] = value.split("/").map(Number);
  
        if (yy === xx + 1) {
          setSemesterYearError(""); // Clear error if both format and logic are correct
        } else {
          setSemesterYearError(
            'Ungültige Semesterjahr'
          );
        }
      } else {
        // Sommersemester or other cases: Clear error if valid
        setSemesterYearError("");
      }
    } else {
      // Set error for invalid format
      setSemesterYearError(
        semester === "winterSemester"
          ? 'Das Semesterjahr muss im Format "XX/YY" für Wintersemester vorliegen.'
          : 'Das Semesterjahr muss im Format "XX" für Sommersemester vorliegen.'
      );
    }
  };
  

  const [phoneNumber, setPhoneNumber] = useState(""); // Telefonnummer Zustand
  const [errorPhone, setPhoneError] = useState(""); // Fehlerstatus für Telefonnummer

  const handlePhoneNumberChange = (e: { target: { value: any; }; }) => {
    let input = e.target.value;

    // Entfernt unzulässige Zeichen (nur Zahlen, +, -, Leerzeichen und Klammern erlaubt)
    input = input.replace(/[^0-9+\-\s()]/g, "");

    // Aktualisiert den Zustand mit der bereinigten Eingabe
    setPhoneNumber(input);

    // Validierung während der Eingabe
    if (input.length < 7 || !/^\+?[0-9\s\-()]+$/.test(input)) {
      setPhoneError("Bitte geben Sie eine gültige Telefonnummer ein.");
    } else {
      setPhoneError("");
    }
  };
  const validatePhoneNumberOnBlur = () => {
    // Zusätzliche Validierung beim Verlassen des Feldes
    if (phoneNumber && phoneNumber.length < 7) {
      setPhoneError("Eine Telefonnummer muss mindestens 7 Zeichen lang sein.");
    }
  };
  return (
    <div className="proposal-list-container">
      <img
        src={logo}
        alt="TU_DA Logo"
        className="top-right-image"
      />
      <h1 className="title">Vorschlagsliste: </h1>
      <h1 className="title">Statusgruppe der Studierenden</h1>
      {/* Ergänzungswahlen im Formular */}
      <form className='nomination-semester'>
        <label>Hochschulwahlen im</label>
      </form>

      {/* Semesterwahl */}
      <FormControl className="semester-choice" required>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={semester} // Setzt den Default-Wert auf "sommerSemester"
        onChange={handleSemesterChange}
      >
        <FormControlLabel value="winterSemester" control={<Radio />} label="Wintersemester" />
        <FormControlLabel value="sommerSemester" control={<Radio />} label="Sommersemester" />
      </RadioGroup>
    </FormControl>

      {/* Eingabefeld für Jahr des Semesters, wenn Semester ausgewählt wurde */}
      {semester && (
      <section className="form-section horizontal-alignment">
        <label htmlFor="semesterYear">Semesterjahr:</label>
        <input
          required
          type="text"
          id="semesterYear"
          value={semesterYear}
          onChange={handleSemesterYearChange}
          placeholder={semester === "winterSemester" ? "z. B. 24/25" : "z. B. 24"}
        />
        {semesterYearError && (
          <p className="error-message">{semesterYearError}</p>
        )}
      </section>
      )}

  <form className="proposal-form">
  <section className="form-section">
      <div className="select-input-container">
        <label htmlFor="selectField">VORSCHLAGSLISTE für die Wahl zu</label>
        <select 
          id="selectField" 
          name="wahlOption" 
          required 
          onChange={handleSelectChange}
          value={selectedInput1}
        >
          <option value="" disabled>Bitte wählen</option>
          <option value="Fachbereichsrat">dem Fachbereichsrat</option>
          <option value="GemeinsameKommission">der Gemeinsamen Kommission</option>
          <option value="Fachschaftsrat">dem Fachschaftsrat</option>
          <option value="Studierendenparlament">dem Studierendenparlament</option>
          <option value="Universitätsversammlung">der Universitätsversammlung</option>
        </select>
      </div>

      {selectedInput1 === "Fachbereichsrat" || selectedInput1 === "Fachschaftsrat" || selectedInput1 === "GemeinsameKommission" ? (
        <div className="select-input-container">
          <label htmlFor="additionalDropdown">
            {selectedInput1 === "Fachbereichsrat"
              ? "des Fachbereichs:"
              : selectedInput1 === "GemeinsameKommission"
              ? "des Studienbereichs:"
              : selectedInput1 === "Fachschaftsrat"
              ? "des Fachbereichs/Studienbereichs:"
              : ""}
          </label>
          <select 
            id="additionalDropdown" 
            name="additionalOption" 
            required
            onChange={handleAdditionalSelectChange}
            value={selectedInput2}
          >
            <option value="" disabled>Bitte wählen</option>
            {selectedInput1 === "Fachbereichsrat" ? (
              FACHSCHAFT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))
            ) : selectedInput1 === "GemeinsameKommission" ? (
              STUDIENBEREICH_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))
            ) : selectedInput1 === "Fachschaftsrat" ? (
              [...FACHSCHAFT_OPTIONS, ...WAHLFACHSCHAFT_OPTION, ...STUDIENBEREICH_OPTIONS].map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))
            ) : null}
          </select>
        </div>
      ) : selectedInput1 === "Studierendenparlament" || selectedInput1 === "Universitätsversammlung" ? (
        <div className="input-container">
          <input 
            type="text" 
            id="listInput" 
            name="listInput" 
            placeholder="Liste eingeben" 
            required 
          />
        </div>
      ) : null}
    </section>


        <section className="form-section">
          <label htmlFor="listPassword">Kennwort der Liste:</label>
          <input type="text" id="listPassword" placeholder="Kennwort eintragen" required/>
        </section>


        <label htmlFor="trusteeName" style={{ textAlign: 'left' }}>Vertrauensperson:</label>
        <section className="form-section">
          <label htmlFor="trusteeName" style={{ textAlign: 'left' }}>Name, Vorname</label>
          <input type="text" id="trusteeName" placeholder="Name, Vorname" required />
          <label htmlFor="fbSb" style={{ textAlign: 'left' }}>FB Nr./SB</label>
          <select
            id="fbSb"
            value={selectedFbSb}
            onChange={handleFbSbChange} // Changed to handleFbSbChange
            required
            style={{ width: '100%' }}
          >
            <option value="" disabled>Bitte wählen</option>
            {allOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label htmlFor="address" style={{ textAlign: 'left' }}>Anschrift</label>
          <input
            required
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Straßenname Hausnummer, PLZ Wohnort"
          />
          {addressError && (
            <p className="error-message">{addressError}</p>
          )}
          <label htmlFor="email" style={{ textAlign: 'left' }}>E-mail Adresse</label>
          <input type="email" id="email" placeholder="E-Mail" required />
          <label htmlFor="tel" style={{ textAlign: 'left' }}>Telefonnummer</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            onBlur={validatePhoneNumberOnBlur}
            placeholder="Telefonnummer"
            required
          />
          {errorPhone && <p className="error-message">{errorPhone}</p>}
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
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Nachname"
                        value={candidates[index].lastName}
                        onChange={(e) => handleCandidateChange(index, 'lastName', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Vorname"
                        value={candidates[index].firstName}
                        onChange={(e) => handleCandidateChange(index, 'firstName', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Geburtsjahr"
                        value={candidates[index].birthYear}
                        onChange={(e) => handleCandidateChange(index, 'birthYear', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <select 
                          value={candidates[index].fbSb} 
                          onChange={handleFBChange} 
                          required
                          defaultValue={""}
                        >
                          <option value="" disabled>Bitte wählen</option> {/* Option für leeren Wert */}
                          {FB_SB_CANDIDATE.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </select>
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
          Einen weiteren Kandidierenden hinzufügen
        </button>

        
      {/* Datum und Unterschrift in einer Zeile */}
      {/* Datum und Unterschrift */}
      <section className="signature-section">
            <label htmlFor="date">Darmstadt, den </label>
                <input
                type="date"
                id="date"
                name="date"
                value={date} // Verwendet den Zustand für das aktuelle Datum
                onChange={(e) => setDate(e.target.value)} // Ermöglicht die Änderung des Datums
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
          <button type="submit" className="submit-button">
            Abschicken
          </button>
     
      </form>
    </div>
  );
};

export default ProposalList;
