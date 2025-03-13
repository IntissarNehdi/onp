/* eslint-disable @typescript-eslint/no-unused-vars */
// Importing necessary modules from React and the CSS file
import React, { useState } from "react";
import "./ConsentForms.css";
import { User } from "../../types/User";
import { getFromLocalStorage } from "../../utils/storageUtils";
import { getTUMailFromName } from "../../utils/userUtils";

interface PersonalInfoProps {
  updatePersonalInfo: (field: 'Zuname' | 'Vorname' | 'Geburtsjahr' | 'E-Mail'|'Anschrift'|'Semesteranschrift'|'Matrikelnummer', value: string) => void;
  updateErrors: (field: string, error: string) => void;
}
// Define the functional component 'PersonalInfos'
const PersonalInfo: React.FC<PersonalInfoProps> = ({ updatePersonalInfo,updateErrors }) => {
  // State variables to manage user inputs for personal information
  const [birthYear, setBirthYear] = useState('');
  const [birthYearError, setBirthYearError] = useState('');
  const [matriculationError, setMatriculationError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [semesterStreet, setSemesterStreet] = useState('');
  const [semesterPostalCode, setSemesterPostalCode] = useState('');
  const [semesterCity, setSemesterCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [semesterAddressError, setSemesterAddressError] = useState('');
  const user = JSON.parse(getFromLocalStorage("user"));

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
    validateAddress(value, postalCode, city);
  };
  // Handler for postal code input 
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPostalCode(value);
    validateAddress(street, value, city);
  };
  // Handler for city input 
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    validateAddress(street, postalCode, value);
  };

  // Handler for semester street input 
  const handleSemesterStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSemesterStreet(value);
    validateSemesterAddress(value, semesterPostalCode, semesterCity);
  };
  // Handler for semester postal code input 
  const handleSemesterPostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSemesterPostalCode(value);
    validateSemesterAddress(semesterStreet, value, semesterCity);
  };
  // Handler for semester city input 
  const handleSemesterCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSemesterCity(value);
    validateSemesterAddress(semesterStreet, semesterPostalCode, value);
  };

    // Address validation functions for semester addresse
  const validateSemesterAddress = (street: string, postalCode: string, city: string) => {
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
    updatePersonalInfo("Semesteranschrift", `${street}, ${postalCode} ${city}`);
  };

  // Address validation functions for home addresse
  const validateAddress = (street: string, postalCode: string, city: string) => {
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
    updatePersonalInfo("Anschrift", `${street}, ${postalCode} ${city}`);
  };

  // JSX for rendering the form and handling user inputs
  return (
    <div className="PersonalInfosContainer">
      
      {/* Label for personal info */}
      <label className='ich'>Ich,</label>
      
      <div className="form-row">
      <div className="form-section">
          <label>Vorname:</label>
          <input
          disabled
            required
            type="text"
            value={user ? user.firstName : ""} // Bind the value to lastName state
            placeholder="Name eintragen" 
          />
        </div>
        {/* Section for last name input */}
        <div className="form-section">
          <label>Zuname:</label>
          <input
          disabled
            required
            type="text"
            value={user ? user.lastName : ""} // Bind the value to lastName state
            placeholder="Name eintragen" 
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
          disabled
            required
            type="email"
            value={user ? getTUMailFromName("imad", "khaya", true): ""} // Bind the value to email state
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
        disabled
          required
          type="text"
          value={user ? user.matriculationNumber : ""} // Bind the value to matriculationNumber state
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
