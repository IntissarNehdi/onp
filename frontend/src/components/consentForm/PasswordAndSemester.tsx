// Import necessary modules from React and Material-UI components
import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import './ConsentForms.css';

interface PasswordAndSemesterField {
  updatePasswordAndSemester: (field: 'Kennwort'| 'für die Wahl im'  | 'zu', value: string) => void;
}
// Define the functional component 'KennwortSemester'
const PasswordAndSemester: React.FC<PasswordAndSemesterField> = ({ updatePasswordAndSemester }) => {
  
  // State variable to store the password entered by the user
  const [listPassword, setListPassword] = useState('');
  
  // State variable to store the selected semester type (Winter or Summer)
  const [semester, setSemester] = useState('');

  // State variable to store the semester year entered by the user
  const [semesterYear, setSemesterYear] = useState<string>('');
  
  // State variable to store error messages for the semester year input
  const [semesterYearError, setSemesterYearError] = useState('');

  // Event handler to update the semester state when the user selects a new semester type
  const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSemester(value); // Set the selected semester
    setSemesterYear(""); // Reset the semester year when semester changes
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setListPassword(value); // Set the selected semester
    updatePasswordAndSemester('Kennwort', value);
  };
  
  // Event handler to validate and update the semester year input
  const handleSemesterYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Define regular expressions for validating the semester year based on the selected semester
    let semesterYearPattern: RegExp;
    
    // If the selected semester is "winterSemester"
    if (semester === "Wintersemester") {
      semesterYearPattern = /^\d{4}\/(\d{2}|\d{4})$/; // Allow year formats like "2024/25" or "2024/2025"
    } else if (semester === "Sommersemester") {
      semesterYearPattern = /^\d{4}$/; // Allow only a 4-digit year for summer semester
    } else {
      semesterYearPattern = /^\s*$/; // No pattern for empty semester selection
    }
    
    setSemesterYear(value); // Update the semester year value
    
    // Validate the semester year input against the pattern
    if (semesterYearPattern.test(value)) {
      // Additional validation for winter semester (check if end year is valid)
      if (semester === "Wintersemester") {
        const [startYear, endYear] = value.split("/").map(Number);
        if (
          (String(endYear).length === 2 && endYear === startYear % 100 + 1) || 
          (String(endYear).length === 4 && endYear === startYear + 1) 
        ) {
          setSemesterYearError(""); // Clear error if valid
        } else {
          setSemesterYearError("Ungültige Semesterjahre für das Wintersemester."); // Show error for invalid year range
        }
      } else {
        setSemesterYearError(""); // Clear error for summer semester
      }
    } else {
      // Set an error message if the input doesn't match the expected format
      setSemesterYearError(
        semester === "Wintersemester"
          ? 'Das Semesterjahr muss im Format "YYYY/YY" oder "YYYY/YYYY" für Wintersemester vorliegen.'
          : 'Das Semesterjahr muss im Format "YYYY" für Sommersemester vorliegen.'
      );
    }
    updatePasswordAndSemester('für die Wahl im', semester+' '+ value);

  };
  
  // Static values for conditional input text
  const selectedInput1: string = "dem Fachbereichsrat"; 
  const selectedInput2: string = "CE-Computational Engineering"; 

  // State variables for dynamic text inputs
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const getLabel = (input: string) => {
    switch (input) {
      case "dem Fachbereichsrat":
        return "des Fachbereichs";
      case "der GemeinsameKommission":
        return "des Studienbereichs";
      case "dem Fachschaftsrat":
        return "des Fachbereichs/Studienbereichs";
      default:
        return "";
    }
  };
  // useEffect hook to update input fields based on the selected input
  useEffect(() => {
    setInput1(selectedInput1); // Set input1 to the predefined value
    
    // Conditional logic to set input2 based on input1's value
    if (
      selectedInput1 === "dem Fachbereichsrat" ||
      selectedInput1 === "der gemeinsamen Kommision" ||
      selectedInput1 === "der Fachschaftsrat"
    ) {
      setInput2(selectedInput2); // Set input2 if conditions match
    } else {
      setInput2(""); // Reset input2 if conditions don't match
    }
    updatePasswordAndSemester("zu",selectedInput1 +" "+ getLabel(selectedInput1) +": "+ selectedInput2);
  }, [selectedInput1, selectedInput2]); // Effect runs when selectedInput1 or selectedInput2 changes

  // JSX return statement to render the component UI
  return(
    <div className="container">
      {/* Label for the password input */}
      <label>bin mit meiner Benennung als Bewerber:in der Vorschlagsliste:</label>
      
      <div className="form-section">
        <div className="centered-container">
          {/* Label and input field for the password */}
          <label className="paragraph">Kennwort: (muss mit dem Kennwort auf der Vorschlagsliste übereinstimmen)</label>
          <input
            required
            type="text"
            value={listPassword} // Bind the value to the listPassword state
            onChange={handlePasswordChange} // Update state on change
            placeholder="Kennwort eintragen" // Placeholder text
          />
        </div>
      </div>
      
      {/* Radio buttons for selecting semester type (Winter or Summer) */}
      <div className="horizontal-alignment">
        <label>für die Wahl im: </label>
        <FormControl className="semester-choice" required>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={semester} // Bind the value to the semester state
            onChange={handleSemesterChange} // Update the state when the semester changes
          >
            <FormControlLabel value="Wintersemester" control={<Radio />} label="Wintersemester" />
            <FormControlLabel value="Sommersemester" control={<Radio />} label="Sommersemester" />
          </RadioGroup>
        </FormControl>
      </div>

      {/* Conditional input field for semester year based on the selected semester */}
      {semester && (
        <section className="form-section horizontal-alignment">
          <label htmlFor="semesterYear">Semesterjahr:</label>
          <input
            required
            type="text"
            id="semesterYear"
            value={semesterYear} // Bind the value to the semesterYear state
            onChange={handleSemesterYearChange} // Handle changes to the semester year input
            placeholder={semester === "Wintersemester" ? "z. B. 2024/25" : "z. B. 2024"} // Placeholder based on semester type
          />
          {/* Display error message if there is any error */}
          {semesterYearError && (
            <p className="error-message">{semesterYearError}</p>
          )}
        </section>
      )}

      {/* Conditional label display based on input2 */}
      <div className="horizontal-alignment">
        {input2 ? (
          <label>
            zu {input1} {getLabel(input1)} {input2} einverstanden.
          </label>
        ) : (
          <label>zu {input1} einverstanden.</label>
        )}
      </div>
    </div>
  );
};

export default PasswordAndSemester;
