import React, { useState } from 'react'; // Import React and the useState hook from React
import './Forms.css' // Import the associated CSS file for styling

// Array holding the available FB/SB candidates for selection
const FB_SB_CANDIDATE = [
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

interface CandidatesTableProps {
  onUpdateCandidates: (candidates: any[]) => void; // Prop to notify the parent component
}
// Main component to display and manage the candidates table
const CandidatesTable: React.FC<CandidatesTableProps> = ({ onUpdateCandidates }) => {
  // State to manage the list of candidates (each candidate is an object with specific fields)
  const [candidates, setCandidates] = useState<any[]>([]);

  const handleCandidateChange = (index: number, field: string, value: string) => {
    // Create a copy of the candidates list to modify
    const newCandidates = [...candidates];
    newCandidates[index][field] = value; // Update the specific field for the candidate
  
    // Validate the birth year to ensure it's in YYYY format (4 digits)
    if (field === 'birthYear') {
      const isValid = /^\d{4}$/.test(value);
      const newValidBirthYears = [...validBirthYears];
      newValidBirthYears[index] = isValid; // Update the validity state for this candidate
      setValidBirthYears(newValidBirthYears); // Update validity state
    }
  
    setCandidates(newCandidates); // Update candidates state
  
    // Notify the parent component about the updated candidates list
    if (onUpdateCandidates) {
      onUpdateCandidates(newCandidates);
    }
  };
  
  // State to manage the number of candidates to be added
  const [numCandidates, setNumCandidates] = useState<number>(0);

  // Function to handle the addition of a new candidate row
  const handleAddSingleCandidate = () => {
    // Adds a new candidate object with empty fields to the candidates list
    setCandidates([...candidates, { lastName: '', firstName: '', birthYear: '', fbSb: '' }]);
    // Increments the number of candidates
    setNumCandidates(numCandidates + 1);
  };

  // Function to handle the removal of a candidate at a specific index
  const handleRemoveCandidate = (index: number) => {
    // Filters out the candidate at the specified index
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    // Updates the candidates state with the remaining candidates
    setCandidates(updatedCandidates);
    // Updates the number of candidates state after removal
    setNumCandidates(updatedCandidates.length);
  };

  // Function to handle changes to the number of candidates
  const handleNumCandidatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseInt(value, 10);
    
    // Ensures that the input value is a number (or empty)
    if (/^\d*$/.test(value)) {
      setNumCandidates(isNaN(numberValue) ? 0 : numberValue);

      // If the number of candidates is reduced, slice the array
      if (numberValue < candidates.length) {
        setCandidates(candidates.slice(0, numberValue));
      } else {
        // Otherwise, add empty candidate objects to match the new number
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const newCandidates = Array.from({ length: numberValue - candidates.length }, (_) => ({
          lastName: '',
          firstName: '',
          birthYear: '',
          fbSb: ''
        }));
        setCandidates([...candidates, ...newCandidates]);
      }
    }
  };

  // State to track the validity of birth year input for each candidate
  const [validBirthYears, setValidBirthYears] = useState<boolean[]>([]);

  // State to track which input field is focused (for styling/validation feedback)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);


  // Function to set the focused index when an input field is focused
  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  // Function to reset the focused index when the input field loses focus
  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <div>
      {/* Section for entering the number of candidates */}
      <section className="form-section">
        <label htmlFor="numCandidates">Anzahl der Kandidierenden:</label>
        <input
          required
          type="text"
          id="numCandidates"
          value={numCandidates === 0 ? '' : numCandidates.toString()} // Display number or empty if 0
          onChange={handleNumCandidatesChange} // Handle change in number of candidates
          placeholder="Anzahl der Kandidierenden"
        />
      </section>

      {/* Render table if there are candidates to display */}
      {numCandidates > 0 && candidates.length > 0 && (
        <section className="form-section">
          <label>Als Bewerber/Bewerberinnen werden vorgeschlagen:</label>
          <table className="candidates-table">
            <thead>
              <tr>
                <th>Ifd.Nr.</th>
                <th>Nachname</th>
                <th>Vorname</th>
                <th>Geburtsjahr(YYYY)</th>
                <th>FB Nr./SB Bezeichnung</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through the candidates and create rows for each */}
              {candidates.map((_, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={index + 1} // Display the candidate number
                      disabled
                      className="ifd-input" 
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
                    {/* Birth year input with validation feedback */}
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        placeholder="Geburtsjahr"
                        value={candidates[index].birthYear}
                        onChange={(e) => handleCandidateChange(index, 'birthYear', e.target.value)}
                        onFocus={() => handleFocus(index)} // Set focus when the input is clicked
                        onBlur={handleBlur} // Reset focus when the input loses focus
                        required
                      />
                      {focusedIndex === index && (
                        <span
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: validBirthYears[index] ? 'green' : 'red',
                            fontSize: '18px',
                          }}
                        >
                          {/* Show check or cross icon depending on the validity of the birth year */}
                          {validBirthYears[index] ? (
                            <div style={{ color: 'green', fontWeight: 'bold' }}>✔</div> 
                          ) : (
                            <div style={{ color: 'red', fontWeight: 'bold' }}>✘</div> 
                          )}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    {/* Dropdown to select FB/SB */}
                    <select
                      value={candidates[index].fbSb}
                      onChange={(e) => handleCandidateChange(index, 'fbSb', e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Bitte wählen
                      </option>
                      {FB_SB_CANDIDATE.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleRemoveCandidate(index)} // Remove candidate on button click
                      className="remove-candidate-button"
                    >
                      Entfernen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Button to add another candidate */}
      <button type="button" className="add-another-candidate" onClick={handleAddSingleCandidate}>
        Einen weiteren Kandidierenden hinzufügen
      </button>
    </div>
  );
};

export default CandidatesTable; // Export the component
