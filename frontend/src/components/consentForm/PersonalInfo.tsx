// Importing necessary modules from React and the CSS file
import React, { useState } from 'react';
import './ConsentForms.css';

interface PersonalInfoProps {
  updatePersonalInfo: (field: 'Zuname' | 'Vorname' | 'Geburtsjahr' | 'E-Mail'|'Anschrift'|'Semesteranschrift'|'Matrikelnummer', value: string) => void;
  updateErrors: (field: string, error: string) => void;
}
// Define the functional component 'PersonalInfos'
const PersonalInfo: React.FC<PersonalInfoProps> = ({ updatePersonalInfo,updateErrors }) => {
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
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [semesterAdditionalInfo, setSemesterAdditionalInfo] = useState('');
  const [semesterAddressError, setSemesterAddressError] = useState('');

  // Handler for first name input
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    updatePersonalInfo('Vorname', value); // Pass value to parent component
  };

  // Handler for last name input
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    updatePersonalInfo('Zuname', value); // Pass value to parent component
  };

  // Handler for email input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    updatePersonalInfo('E-Mail', value); // Pass value to parent component
  };

  // Handler for matriculation number input with validation
  const handleMatriculationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let error = "";
  
    if (value === "") {
      setMatriculationNumber(value);
    } else if (/^\d*$/.test(value)) {
      setMatriculationNumber(value);
      if (value.length !== 7) {
        error = "Die Matrikelnummer muss genau 7 Ziffern enthalten.";
      }
    } else {
      error = "Die Matrikelnummer darf nur Ziffern enthalten.";
    }
  
    setMatriculationError(error);
    updateErrors("Matrikelnummer", error);
    updatePersonalInfo("Matrikelnummer", value);
  };
  
  // Handler for birth year input with validation
  const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    let errorMessage = "";
  
    if (value === "") {
      // If input is empty, do not show an error
      setBirthYear(value);
    } else if (!/^\d*$/.test(value)) {
      errorMessage = "Das Geburtsjahr darf nur Ziffern enthalten.";
    } else if (value.length !== 4) {
      errorMessage = "Das Geburtsjahr muss genau 4 Ziffern enthalten.";
    }
  
    setBirthYear(value);
    setBirthYearError(errorMessage);
    updateErrors("Geburtsjahr", errorMessage);
    updatePersonalInfo("Geburtsjahr", value);
  };
  // Handler for street input 
  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStreet(value);
    validateAddress(value, postalCode, city, additionalInfo);
  };
  // Handler for postal code input 
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPostalCode(value);
    validateAddress(street, value, city, additionalInfo);
  };
  // Handler for city input 
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    validateAddress(street, postalCode, value, additionalInfo);
  };
  // Handler for additional info
  const handleAdditionalInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAdditionalInfo(value);
    validateAddress(street, postalCode, city, value);
  };  

  // Handler for semester street input 
  const handleSemesterStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSemesterStreet(value);
    validateSemesterAddress(value, semesterPostalCode, semesterCity,additionalInfo);
  };
  // Handler for semester postal code input 
  const handleSemesterPostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSemesterPostalCode(value);
    validateSemesterAddress(semesterStreet, value, semesterCity,additionalInfo);
  };
  // Handler for semester city input 
  const handleSemesterCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSemesterCity(value);
    validateSemesterAddress(semesterStreet, semesterPostalCode, value,additionalInfo);
  };
  // Handler for semester additional info input
  const handleSemesterAdditionalInfo=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    setSemesterAdditionalInfo(value);
    validateSemesterAddress(semesterStreet, semesterPostalCode, semesterCity, value);
  }

    // Address validation functions for semester addresse
  const validateSemesterAddress = (street: string, postalCode: string, city: string, additionalInfo:string) => {
    let errorMessage = "";

    const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+\s\d{1,6}$/;
    const postalPattern = /^\d{4,10}$/;
    const cityPattern = /^[A-Za-zÄäÖöÜüß\s]+$/;
    if(street+postalCode+city==="") {  
      setSemesterAddressError(errorMessage);
      updateErrors("Semesteranschrift", errorMessage);
      updatePersonalInfo("Semesteranschrift", "");
      return;
    }
    if (!addressPattern.test(street)) {
      errorMessage = 'Ungültiges Straßenformat. Beispiel: "Musterstraße 123".';
    } else if (!postalPattern.test(postalCode)) {
      errorMessage = "Ungültiges Postleitzahlformat. Nur Zahlen erlaubt (4-10 Stellen).";
    } else if (!cityPattern.test(city)) {
      errorMessage = "Ungültiges Ortsformat. Nur Buchstaben erlaubt.";
    }

    setSemesterAddressError(errorMessage);
    updateErrors("Semesteranschrift", errorMessage);
    updatePersonalInfo("Semesteranschrift", `${street}, ${postalCode} ${city} ${additionalInfo}`);
  };

  // Address validation functions for home addresse
  const validateAddress = (street: string, postalCode: string, city: string, additionalInfo:string) => {
    const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+ \d{1,6}$/;
    const postalPattern = /^\d{4,10}$/;
    const cityPattern = /^[A-Za-zÄäÖöÜüß\s]+$/;

    let error = "";

    if(street+postalCode+city==="") {  
      setAddressError(error);
      updateErrors("Anschrift", error);
      updatePersonalInfo("Anschrift", "");
      return;
    }

    if (!addressPattern.test(street)) {
      error = "Ungültiges Straßenformat. Beispiel: 'Musterstraße 123'.";
    } else if (!postalPattern.test(postalCode)) {
      error = "Ungültiges Postleitzahlformat. Nur Zahlen erlaubt (4-10 Stellen).";
    } else if (!cityPattern.test(city)) {
      error = "Ungültiges Ortsformat. Nur Buchstaben erlaubt.";
    }

    setAddressError(error);
    updateErrors("Anschrift", error);
    updatePersonalInfo("Anschrift", `${street}, ${postalCode} ${city} ${additionalInfo}`);
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
          <input
            type="text"
            value={additionalInfo} 
            onChange={handleAdditionalInfo} 
            placeholder="Adresszusatz" 
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
          <input
            type="text"
            value={semesterAdditionalInfo} 
            onChange={handleSemesterAdditionalInfo} 
            placeholder="Adresszusatz" 
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
