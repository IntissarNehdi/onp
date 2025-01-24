import React, { useState } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import './Forms.css' 
interface PasswordAndSemesterField {
  updateSemester: (field: 'Hochschulwahlen im' | 'Semesterjahr' | 'Kennwort der Liste' , value: string) => void;
}
const SemesterSelection: React.FC<PasswordAndSemesterField> = ({ updateSemester }) =>  {
  // State variables for storing the selected semester, semester year, and error messages
  const [, setPassword] = useState<string>(''); // Default semester is winter semester
  const [semester, setSemester] = useState<string>('winterSemester'); // Default semester is winter semester
  const [semesterYear, setSemesterYear] = useState<string>(''); // Default empty value for semester year
  const [semesterYearError, setSemesterYearError] = useState<string>(''); // Default empty error message

  // Function to handle change in semester selection
  const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSemester(value); 
    updateSemester("Hochschulwahlen im",value)
  };

  const handlePasswordChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setPassword(value);
    updateSemester("Kennwort der Liste", value);
  }
  // Function to handle changes in the semester year input field
  const handleSemesterYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; 
    updateSemester("Semesterjahr", value);
    let semesterYearPattern: RegExp; 

    // Set the regex pattern depending on the selected semester
    if (semester === "Wintersemester") {
        semesterYearPattern = /^\d{4}\/(\d{2}|\d{4})$/; 
    } else if (semester === "Sommersemester") {
        semesterYearPattern = /^\d{4}$/; 
    } else {
        semesterYearPattern = /^\s*$/; 
    }

    setSemesterYear(value); // Update the semester year state with the current value

    // Check if the entered semester year matches the expected pattern
    if (semesterYearPattern.test(value)) {
        if (semester === "Wintersemester") {
            const [startYear, endYear] = value.split("/").map(Number); 

            if (
                (String(endYear).length === 2 && endYear === startYear % 100 + 1) || 
                (String(endYear).length === 4 && endYear === startYear + 1) 
            ) {
                setSemesterYearError(""); 
            } else {
                setSemesterYearError("Ungültige Semesterjahre für das Wintersemester."); 
            }
        } else {
            setSemesterYearError(""); 
        }
    } else {
        // Set the error message if the semester year doesn't match the expected pattern
        setSemesterYearError(
            semester === "Wintersemester"
                ? 'Das Semesterjahr muss im Format "YYYY/YY" oder "YYYY/YYYY" für Wintersemester vorliegen.'
                : 'Das Semesterjahr muss im Format "YYYY" für Sommersemester vorliegen.'
        );
    }
};

  return (
    <div>
      {/* Radio buttons for selecting semester */}
      <FormControl className="semester-choice">
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={semester} 
          onChange={handleSemesterChange} 
        >
          <FormControlLabel value="Wintersemester" control={<Radio />} label="Wintersemester" />
          <FormControlLabel value="Sommersemester" control={<Radio />} label="Sommersemester" />
        </RadioGroup>
      </FormControl>

      {/* Input field for entering the semester year */}
      <section className="form-section-horizontal-alignment">
        <label htmlFor="semesterYear">Semesterjahr:</label>
        <input
          type="text"
          id="semesterYear"
          value={semesterYear} 
          onChange={handleSemesterYearChange} 
          placeholder={semester === "Wintersemester" ? "z. B. 2024/25" : "z. B. 2024"} 
          required 
        />
        {/* Displaying the error message if there is any validation error */}
        {semesterYearError && (
          <p className="error-message">{semesterYearError}</p>
        )}
      </section>
      {/* Section for entering the password of the list */}
      <section className="form-section">
        <label htmlFor="listPassword">Kennwort der Liste:</label>
        <input type="text" 
        id="listPassword" 
        placeholder="Kennwort eintragen" 
        onChange={handlePasswordChange}
        required/>
      </section>
    </div>
  );
};

// Exporting the component as the default export
export default SemesterSelection; 
