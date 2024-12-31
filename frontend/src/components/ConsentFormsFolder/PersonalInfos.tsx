import React, { useState } from 'react';
import './ConsentForm.css';

const PersonalInfos: React.FC = () => {
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

    
    const handleMatriculationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
        
        setMatriculationNumber(value);
        if (value.length === 7) {
            setMatriculationError(''); 
        } else {
            setMatriculationError('Die Matrikelnummer muss genau 7 Ziffern enthalten.');
        }
        } else {
        setMatriculationError('Die Matrikelnummer darf nur Ziffern enthalten.');
        }
    };
    const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
      
        if (/^\d*$/.test(value)) { 
          setBirthYear(value);
      
          if (value.length === 4) {
            setBirthYearError('');
          } else if (value.length > 4) {
            setBirthYearError('Das Geburtsjahr darf nicht mehr als 4 Ziffern enthalten.');
          } else {
            setBirthYearError('Das Geburtsjahr muss genau 4 Ziffern enthalten.');
          }
        } else {
          setBirthYearError('Das Geburtsjahr darf nur Ziffern enthalten.');
        }
    };
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    
        const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+ \d{1,6}, \d{4,10} [A-Za-zÄäÖöÜüß]+(?:, [A-Za-zÄäÖöÜüß0-9\s]+)?$/;
    
        setAddress(value);
    
        if (addressPattern.test(value)) {
            setAddressError(''); 
        } else {
            setAddressError(
                'Die Anschrift muss im Format "Straßenname Hausnummer, PLZ Wohnort, Zusatz(optional)" vorliegen.'
            );
        }
    };
    const handleSemesterAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
      
        const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+ \d{1,6}, \d{4,10} [A-Za-zÄäÖöÜüß\s]+$/;
      
        setSemesterAddress(value);
      
        if (addressPattern.test(value)) {
          setSemesterAddressError(''); 
        } else {
          setSemesterAddressError(
            'Die Semesteranschrift muss im Format "Straßenname Hausnummer, PLZ Wohnort" vorliegen.'
          );
        }
    };

    return (
        
        <div className="PersonalInfosContainer">
        <label>Ich,</label>
        <div className="form-row">
          <div className="form-section">
                <label>Zuname:</label>
                <input
                required
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Name eintragen"
                />
          </div>

          <div className="form-section">
                <label>Vorname:</label>
                <input
                required
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Vorname eintragen" 
                />
          </div>
        </div>

        <div className="form-row">
          <div className="form-section">
            <label>Geburtsjahr:</label>
            <input
              required
              type="text"
              value={birthYear}
              onChange={handleBirthYearChange}
              placeholder="Geburtsjahr eintragen"
            />
            {/* Error message display */}
            {birthYearError && (
              <p className="error-message">{birthYearError}</p>
            )}
          </div>

          <div className="form-section">
            <label>E-Mail:</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail eintragen"
            />
          </div>
        </div>

        <div className="form-row">
        <div className="form-section">
          <label>Anschrift:</label>
          <input
            required
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Straßenname Hausnummer, PLZ Wohnort"
          />
          {addressError && (
            <p className="error-message">{addressError}</p>
          )}
        </div>

        <div className="form-section">
          <label>Semesteranschrift:</label>
          <input
            required
            type="text"
            value={semesterAddress}
            onChange={handleSemesterAddressChange}
            placeholder="Straßenname Hausnummer, PLZ Wohnort"
          />
          {semesterAddressError && (
            <p className="error-message">{semesterAddressError}</p>
          )}
        </div>
      </div>
      <div className="form-section">
          <label>Matrikelnummer:</label>
          <input
            required
            type="text"
            value={matriculationNumber}
            onChange={handleMatriculationChange}
            placeholder="Matrikelnummer eintragen"
          />
          {/* Display error message */}
          {matriculationError && (
            <p className="error-message">{matriculationError}</p>
          )}
      </div>
      </div>
    );
};
export default PersonalInfos;
