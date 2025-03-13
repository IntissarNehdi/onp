// Import necessary modules from React and Material-UI components
import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import './ConsentForms.css';

// Define interface for component props
interface PasswordAndSemesterField {
  updatePasswordAndSemester: (field: 'Kennwort'| 'für die Wahl im'  |'Semesterjahr'| 'zu', value: string) => void;
  updateErrors: (field: string, error: string) => void;
}

// Define the functional component 'PasswordAndSemester'
const PasswordAndSemester: React.FC<PasswordAndSemesterField> = ({ updatePasswordAndSemester, updateErrors }) => {
  
  
  // State variable to store the selected semester type (Winter or Summer)
  const [semester, setSemester] = useState('Sommersemester');

  // State variable to store the semester year entered by the user
  const [semesterYear, setSemesterYear] = useState<string>('');
  
  // State variable to store error messages for the semester year input
  const [semesterYearError, setSemesterYearError] = useState('');
  const [password, setPassword] = useState('');


  // Event handler to update the semester state when the user selects a new semester type
  const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSemester(value); // Set the selected semester
    setSemesterYear(""); // Reset the semester year when semester changes
    setSemesterYearError("");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value); // Set the selected semester
  }

 
  
  // Event handler to validate and update the semester year input
  const handleSemesterYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    let errorMessage = "";
    
    let semesterYearPattern: RegExp;
    
    // Set regex pattern based on selected semester type
    if (semester === "Wintersemester") {
      semesterYearPattern = /^\d{4}\/(\d{2}|\d{4})$/;
    } else if (semester === "Sommersemester") {
      semesterYearPattern = /^\d{4}$/;
    } else {
      semesterYearPattern = /^\s*$/;
    }
  
    setSemesterYear(value);
  
    // Validate input based on semester type
    if (value === "") {
      errorMessage = "";  // Clear the error if the semester year is empty
    } else if (semesterYearPattern.test(value)) {
      if (semester === "Wintersemester") {
        const [startYear, endYear] = value.split("/").map(Number);
        if (
          (String(endYear).length === 2 && endYear === startYear % 100 + 1) ||
          (String(endYear).length === 4 && endYear === startYear + 1)
        ) {
          errorMessage = "";  // No error for valid Wintersemester
        } else {
          errorMessage = "Ungültige Semesterjahre für das Wintersemester.";
        }
      }
    } else {
      errorMessage =
        semester === "Wintersemester"
          ? 'Das Semesterjahr muss im Format "YYYY/YY" oder "YYYY/YYYY" für Wintersemester vorliegen.'
          : 'Das Semesterjahr muss im Format "YYYY" für Sommersemester vorliegen.';
    }
  
    setSemesterYearError(errorMessage);
    updatePasswordAndSemester("für die Wahl im", semester);
    updatePasswordAndSemester("Semesterjahr", value);
    updateErrors("Semesterjahr", errorMessage);
  };

  // State variable to store selected committee from URL parameters
  const [selectedCommittee, setSelectedCommittee] = useState<string>("");

  useEffect(() => {
      // Extract committee from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const committee = urlParams.get("committee");
      const password = urlParams.get("password");
  
      setSelectedCommittee(committee || ""); // If empty, remain empty
      setPassword(password||""); // If empty, remain empty
  }, []); // Runs only once on component mount
  
  useEffect(() => {
      if (selectedCommittee) {
          // Update committee selection in parent state when it changes
          updatePasswordAndSemester("zu", selectedCommittee);
      }
  }, [selectedCommittee]); // Runs when selectedCommittee change
  
  useEffect(() => {
    if(password){
      // Update password in parent state when it changes
      updatePasswordAndSemester("Kennwort",password);
    }
  }, [password]); // Runs when password change

  // JSX return statement to render the component UI
  return(
    <div className="container">
      {/* Label for the password input */}
      <label>bin mit meiner Benennung als Bewerber:in der Vorschlagsliste:</label>
      
      <div className="form-section">
        <div className="centered-container">
          {/* Input field for password */}
          <label className="paragraph">Kennwort: (muss mit dem Kennwort auf der Vorschlagsliste übereinstimmen)</label>
          <input
            required
            type="text"
            value={password}
            onChange={handlePasswordChange}
            disabled
          />
        </div>
      </div>
      
      {/* Radio buttons for semester selection */}
      <div className="horizontal-alignment">
        <label>für die Wahl im: </label>
        <FormControl className="semester-choice" required>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            value={semester}
            onChange={handleSemesterChange}
          >
            <FormControlLabel value="Wintersemester" control={<Radio />} label="Wintersemester" />
            <FormControlLabel value="Sommersemester" control={<Radio />} label="Sommersemester" />
          </RadioGroup>
        </FormControl>
      </div>

      {/* Input field for semester year with validation */}
      {semester && (
        <section className="form-section horizontal-alignment">
          <label htmlFor="semesterYear">Semesterjahr:</label>
          <input
            required
            type="text"
            id="semesterYear"
            value={semesterYear}
            onChange={handleSemesterYearChange}
            placeholder={semester === "Wintersemester" ? "z. B. 2024/25" : "z. B. 2024"}
          />
          {semesterYearError && <p className="error-message">{semesterYearError}</p>}
        </section>
      )}

      <div className="horizontal-alignment">
        <label>zu {selectedCommittee} einverstanden.</label>
      </div>
    </div>
  );
};

export default PasswordAndSemester;