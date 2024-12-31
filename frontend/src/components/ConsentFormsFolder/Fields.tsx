import React, { useState } from 'react';
import './ConsentForm.css';

// Define a functional component 'Fields' using React.FC (TypeScript-specific type for functional components)
const Fields: React.FC = () => {
  // Define an array of options for Wahlfachschaft (elective faculty options)
  const WAHLFACHSCHAFT_OPTION = [
    { value: "Psychologie", label: "Wahlfachschaft Psychologie" },
    { value: "BEdMEd", label: "Wahlfachschaft B.Ed. und M.Ed." },
    { value: "18IST", label: "Wahlfachschaft 18-IST" },
    { value: "MedTec", label: "Wahlfachschaft MedTec" },
    { value: "LaG", label: "Wahlfachschaft LaG" },
    { value: "Sportwissenschaft", label: "Wahlfachschaft Sportwissenschaft" }
  ];

  // Define an array of options for Studienbereich (study program options)
  const STUDIENBEREICH_OPTIONS = [
    { value: "CE", label: "CE – Computational Engineering" },
    { value: "ESE", label: "ESE – Energy Science and Engineering" },
    { value: "Mechanik", label: "Mechanik" },
    { value: "Mechatronik", label: "Mechatronik" }
  ];

  // Define an array of options for Fachschaft (faculty council options)
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
    { value: "20", label: "20 – Informatik" }
  ];

  // Combine all the options into one array
  const allOptions = [...WAHLFACHSCHAFT_OPTION, ...STUDIENBEREICH_OPTIONS, ...FACHSCHAFT_OPTIONS];

  // Declare a state variable to hold the selected value of the dropdown
  const [selectedFbSb, setSelectedFbSb] = useState<string>("");

  // Function to handle changes in the dropdown selection
  const handleFbSbChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Update the state with the selected value
    setSelectedFbSb(e.target.value);
  };

  // Return JSX to render the form with a dropdown for selecting an option
  return(
    <div className="form-section">
      {/* Label for the dropdown */}
      <label>Studienbereichsbezeichnung:</label>
      {/* Label for the dropdown, with an alignment style */}
      <label htmlFor="fbSb" style={{ textAlign: 'left' }}>FB Nr./SB</label>
      {/* The dropdown (select element) */}
      <select
        id="fbSb"  
        value={selectedFbSb}  
        onChange={handleFbSbChange}  
        required  
        style={{ width: '100%' }}  
      >
        {/* Default option when no selection is made */}
        <option value="" disabled>Bitte wählen</option>
        {/* Map through all options and display them as <option> elements */}
        {allOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}  {/* Display the label for each option */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Fields;
