import React, { useEffect, useState } from 'react';
import './ConsentForm.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import logo from './tuda_logo.jpg';



const Einverstaendniserklaerung: React.FC = () => {
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthYearError, setBirthYearError] = useState('');
  const [email, setEmail] = useState('');
  const [matriculationNumber, setMatriculationNumber] = useState('');
  const [matriculationError, setMatriculationError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [semesterAddress, setSemesterAddress] = useState('');
  const [semesterAddressError, setSemesterAddressError] = useState('');
  const [studyArea, setStudyArea] = useState('');
  const [listPassword, setListPassword] = useState('');
  const [semester, setSemester] = useState("winterSemester"); 
  const [shortStudyArea, setShortStudyArea] = useState('');
  const [semesterYear, setSemesterYear] = useState<string>(''); 
  const [semesterYearError, setSemesterYearError] = useState('');
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
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matriculationError) {
      alert('Please fix the errors before submitting.');
      return;
    }
    // Validation and data handling here
    console.log({
      name,
      birthYear,
      email,
      matriculationNumber,
      address,
      semesterAddress,
      studyArea,
      listPassword,
      semester,
      shortStudyArea,
    
    });
  };
  const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSemester(event.target.value);
    setSemesterYear(""); // Zurücksetzen des Jahres, wenn das Semester geändert wird
  };
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSemesterYear(e.target.value);
  };
  const handleMatriculationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Check if input contains only numbers
      setMatriculationNumber(value);
      if (value.length === 7) {
        setMatriculationError(''); // Valid input
      } else {
        setMatriculationError('Die Matrikelnummer muss genau 7 Ziffern enthalten.');
      }
    } else {
      setMatriculationError('Die Matrikelnummer darf nur Ziffern enthalten.');
    }
  };

  const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    if (/^\d*$/.test(value)) { // Allow only numeric input
      setBirthYear(value);
  
      if (value.length === 4) {
        setBirthYearError(''); // Valid input
      } else if (value.length > 4) {
        setBirthYearError('Das Geburtsjahr darf nicht mehr als 4 Ziffern enthalten.');
      } else {
        setBirthYearError('Das Geburtsjahr muss genau 4 Ziffern enthalten.');
      }
    } else {
      setBirthYearError('Das Geburtsjahr darf nur Ziffern enthalten.');
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+ \d{1,6}, \d{4,10} [A-Za-zÄäÖöÜüß\s]+$/;
  
    setAddress(value);
  
    if (addressPattern.test(value)) {
      setAddressError(''); 
    } else {
      setAddressError(
        'Die Anschrift muss im Format "Straßenname Hausnummer, PLZ Wohnort" vorliegen.'
      );
    }
  };

  const handleSemesterAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+ \d{1,6}, \d{4,10} [A-Za-zÄäÖöÜüß\s]+$/;
  
    setSemesterAddress(value);
  
    if (addressPattern.test(value)) {
      setSemesterAddressError(''); // Clear error if valid
    } else {
      setSemesterAddressError(
        'Die Semesteranschrift muss im Format "Straßenname Hausnummer, PLZ Wohnort" vorliegen.'
      );
    }
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
      setSemesterYearError(''); // Clear error if valid
    } else {
      setSemesterYearError(
        semester === "winterSemester"
          ? 'Das Semesterjahr muss im Format "XX/XX" für Wintersemester vorliegen.'
          : 'Das Semesterjahr muss im Format "XX" für Sommersemester vorliegen.'
      );
    }
  };
  
  
   // Beispielwerte für die Selektionen
   const selectedInput1:string = "der Universitätssammelung"; // Dies kann aus einem anderen Formular kommen
   const selectedInput2: string= "CE-Computational Engineering"; // Dies kann aus einem anderen Formular kommen
 
   // Lokale States für die Anzeige
   const [input1, setInput1] = useState<string>("");
   const [input2, setInput2] = useState<string>("");
 
   // Effekt: Werte verarbeiten und lokale Zustände setzen
   useEffect(() => {
     setInput1(selectedInput1);
 
     if (
       selectedInput1 === "dem Fachbereichsrat" ||
       selectedInput1 === "der gemeinsamen Kommision" ||
       selectedInput1 === "der Fachschaftsrat"
     ) {
       setInput2(selectedInput2);
     } else {
       setInput2(""); // Kein zweiter Wert, wenn die Bedingung nicht erfüllt ist
     }
   }, [selectedInput1, selectedInput2]);

 

  const [date, setDate] = useState(() => {
          const today = new Date();
          return today.toISOString().split('T')[0]; // Gibt das Datum im Format "YYYY-MM-DD" zurück
  });
  const [selectedFbSb, setSelectedFbSb] = useState<string>("");

  const handleFbSbChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFbSb(e.target.value);
  };
  

  return (
    <div className="proposal-list-container">
      {/* logo der TU oben rechts */}
      <img src={logo} alt="TU_DA Logo" className="top-right-image" />
      <h1 className="title">Einverständniserklärung</h1>
      <form className="proposal-form" onSubmit={handleSubmit}>
      <label>Ich,</label>
        <div className="form-row">
          <div className="form-section">
                <label>Zuname:</label>
                <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name eintragen"
                />
          </div>

          <div className="form-section">
                <label>Vorname:</label>
                <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Vorname eintragen" 
                />
          </div>
        </div>

        <div className="form-row">
          <div className="form-section">
            <label>Geburtsjahr:</label>
            <input
              required
              type="text"
              value={birthYear}
              onChange={handleBirthYearChange}
              placeholder="Geburtsjahr eintragen"
            />
            {/* Error message display */}
            {birthYearError && (
              <p className="error-message">{birthYearError}</p>
            )}
          </div>

          <div className="form-section">
            <label>E-Mail:</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail eintragen"
            />
          </div>
        </div>

        <div className="form-row">
        <div className="form-section">
          <label>Anschrift:</label>
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
        </div>

        <div className="form-section">
          <label>Semesteranschrift:</label>
          <input
            required
            type="text"
            value={semesterAddress}
            onChange={handleSemesterAddressChange}
            placeholder="Straßenname Hausnummer, PLZ Wohnort"
          />
          {semesterAddressError && (
            <p className="error-message">{semesterAddressError}</p>
          )}
        </div>
      </div>
      <div className="form-section">
          <label>Matrikelnummer:</label>
          <input
            required
            type="text"
            value={matriculationNumber}
            onChange={handleMatriculationChange}
            placeholder="Matrikelnummer eintragen"
          />
          {/* Display error message */}
          {matriculationError && (
            <p className="error-message">{matriculationError}</p>
          )}
      </div>
        
        <div className="form-section">
          <label>Studienbereichsbezeichnung:</label>
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
        </div>
        <label>bin mit meiner Benennung als Bewerber:in der Vorschlagsliste:</label>
        <div className="form-section">
          
          <div className="centered-container">
          <label className="paragraph">Kennwort: (muss mit dem Kennwort auf der Vorschlagsliste übereinstimmen)</label>

                    <input
                        required
                        type="text"
                        value={listPassword}
                        onChange={(e) => setListPassword(e.target.value)}
                        placeholder="Kennwort eintragen"
                    />
            </div>
        </div>
        <div className="horizontal-alignment">
            <label>für die Wahl im: </label>
            <FormControl className="semester-choice" required>
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
            </div>

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

      <div className="horizontal-alignment">
        {/* Bedingte Anzeige der Labels */}
        {input2 ? (
          <label>
            zu {input1} Studienbereich: {input2} einverstanden.
          </label>
        ) : (
          <label>zu {input1} einverstanden.</label>
        )}
      </div>
      
        <div className="form-container">
        <div className="date-form-section">
            <label htmlFor="date">Darmstadt, den </label>
                <input
                type="date"
                id="date"
                name="date"
                value={date} // Verwendet den Zustand für das aktuelle Datum
                onChange={(e) => setDate(e.target.value)} // Ermöglicht die Änderung des Datums
                required
            />
            </div>


          <div className="signature-container">
            <div className="signature-area"></div>
              <label>Eigenhändige Unterschrift</label>
            </div>

        </div>

        <div className="Hinweis">
        <label>Hinweis:</label>
        Rechtsgrundlage für die Erhebung der voran genannten personenbezogenen Daten ist § 16 der Wahlordnung der
        TU Darmstadt. Die Verarbeitung der Daten durch das Wahlamt sowie den Wahlvorstand erfolgt nach den Vorschriften der
        Datenschutz-Grundverordnung (DSGVO) und des Hessischen Datenschutz- und Informationsfreiheitsgesetzes (HDSIG).
        Gemäß § 18 Abs. 10 der Wahlordnung werden die Wahlvorschläge nur mit Name, Vorname und Fach- und Studienbereich
        bzw. Einrichtung der Bewerber:innen veröffentlicht. Eine Rücknahme der Erklärung ist gemäß § 16 Abs. 6 Satz 3 der
        Wahlordnung bis zur abschließenden Zulassungsprüfung durch schriftliche Erklärung gegenüber dem Wahlvorstand möglich.
        </div>
        
        <button type="submit" className="submit-button">
          Abschicken
        </button>
      
      </form>
    </div>
  );
};

export default Einverstaendniserklaerung;
