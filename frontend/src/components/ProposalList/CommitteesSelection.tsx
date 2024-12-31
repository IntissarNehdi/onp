import React, { useState } from 'react'; // Import React and the useState hook from React
import './Forms.css' // Import the associated CSS file for styling

// Main component to handle the selection of committees and related fields
const CommitteesSelection: React.FC = () => {
  // State to store the selected value from the first dropdown
  const [selectedInput1, setSelectedInput1] = useState<string>('');
  // State to store the selected value from the second dropdown (which depends on the first selection)
  const [selectedInput2, setSelectedInput2] = useState<string>('');

  // Predefined options for the Wahlfachschaft (elective subject committees)
  const WAHLFACHSCHAFT_OPTION = [
    { value: "Psychologie", label: "Wahlfachschaft Psychologie" },
    { value: "BEdMEd", label: "Wahlfachschaft B.Ed. und M.Ed." },
    { value: "18IST", label: "Wahlfachschaft 18-IST" },
    { value: "MedTec", label: "Wahlfachschaft MedTec" },
    { value: "LaG", label: "Wahlfachschaft LaG" },
    { value: "Sportwissenschaft", label: "Wahlfachschaft Sportwissenschaft" }
  ];

  // Predefined options for the Studienbereich (study areas)
  const STUDIENBEREICH_OPTIONS = [
    { value: "CE", label: "CE – Computational Engineering" },
    { value: "ESE", label: "ESE – Energy Science and Engineering" },
    { value: "Mechanik", label: "Mechanik" },
    { value: "Mechatronik", label: "Mechatronik" }
  ];

  // Predefined options for the Fachschaft (department) committees
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

  // Function to handle changes in the first select dropdown (e.g., Fachbereichsrat, Gemeinsame Kommission)
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedInput1(value); // Set the selected value for the first dropdown

    setSelectedInput2(''); // Reset the second dropdown value whenever the first changes
  };

  // Function to handle changes in the second select dropdown (depends on the first dropdown selection)
  const handleAdditionalSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInput2(e.target.value); // Set the selected value for the second dropdown
  };

  return (
    <section className="form-section">
      {/* Section for entering the password of the list */}
      <section className="form-section">
        <label htmlFor="listPassword">Kennwort der Liste:</label>
        <input type="text" id="listPassword" placeholder="Kennwort eintragen" required/>
      </section>

      {/* Container for the first dropdown selection (which committee to vote for) */}
      <div className="select-input-container">
        <label htmlFor="selectField">VORSCHLAGSLISTE für die Wahl zu</label>
        <select 
          id="selectField" 
          name="wahlOption" 
          required 
          onChange={handleSelectChange} // Handle change event for the first select dropdown
          value={selectedInput1} // Value is controlled based on state
        >
          <option value="" disabled>Bitte wählen</option>
          <option value="Fachbereichsrat">dem Fachbereichsrat</option>
          <option value="GemeinsameKommission">der Gemeinsamen Kommission</option>
          <option value="Fachschaftsrat">dem Fachschaftsrat</option>
          <option value="Studierendenparlament">dem Studierendenparlament</option>
          <option value="Universitätsversammlung">der Universitätsversammlung</option>
        </select>
      </div>

      {/* Conditionally render the second dropdown depending on the first dropdown selection */}
      {(selectedInput1 === "Fachbereichsrat" || selectedInput1 === "Fachschaftsrat" || selectedInput1 === "GemeinsameKommission") && (
        <div className="select-input-container">
          {/* Dynamic label for the second dropdown, changes based on the first dropdown value */}
          <label htmlFor="additionalDropdown">
            {selectedInput1 === "Fachbereichsrat"
              ? "des Fachbereichs:"
              : selectedInput1 === "GemeinsameKommission"
              ? "des Studienbereichs:"
              : selectedInput1 === "Fachschaftsrat"
              ? "des Fachbereichs/Studienbereichs:"
              : ""}
          </label>
          
          {/* Second dropdown, options depend on the first dropdown's value */}
          <select 
            id="additionalDropdown" 
            name="additionalOption" 
            required
            onChange={handleAdditionalSelectChange} // Handle change event for the second dropdown
            value={selectedInput2} // Value is controlled based on state
          >
            <option value="" disabled>Bitte wählen</option>
            
            {/* Render options dynamically based on the first dropdown value */}
            {selectedInput1 === "Fachbereichsrat" ? (
              FACHSCHAFT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))
            ) : selectedInput1 === "GemeinsameKommission" ? (
              STUDIENBEREICH_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))
            ) : selectedInput1 === "Fachschaftsrat" ? (
              // If "Fachschaftsrat" is selected, show a combination of all three option sets
              [...FACHSCHAFT_OPTIONS, ...WAHLFACHSCHAFT_OPTION, ...STUDIENBEREICH_OPTIONS].map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))
            ) : null}
          </select>
        </div>
      )}
    </section>
  );
};

export default CommitteesSelection; // Export the CommitteesSelection component
