import React, { useState } from 'react';
import './Forms.css' 

const TrusteePerson = () => {
  const [selectedFbSb, setSelectedFbSb] = useState<string>(''); // State for selected Fachbereich (FB) or Studienbereich (SB)
  const [address, setAddress] = useState(''); // State for address input
  const [addressError, setAddressError] = useState(''); // State for error message related to address validation
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number input
  const [errorPhone, setPhoneError] = useState(''); // State for error message related to phone number validation

  // Array of options for Wahlfachschaft (elective faculties)
  const WAHLFACHSCHAFT_OPTION = [
    { value: "Psychologie", label: "Wahlfachschaft Psychologie" },
    { value: "BEdMEd", label: "Wahlfachschaft B.Ed. und M.Ed." },
    { value: "18IST", label: "Wahlfachschaft 18-IST" },
    { value: "MedTec", label: "Wahlfachschaft MedTec" },
    { value: "LaG", label: "Wahlfachschaft LaG" },
    { value: "Sportwissenschaft", label: "Wahlfachschaft Sportwissenschaft" }
  ];

  // Array of options for Studienbereich (fields of study)
  const STUDIENBEREICH_OPTIONS = [
    { value: "CE", label: "CE – Computational Engineering" },
    { value: "ESE", label: "ESE – Energy Science and Engineering" },
    { value: "Mechanik", label: "Mechanik" },
    { value: "Mechatronik", label: "Mechatronik" }
  ];

  // Array of options for Fachschaft (department)
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

  // Merging all options into a single array for easier handling in the select dropdown
  const allOptions = [...WAHLFACHSCHAFT_OPTION, ...STUDIENBEREICH_OPTIONS, ...FACHSCHAFT_OPTIONS];

  // Function to handle the change in Fachbereich/Studienbereich selection
  const handleFbSbChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFbSb(e.target.value); 
  };

  // Function to handle the change in address input and validate the format
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Regular expression pattern for validating the address
    const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+ \d{1,6}, \d{4,10} [A-Za-zÄäÖöÜüß]+(?:, [A-Za-zÄäÖöÜüß0-9\s]+)?$/;

    setAddress(value); 

    // If the address matches the pattern, clear error; otherwise, show error message
    if (addressPattern.test(value)) {
        setAddressError(''); 
    } else {
        setAddressError(
            'Die Anschrift muss im Format "Straßenname Hausnummer, PLZ Wohnort, Zusatz(optional)" vorliegen.'
        );
    }
};

  // Function to handle the change in phone number input and validate the format
  const handlePhoneNumberChange = (e: { target: { value: any } }) => {
    let input = e.target.value;

    // Allow only numbers, spaces, and specific characters like +, -, and ()
    input = input.replace(/[^0-9+\-\s()]/g, '');

    setPhoneNumber(input); 

    // Validate phone number length and format
    if (input.length < 7 || !/^\+?[0-9\s\-()]+$/.test(input)) {
      setPhoneError('Bitte geben Sie eine gültige Telefonnummer ein.'); 
    } else {
      setPhoneError(''); 
    }
  };

  // Function to validate phone number when input loses focus
  const validatePhoneNumberOnBlur = () => {
    if (phoneNumber && phoneNumber.length < 7) {
      setPhoneError('Eine Telefonnummer muss mindestens 7 Zeichen lang sein.'); 
    }
  };

  return (
    <div>
      {/* Section for displaying the form labels */}
      <section className="form-section">
        <label htmlFor="trusteeName" style={{ textAlign: 'left' }}>
          Vertrauensperson: {/* Label for the trustee name input */}
        </label>
      </section>
      <section className="form-section">
        {/* Trustee Name input field */}
        <label htmlFor="trusteeName" style={{ textAlign: 'left' }}>
          Name, Vorname {/* Label for trustee name */}
        </label>
        <input type="text" id="trusteeName" placeholder="Name, Vorname" required /> {/* Input for name */}

        {/* Fachbereich/Studienbereich selection dropdown */}
        <label htmlFor="fbSb" style={{ textAlign: 'left' }}>
          FB Nr./SB
        </label>
        <select
          id="fbSb"
          value={selectedFbSb}
          onChange={handleFbSbChange} 
          required
          style={{ width: '100%' }}
        >
          <option value="" disabled>Bitte wählen</option> {/* Default disabled option */}
          {/* Rendering all available options dynamically */}
          {allOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Address input field */}
        <label htmlFor="address" style={{ textAlign: 'left' }}>
          Anschrift
        </label>
        <input
          required
          type="text"
          value={address}
          onChange={handleAddressChange} 
          placeholder="Straßenname Hausnummer, PLZ Wohnort" 
        />
        {/* Displaying error message if the address format is invalid */}
        {addressError && <p className="error-message">{addressError}</p>}

        {/* Email input field */}
        <label htmlFor="email" style={{ textAlign: 'left' }}>
          E-mail Adresse
        </label>
        <input type="email" id="email" placeholder="E-Mail" required /> {/* Input for email */}

        {/* Phone number input field */}
        <label htmlFor="tel" style={{ textAlign: 'left' }}>
          Telefonnummer
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange} 
          onBlur={validatePhoneNumberOnBlur} 
          placeholder="Telefonnummer"
          required
        />
        {/* Displaying error message if the phone number is invalid */}
        {errorPhone && <p className="error-message">{errorPhone}</p>}
      </section>
    </div>
  );
};

// Exporting the TrusteePerson component as default export
export default TrusteePerson; 
