import React, { useEffect, useState } from 'react';
import './ConsentForm.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import logo from '../tuda_logo.jpg';

// Die Props für selectedInput1 und selectedInput2 definieren
interface ConsentFormProps {
  selectedInput1: string;
  selectedInput2: string;
}

const ConsentForm: React.FC<ConsentFormProps> = ({ selectedInput1, selectedInput2 }) => {
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [email, setEmail] = useState('');
  const [matriculationNumber, setMatriculationNumber] = useState('');
  const [address, setAddress] = useState('');
  const [semesterAddress, setSemesterAddress] = useState('');
  const [studyArea, setStudyArea] = useState('');
  const [listPassword, setListPassword] = useState('');
  const [semester, setSemester] = useState('winterSemester'); // Default to "winterSemester"
  const [shortStudyArea, setShortStudyArea] = useState('');
  const [semesterYear, setSemesterYear] = useState<string>(''); // Semesterjahr
  
  // Zustand für das Datum
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Setzt das Datum auf das aktuelle Datum
  });

  // Handlers für das Formular
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier die Daten nach der Validierung weiterverarbeiten
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
      date,
    });
  };

  const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSemester(event.target.value);
    setSemesterYear(''); // Zurücksetzen des Jahres, wenn das Semester geändert wird
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSemesterYear(e.target.value);
  };

  // Lokale Zustände für das Anzeigen der ausgewählten Optionen
  const [, setInput1] = useState<string>('');
  const [, setInput2] = useState<string>('');

  useEffect(() => {
    setInput1(selectedInput1);

    if (
      selectedInput1 === 'dem Fachbereichsrat' ||
      selectedInput1 === 'der Gemeinsamen Kommission' ||
      selectedInput1 === 'dem Fachschaftsrat'
    ) {
      setInput2(selectedInput2);
    } else {
      setInput2(''); // Kein zweiter Wert, wenn die Bedingung nicht erfüllt ist
    }
  }, [selectedInput1, selectedInput2]);

  return (
    <div className="proposal-list-container">
      <img
        src={logo}
        alt="TU_DA Logo"
        className="top-right-image"
      />
      <h1 className="title">Einverständniserklärung</h1>
      <form className="proposal-form" onSubmit={handleSubmit}>
        <label>Ich,</label>
        <div className="form-row">
          <div className="form-section">
            <label>Zuname, Vorname:</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name eintragen"
            />
          </div>
          <div className="form-section">
            <label>Geburtsjahr:</label>
            <input
              required
              type="text"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              placeholder="Geburtsjahr eintragen"
            />
          </div>
        </div>
        <div className="form-row">
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
          <div className="form-section">
            <label>Matrikelnummer:</label>
            <input
              required
              type="text"
              value={matriculationNumber}
              onChange={(e) => setMatriculationNumber(e.target.value)}
              placeholder="Matrikelnummer eintragen"
            />
          </div>
        </div>
        <div className="form-section">
          <label>Anschrift:</label>
          <input
            required
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Anschrift (PLZ, Wohnort, Straße, Haus-Nr.) eintragen"
          />
        </div>
        <div className="form-section">
          <label>Semesteranschrift:</label>
          <input
            required
            type="text"
            value={semesterAddress}
            onChange={(e) => setSemesterAddress(e.target.value)}
            placeholder="Semesteranschrift (PLZ, Wohnort, Straße, Haus-Nr.) eintragen"
          />
        </div>
        <div className="form-section">
          <label>Studienbereichsbezeichnung:</label>
          <input
            required
            type="text"
            value={studyArea}
            onChange={(e) => setStudyArea(e.target.value)}
            placeholder="Studienbereichsbezeichnung eintragen"
          />
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
              type="text"
              id="semesterYear"
              value={semesterYear}
              onChange={handleYearChange}
              placeholder={semester === 'winterSemester' ? '24/25' : '25'}
              required
            />
          </section>
        )}

        <div className="horizontal-alignment">
          {/* Bedingte Anzeige der Labels */}
          {selectedInput2 ? (
            <label>
              zu {selectedInput1}{' '}
              {selectedInput1 === 'dem Fachbereichsrat' || selectedInput1 === 'dem Fachschaftsrat'
                ? 'des Fachbereichs'
                : 'des Studienbereichs'}{' '}
              {selectedInput2} einverstanden.
            </label>
          ) : (
            <label>zu {selectedInput1} einverstanden.</label>
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

export default ConsentForm;
