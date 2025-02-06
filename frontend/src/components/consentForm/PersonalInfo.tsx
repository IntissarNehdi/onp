// Importing necessary modules from React and the CSS file
import React, { useState } from 'react';
import './ConsentForms.css';

interface PersonalInfoProps {
  updatePersonalInfo: (field: 'Zuname' | 'Vorname' | 'Geburtsjahr' | 'E-Mail'|'Anschrift'|'Semesteranschrift'|'Matrikelnummer', value: string) => void;
}
// Define the functional component 'PersonalInfos'
const PersonalInfo: React.FC<PersonalInfoProps> = ({ updatePersonalInfo }) => {
  // State variables to manage user inputs for personal information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthYearError, setBirthYearError] = useState('');
  const [email, setEmail] = useState('');
  const [matriculationNumber, setMatriculationNumber] = useState('');
  const [matriculationError, setMatriculationError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [semesterStreet, setSemesterStreet] = useState('');
  const [semesterPostalCode, setSemesterPostalCode] = useState('');
  const [semesterCity, setSemesterCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [semesterAddressError, setSemesterAddressError] = useState('');

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    updatePersonalInfo('Vorname', value); // Pass value to parent component
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    updatePersonalInfo('Zuname', value); // Pass value to parent component
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    updatePersonalInfo('E-Mail', value); // Pass value to parent component
  };

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
    updatePersonalInfo('Matrikelnummer',value);
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
    updatePersonalInfo('Geburtsjahr', value); // Pass value to parent component
  };

  
  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStreet(value);
    validateAddress(value, postalCode, city);
  };
  
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPostalCode(value);
    validateAddress(street, value, city);
  };
  
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    validateAddress(street, postalCode, value);
  };
  const handleSemesterStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSemesterStreet(value);
    validateSemesterAddress(value, semesterPostalCode, semesterCity);
  };
  
  const handleSemesterPostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSemesterPostalCode(value);
    validateSemesterAddress(semesterStreet, value, semesterCity);
  };
  
  const handleSemesterCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSemesterCity(value);
    validateSemesterAddress(semesterStreet, semesterPostalCode, value);
  };

 const validateSemesterAddress = (street: string, postalCode: string, city: string) => {
  const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+ \d{1,6}$/;
  const postalPattern = /^\d{4,10}$/;
  const cityPattern = /^[A-Za-zÄäÖöÜüß\s]+$/;

  if (!addressPattern.test(street)&&street!='') {
    setSemesterAddressError('Ungültiges Straßenformat. Beispiel: "Musterstraße 123".');
    return;
  }
  if (!postalPattern.test(postalCode)&&postalCode!='') {
    setSemesterAddressError('Ungültiges Postleitzahlformat. Nur Zahlen erlaubt (4-10 Stellen).');
    return;
  }
  if (!cityPattern.test(city)&&city!='') {
    setSemesterAddressError('Ungültiges Ortsformat. Nur Buchstaben erlaubt.');
    return;
  }
  setSemesterAddressError('');
  updatePersonalInfo('Semesteranschrift', `${street}, ${postalCode} ${city}`);
};

const validateAddress = (street: string, postalCode: string, city: string) => {
  const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+ \d{1,6}$/;
  const postalPattern = /^\d{4,10}$/;
  const cityPattern = /^[A-Za-zÄäÖöÜüß\s]+$/;

  if (!addressPattern.test(street)&&street!='') {
    setAddressError('Ungültiges Straßenformat. Beispiel: "Musterstraße 123".');
    return;
  }
  if (!postalPattern.test(postalCode)&&postalCode!='') {
    setAddressError('Ungültiges Postleitzahlformat. Nur Zahlen erlaubt (4-10 Stellen).');
    return;
  }
  if (!cityPattern.test(city)&&city!='') {
    setAddressError('Ungültiges Ortsformat. Nur Buchstaben erlaubt.');
    return;
  }
  setAddressError('');
  updatePersonalInfo('Anschrift', `${street}, ${postalCode} ${city}`);
};


  // JSX for rendering the form and handling user inputs
  return (
    <div className="PersonalInfosContainer">
      
      {/* Label for personal info */}
      <label className='ich'>Ich,</label>
      
      <div className="form-row">
        {/* Section for last name input */}
        <div className="form-section">
          <label>Zuname:</label>
          <input
            required
            type="text"
            value={lastName} // Bind the value to lastName state
            onChange={handleLastNameChange} // Update last name on input change
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
            onChange={handleFirstNameChange} // Update first name on input change
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
            onChange={handleEmailChange} // Update email on input change
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
            value={street} // Bind the value to semesterAddress state
            onChange={handleStreetChange} // Update semester address on input change
            placeholder="Straßenname Hausnummer" 
          />
          <input
            required
            type="text"
            value={postalCode} // Bind the value to semesterAddress state
            onChange={handlePostalCodeChange} // Update semester address on input change
            placeholder="PLZ" 
          />
          <input
            required
            type="text"
            value={city} // Bind the value to semesterAddress state
            onChange={handleCityChange} // Update semester address on input change
            placeholder="Wohnort" 
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
            value={semesterStreet} // Bind the value to semesterAddress state
            onChange={handleSemesterStreetChange} // Update semester address on input change
            placeholder="Straßenname Hausnummer" 
          />
          <input
            required
            type="text"
            value={semesterPostalCode} // Bind the value to semesterAddress state
            onChange={handleSemesterPostalCodeChange} // Update semester address on input change
            placeholder="PLZ" 
          />
          <input
            required
            type="text"
            value={semesterCity} // Bind the value to semesterAddress state
            onChange={handleSemesterCityChange} // Update semester address on input change
            placeholder="Wohnort" 
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

export default PersonalInfo;
