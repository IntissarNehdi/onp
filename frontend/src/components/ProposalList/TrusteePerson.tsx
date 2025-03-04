import React, { useState } from 'react';
import './Forms.css' 
import { getFromLocalStorage } from '../../utils/storageUtils';
import { User } from '../../types/User';
import { getTUMailFromName } from '../../utils/userUtils';
interface TrusteePersonInfo {
  updateTrustee: (field: 'Name, Vorname' | 'FB Nr./SB' | 'Anschrift' | 'E-mail Adresse' | 'Telefonnummer' , value: string) => void;
  updateErrors:(field:string, error:string)=>void;
}
const TrusteePerson: React.FC<TrusteePersonInfo> = ({ updateTrustee, updateErrors}) =>  {
  const [, setName] = useState<string>(''); // State for storing the name input (not directly used in the component)
  const [, setEmail] = useState<string>(''); // State for storing the email input (not directly used in the component)

  const [selectedFbSb, setSelectedFbSb] = useState<string>(''); // State for storing the selected Fachbereich (FB) or Studienbereich (SB)

  const [street, setStreet] = useState(''); // State for storing the street address input
  const [postalCode, setPostalCode] = useState(''); // State for storing the postal code input

  const [city, setCity] = useState(''); // State for storing the city input
  const [additionalInfo, setAdditionalInfo] = useState(''); // State for storing the Additional address information input


  const [addressError, setAddressError] = useState(''); // State for storing the error message related to address validation

  const [phoneNumber, setPhoneNumber] = useState(''); // State for storing the phone number input
  const [errorPhone, setPhoneError] = useState(''); // State for storing the error message related to phone number validation


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
    const value = e.target.value;
    setSelectedFbSb(value); 
    updateTrustee("FB Nr./SB",e.target.options[e.target.selectedIndex].text);
  };

  // Function to handle changes in the street input field
const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStreet(value);
    validateAddress(value, postalCode, city); // Validate address with updated street value
};

// Function to handle changes in the postal code input field
const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPostalCode(value);
    validateAddress(street, value, city); // Validate address with updated postal code
};

// Function to handle changes in the city input field
const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    validateAddress(street, postalCode, value); // Validate address with updated city value
};

// Function to validate the address input (street, postal code, city)
const validateAddress = (street: string, postalCode: string, city: string) => {
    const addressPattern = /^[A-Za-zÄäÖöÜüß\s]+ \d{1,6}$/; // Pattern for street validation (e.g., "Musterstraße 123")
    const postalPattern = /^\d{4,10}$/; // Pattern for postal code validation (4-10 digits)
    const cityPattern = /^[A-Za-zÄäÖöÜüß\s]+$/; // Pattern for city validation (letters only)

    let error = "";

    // If all address fields are empty, clear the error and reset the trustee's address field
    if (street + postalCode + city === "") {  
        setAddressError(error);
        updateErrors("Anschrift", error);
        updateTrustee("Anschrift", "");
        return;
    }

    // Validate the street, postal code, and city fields based on their respective patterns
    if (!addressPattern.test(street)) {
        error = "Ungültiges Straßenformat. Beispiel: 'Musterstraße 123'.";
    } else if (!postalPattern.test(postalCode)) {
        error = "Ungültiges Postleitzahlformat. Nur Zahlen erlaubt (4-10 Stellen).";
    } else if (!cityPattern.test(city)) {
        error = "Ungültiges Ortsformat. Nur Buchstaben erlaubt.";
    }

    // Update error states and the trustee's address field
    setAddressError(error);
    updateErrors("Anschrift", error);
    updateTrustee("Anschrift", `${street}, ${postalCode} ${city}`);
};

// Function to handle changes in the name input field
const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    updateTrustee("Name, Vorname", value); // Update trustee's name field
};

// Function to handle changes in the email address input field
const handleEmailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    updateTrustee("E-mail Adresse", value); // Update trustee's email field
};

  // Function to handle the change in phone number input and validate the format
  const handlePhoneNumberChange = (e: { target: { value: any } }) => {
    let input = e.target.value;
    let errorMessage = ""; 
  
    // Allow only numbers, spaces, and specific characters like +, -, and ()
    input = input.replace(/[^0-9+\-\s()]/g, '');
  
    setPhoneNumber(input); 
    updateTrustee("Telefonnummer", input);
  
    // Validate phone number length and format
    if (input.length < 7 || !/^\+?[0-9\s\-()]+$/.test(input)) {
      errorMessage = 'Bitte geben Sie eine gültige Telefonnummer ein.';  // Set the error message
    }
  
    setPhoneError(errorMessage); 
    updateErrors("Telefonnummer", errorMessage);
  };
  

  // Function to validate phone number when input loses focus
  const validatePhoneNumberOnBlur = () => {
    let errorMessage="";
    if (phoneNumber && phoneNumber.length < 7) {
      errorMessage = 'Eine Telefonnummer muss mindestens 7 Zeichen lang sein.';
    }
    setPhoneError(errorMessage);
    updateErrors("Telefonnummer", errorMessage);
  };
  const user = JSON.parse(getFromLocalStorage('user') as string) as User;

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
          Vorname {/* Label for trustee name */}
        </label>
        <input type="text"
        disabled 
        id="trusteeName" 
        placeholder="Name, Vorname" 
        value={user ? `${user.lastName}, ${user.firstName}` : ""}
        onChange={handleNameChange}
        required /> {/* Input for name */}

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
            placeholder="Addresszusatz" 
          />
        {/* Displaying error message if the address format is invalid */}
        {addressError && <p className="error-message">{addressError}</p>}

        {/* Email input field */}
        <label htmlFor="email" style={{ textAlign: 'left' }}>
          E-mail Adresse
        </label>
        <input type="email" 
        disabled
        value={user ? getTUMailFromName(user.firstName, user.lastName, true) : ""}
        id="email" 
        placeholder="E-Mail" 
        onChange={handleEmailAddressChange}
        required /> {/* Input for email */}

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
