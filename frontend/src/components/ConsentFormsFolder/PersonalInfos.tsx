// Importing necessary modules from React and the CSS file
import React, { useState } from 'react';
import './ConsentForm.css';

// Define the functional component 'PersonalInfos'
const PersonalInfos: React.FC = () => {
  
  // State variables to manage user inputs for personal information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthYearError, setBirthYearError] = useState('');
  const [email, setEmail] = useState('');
  const [matriculationNumber, setMatriculationNumber] = useState('');
  const [matriculationError, setMatriculationError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [semesterAddress, setSemesterAddress] = useState('');
  const [semesterAddressError, setSemesterAddressError] = useState('');

  // Event handler for updating and validating the matriculation number
  const handleMatriculationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Check if the input consists only of digits
    if (/^\d*$/.test(value)) {
      setMatriculationNumber(value); // Update matriculation number state
      
      // Check if the length of matriculation number is exactly 7 digits
      if (value.length === 7) {
        setMatriculationError(''); // Clear error if valid
      } else {
        setMatriculationError('Die Matrikelnummer muss genau 7 Ziffern enthalten.'); // Error for invalid length
      }
    } else {
      setMatriculationError('Die Matrikelnummer darf nur Ziffern enthalten.'); // Error if input contains non-digit characters
    }
  };

  // Event handler for updating and validating the birth year input
  const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Check if the input consists only of digits
    if (/^\d*$/.test(value)) {
      setBirthYear(value); // Update birth year state

      // Validate the length of the birth year input
      if (value.length === 4) {
        setBirthYearError(''); // Clear error if valid
      } else if (value.length > 4) {
        setBirthYearError('Das Geburtsjahr darf nicht mehr als 4 Ziffern enthalten.'); // Error for more than 4 digits
      } else {
        setBirthYearError('Das Geburtsjahr muss genau 4 Ziffern enthalten.'); // Error for less than 4 digits
      }
    } else {
      setBirthYearError('Das Geburtsjahr darf nur Ziffern enthalten.'); // Error for non-digit input
    }
  };

  // Event handler for updating and validating the address input
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Regular expression to validate address format
    const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+ \d{1,6}, \d{4,10} [A-Za-zÄäÖöÜüß]+(?:, [A-Za-zÄäÖöÜüß0-9\s]+)?$/;
    
    setAddress(value); // Update address state
    
    // Validate the address input against the pattern
    if (addressPattern.test(value)) {
      setAddressError(''); // Clear error if valid
    } else {
      setAddressError(
        'Die Anschrift muss im Format "Straßenname Hausnummer, PLZ Wohnort, Zusatz(optional)" vorliegen.'
      ); // Error for invalid format
    }
  };

  // Event handler for updating and validating the semester address input
  const handleSemesterAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Regular expression to validate semester address format
    const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+ \d{1,6}, \d{4,10} [A-Za-zÄäÖöÜüß\s]+$/;
    
    setSemesterAddress(value); // Update semester address state
    
    // Validate the semester address input against the pattern
    if (addressPattern.test(value)) {
      setSemesterAddressError(''); // Clear error if valid
    } else {
      setSemesterAddressError(
        'Die Semesteranschrift muss im Format "Straßenname Hausnummer, PLZ Wohnort" vorliegen.'
      ); // Error for invalid format
    }
  };

  // JSX for rendering the form and handling user inputs
  return (
    <div className="PersonalInfosContainer">
      
      {/* Label for personal info */}
      <label>Ich,</label>
      
      <div className="form-row">
        {/* Section for last name input */}
        <div className="form-section">
          <label>Zuname:</label>
          <input
            required
            type="text"
            value={lastName} // Bind the value to lastName state
            onChange={(e) => setLastName(e.target.value)} // Update last name on input change
            placeholder="Name eintragen" 
          />
        </div>

        {/* Section for first name input */}
        <div className="form-section">
          <label>Vorname:</label>
          <input
            required
            type="text"
            value={firstName} // Bind the value to firstName state
            onChange={(e) => setFirstName(e.target.value)} // Update first name on input change
            placeholder="Vorname eintragen" 
          />
        </div>
      </div>

      <div className="form-row">
        {/* Section for birth year input */}
        <div className="form-section">
          <label>Geburtsjahr:</label>
          <input
            required
            type="text"
            value={birthYear} // Bind the value to birthYear state
            onChange={handleBirthYearChange} // Update birth year on input change
            placeholder="Geburtsjahr eintragen" 
          />
          {/* Display error message if birthYearError exists */}
          {birthYearError && (
            <p className="error-message">{birthYearError}</p>
          )}
        </div>

        {/* Section for email input */}
        <div className="form-section">
          <label>E-Mail:</label>
          <input
            required
            type="email"
            value={email} // Bind the value to email state
            onChange={(e) => setEmail(e.target.value)} // Update email on input change
            placeholder="E-Mail eintragen"
          />
        </div>
      </div>

      <div className="form-row">
        {/* Section for address input */}
        <div className="form-section">
          <label>Anschrift:</label>
          <input
            required
            type="text"
            value={address} // Bind the value to address state
            onChange={handleAddressChange} // Update address on input change
            placeholder="Straßenname Hausnummer, PLZ Wohnort" 
          />
          {/* Display error message if addressError exists */}
          {addressError && (
            <p className="error-message">{addressError}</p>
          )}
        </div>

        {/* Section for semester address input */}
        <div className="form-section">
          <label>Semesteranschrift:</label>
          <input
            required
            type="text"
            value={semesterAddress} // Bind the value to semesterAddress state
            onChange={handleSemesterAddressChange} // Update semester address on input change
            placeholder="Straßenname Hausnummer, PLZ Wohnort" 
          />
          {/* Display error message if semesterAddressError exists */}
          {semesterAddressError && (
            <p className="error-message">{semesterAddressError}</p>
          )}
        </div>
      </div>

      {/* Section for matriculation number input */}
      <div className="form-section">
        <label>Matrikelnummer:</label>
        <input
          required
          type="text"
          value={matriculationNumber} // Bind the value to matriculationNumber state
          onChange={handleMatriculationChange} // Update matriculation number on input change
          placeholder="Matrikelnummer eintragen" 
        />
        {/* Display error message if matriculationError exists */}
        {matriculationError && (
          <p className="error-message">{matriculationError}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfos;
