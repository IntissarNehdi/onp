import React, { useState } from 'react';
import './Forms.css' 
interface TrusteePersonInfo {
  updateTrustee: (field: 'Name, Vorname' | 'FB Nr./SB' | 'Anschrift' | 'E-mail Adresse' | 'Telefonnummer' , value: string) => void;
}
const TrusteePerson: React.FC<TrusteePersonInfo> = ({ updateTrustee }) =>  {
  const [,setName]=useState<string>('');
  const [,setEmail]=useState<string>('');
  const [selectedFbSb, setSelectedFbSb] = useState<string>(''); // State for selected Fachbereich (FB) or Studienbereich (SB)
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
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
    const value = e.target.value;
    setSelectedFbSb(value); 
    updateTrustee("FB Nr./SB",e.target.options[e.target.selectedIndex].text);
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
  }
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
    updateTrustee('Anschrift', `${street}, ${postalCode} ${city}`);
  };
const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const value = e.target.value;
  setName(value);
  updateTrustee("Name, Vorname", value)
}
const handleEmailAddressChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
  const value = e.target.value;
  setEmail(value);
  updateTrustee("E-mail Adresse", value)
}
  // Function to handle the change in phone number input and validate the format
  const handlePhoneNumberChange = (e: { target: { value: any } }) => {
    let input = e.target.value;
    
    // Allow only numbers, spaces, and specific characters like +, -, and ()
    input = input.replace(/[^0-9+\-\s()]/g, '');

    setPhoneNumber(input); 
    updateTrustee("Telefonnummer", input);
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
        <input type="text" 
        id="trusteeName" 
        placeholder="Name, Vorname" 
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
        {/* Displaying error message if the address format is invalid */}
        {addressError && <p className="error-message">{addressError}</p>}

        {/* Email input field */}
        <label htmlFor="email" style={{ textAlign: 'left' }}>
          E-mail Adresse
        </label>
        <input type="email" 
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
