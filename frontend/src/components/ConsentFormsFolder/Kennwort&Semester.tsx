import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import './ConsentForm.css';

const KennwortSemester: React.FC = () => {
      const [listPassword, setListPassword] = useState('');
      const [semester, setSemester] = useState("winterSemester"); 
      const [semesterYear, setSemesterYear] = useState<string>(''); 
      const [semesterYearError, setSemesterYearError] = useState('');

    const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSemester(event.target.value);
        setSemesterYear(""); // Zurücksetzen des Jahres, wenn das Semester geändert wird
    };
    
    const handleSemesterYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    
        // Check the selected semester and apply the appropriate pattern
        let semesterYearPattern: RegExp;
    
        if (semester === "winterSemester") {
          // For Wintersemester: Allow "YYYY/YY" or "YYYY/YYYY" format
          semesterYearPattern = /^\d{4}\/(\d{2}|\d{4})$/;
      } else if (semester === "sommerSemester") {
          // For Sommersemester: Expecting "YYYY" format
          semesterYearPattern = /^\d{4}$/;
      } else {
          semesterYearPattern = /^\s*$/; // Allow empty value if no semester is selected
      }
    
        setSemesterYear(value);
    
        if (semesterYearPattern.test(value)) {
            if (semester === "winterSemester") {
                // Additional validation for Wintersemester: Check logical correctness
                const [startYear, endYear] = value.split("/").map(Number);
    
                if (
                    (String(endYear).length === 2 && endYear === startYear % 100 + 1) || // Case "YYYY/YY"
                    (String(endYear).length === 4 && endYear === startYear + 1) // Case "YYYY/YYYY"
                ) {
                    setSemesterYearError(""); // Clear error if both format and logic are correct
                } else {
                    setSemesterYearError("Ungültige Semesterjahre für das Wintersemester.");
                }
            } else {
                // Sommersemester: Clear error if valid
                setSemesterYearError("");
            }
        } else {
            // Set error for invalid format
            setSemesterYearError(
                semester === "winterSemester"
                    ? 'Das Semesterjahr muss im Format "YYYY/YY" oder "YYYY/YYYY" für Wintersemester vorliegen.'
                    : 'Das Semesterjahr muss im Format "YYYY" für Sommersemester vorliegen.'
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

    return(
        <div className="container">
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
          placeholder={semester === "winterSemester" ? "z. B. 2024/25" : "z. B. 2024"}
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
    </div>
    );
};
export default KennwortSemester;
