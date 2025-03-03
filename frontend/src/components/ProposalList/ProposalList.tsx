
import React, { useEffect, useState } from 'react';
import './Forms.css'; 
import SemesterSelection from './SemesterSelection'; 
import CommitteesSelection from './CommitteesSelection'; 
import TrusteePerson from './TrusteePerson'; 
import CandidatesTable from './CandidatesTable'; 
import DateAndSig from './DateAndSig'; 
import { useNavigate } from 'react-router-dom'; 
import logo from '../../assets/tuda_logo.jpg';  // Importing logo image
import { generatePDF } from '../PdfFunctions/ProposalListPDF';
import Attachement from './AttachementForm';
import { getFromLocalStorage } from '../../utils/storageUtils';
import { getTUMailFromName } from '../../utils/userUtils';

// Define the ProposalList functional component
const ProposalList: React.FC = () => {  
  const navigate = useNavigate();
  const login = JSON.parse(getFromLocalStorage('user')); // Replace this with actual state or context value
  console.log(login);
  useEffect(() => {
    if (login == null) {
      navigate("/login", {state : {from: "/proposal"}});
    }
  }, [login, navigate]);
  const nextPage = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Navigate to the 'attachement' page
    navigate('/attachement');
  };

  // State to manage the list of candidates (not directly used in this snippet)
  const [, setCandidates] = useState<any[]>([]);
  // State to store form data for the proposal list, initialized with empty values
  const [formData, setFormData] = useState<ProposalListInterface>({
      "Hochschulwahlen im": "",
      "Semesterjahr": "",
      "Kennwort der Liste" : "",
      "VORSCHLAGSLISTE für die Wahl zu":"",
      "Name, Vorname":login ? `${login.lastName}, ${login.firstName}` : "",
      "FB Nr./SB":"",
      "Anschrift":"",
      "E-mail Adresse":login ? getTUMailFromName(login.firstName, login.lastName, true) : "",
      "Telefonnummer":"",
      "Anzahl der Kandidierenden":"",
      "Kandidierenden":[],
      "Darmstadt, den":"",
  })
  // State to store form data for the required attachments, initialized with default values
  const [attachementFormData, setAttachementFormData] = useState<AttachementInterface>({
    "Kennwort":"",
    "Hinweis":"Bei der Aufstellung von Wahlvorschlägen sollen Frauen und Männer entsprechend ihrem jeweiligen Anteil in der jeweiligen Statusgruppe angemessen berücksichtigt werden. Für die Gruppe der wissenschaftlichen Mitglieder sollen zusätzlich unbefristet und befristet Beschäftigte entsprechend ihrem Anteil in der Gruppe angemessen berücksichtigt werden. Eine entsprechende Erklärung, dass diese Anforderungen erfüllt sind oder eine Begründung für die Abweichung ist schriftlich dem Wahlvorschlag beizufügen (§ 16 Abs. 2 WahlO). Die Erklärung wird bei Zulassung des Wahlvorschlages mit der Bekanntmachung der Zulassung veröffentlicht (§ 18 Abs. 10 WahlO).",
    "Erklärung gemäß § 16 Abs. 2 WahlO":"",
    "Darmstadt, den":"",
  })
  // State to store validation errors for form fields, initialized as an empty object
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Function to update the number of candidates and candidate list in the form data
const updateCandidates = (numCandidates: string, candidates: any[]) => {
  setCandidates(candidates); // Keep the parent's candidates state in sync
  setFormData((prevData) => ({
    ...prevData,
    "Anzahl der Kandidierenden": numCandidates, // Update the number of candidates
    "Kandidierenden": candidates, // Update the candidate list
  }));
};

// Function to update a specific field in the proposal list form data
const updateData = (field: keyof ProposalListInterface, value: string) => {
  setFormData((prevData) => ({
    ...prevData,
    [field]: value, // Update the specified field with the given value
  }));
};

// Function to update the error messages for form validation
const updateErrors = (field: string, error: string) => {
  setErrors((prevErrors: any) => ({
    ...prevErrors,
    [field]: error // Store the error message for the specified field
  }));
};

// Function to update a specific field in the attachment form data
const updateAttachementData = (field: keyof AttachementInterface, value: string) => {
  setAttachementFormData((prevData) => ({
      ...prevData,
      [field]: value, // Update the specified attachment field with the given value
  }));
};

// Function to handle selection changes for the election proposal list
const handleSelectionChange = (input: string) => {
  // Update formData state with the selected committee or election body
  setFormData((prevData) => ({
    ...prevData,
    "VORSCHLAGSLISTE für die Wahl zu": input, // Update the first dropdown selection
  })); 
};


// Method to save the PDF
const handleSaveAsPDF = (e: React.FormEvent) => {
  e.preventDefault();

  // Define required fields for the proposal list and attachments
  const proposalListRequiredFields: (keyof ProposalListInterface)[] = [
    "Semesterjahr", "Kennwort der Liste", "Name, Vorname", "FB Nr./SB",
    "Anschrift", "E-mail Adresse", "Telefonnummer", "Anzahl der Kandidierenden"
  ];

  const attachementRequiredFields: (keyof AttachementInterface)[] = [
    "Kennwort"
  ];

  // Retrieve errors from the current form data
  const currentErrors = Object.entries(errors).filter(([, message]) => message.trim() !== "");

  // Separate incorrect fields and specific selected field errors
  const falseFields = currentErrors
    .map(([field]) => field)
    .filter((field) => field !== "Gremium" && field !== "Geburtsjahr");

  const selectedFieldsErrors = currentErrors
    .map(([field]) => field)
    .filter((field) => field === "Gremium");

  // Check birth year for each candidate (must follow the YYYY format)
  const geburtsjahrErrors: string[] = [];
  formData["Kandidierenden"].forEach((candidate, index) => {
    if (candidate.birthYear && !/^\d{4}$/.test(candidate.birthYear)) {
      geburtsjahrErrors.push(`Kandidat ${index + 1}`);
    }
  });

  // Check candidates for missing or empty fields
  const candidateErrors: string[] = [];
  formData["Kandidierenden"].forEach((candidate, index) => {
    if (!candidate.lastName || !candidate.firstName || !candidate.birthYear || !candidate.fbSb) {
      candidateErrors.push(`Kandidat ${index + 1}`);
    }
  });

  // Check if any required fields are empty (proposal list and attachments)
  const emptyFields = [
    ...proposalListRequiredFields.filter(field => !formData[field]),
    ...attachementRequiredFields.filter(field => !attachementFormData[field])
  ];

  // Construct the error message
  let combinedMessage = "";

  // Add missing fields to the message
  if (emptyFields.length > 0) {
    combinedMessage += `Fehlende Felder: ${emptyFields.join(", ")}\n`;
  }

  // Add incorrect fields to the message
  if (falseFields.length > 0) {
    combinedMessage += `Fehlerhafte Felder: ${falseFields.join(", ")}\n`;
  }

  // Add "Gremium" field error to the message
  if (selectedFieldsErrors.length > 0) {
    combinedMessage += "Bitte wählen Sie das Gremium aus\n";
  }

  // Add birth year errors to the message
  if (geburtsjahrErrors.length > 0) {
    combinedMessage += `Ungültige Geburtsjahre: ${geburtsjahrErrors.join(", ")}\n`;
  }

  // Add candidate-related errors to the message
  if (candidateErrors.length > 0) {
    combinedMessage += `Unvollständige Kandidaten: ${candidateErrors.join(", ")}\n`;
  }
  if (formData['Kennwort der Liste'] !== attachementFormData['Kennwort']) {
    combinedMessage += "Kennwort stimmt nicht überein.\n";
}

  // If errors are found, display an alert and return to prevent PDF generation and email sending
  if (combinedMessage) {
    alert(`Bitte füllen Sie alle erforderlichen Felder korrekt aus:\n${combinedMessage}`);
    return false; // Wenn Fehler vorhanden sind, breche den Prozess ab
  }
 
  // If no errors are found, proceed with PDF generation
  generatePDF(formData, attachementFormData);

  return true; // No errors found, continue the process
}

// Method to send emails
const sendEmails = async () => {
  try {
    const candidatesData = formData["Kandidierenden"]; // Retrieve candidate data from the form
    const selectedCommittee = formData["VORSCHLAGSLISTE für die Wahl zu"]; // Retrieve the selected committee
    const semesterYear = formData["Semesterjahr"];
    const trusteePerson=formData["Name, Vorname"];
    const password = formData["Kennwort der Liste"];
    const semester = formData["Hochschulwahlen im"];

    // Send a POST request to the backend to trigger the email sending process
    const response = await fetch("http://127.0.0.1:8000/send-emails/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ candidates: candidatesData, selectedCommittee, semesterYear, trusteePerson, password, semester }), // Send candidate data and selected committee
    });

    // Check if the request was successful
    if (response.ok) {
      alert("Emails sent successfully!"); // Notify the user of success
    } else {
      const errorData = await response.json();
      alert(`Failed to send emails: ${errorData.error}`); // Display an error message if email sending fails
    }
  } catch (error) {
    console.error("Error sending emails:", error);
    alert("An error occurred while sending emails."); // Display an error message in case of a network or server issue
  }
};

// Method to save the PDF and send emails (combined)
const handleSaveAndSendEmails = async (e: React.FormEvent) => {
  e.preventDefault(); // Prevent default form submission behavior

  // First, validate the form and save the PDF
  const isFormValid = handleSaveAsPDF(e);

  // If the form is valid (no errors found), proceed to send emails
  if (isFormValid) {
    await sendEmails(); // Call the email sending function
  }
};


  return (
    <div className="proposal-list-container"> {/* Container for the proposal list */}
      {/* Display TU_DA logo at the top right of the container */}
      <img
        src={logo}
        className="top-right-image" // Apply CSS class to the image
      />

      {/* Title of the page */}
      <h1 className="title">Vorschlagsliste: </h1>
      <h1 className="title">Statusgruppe der Studierenden</h1>

      {/* Form for selecting the semester */}
      <form className='nomination-semester'>
        <label>Hochschulwahlen im</label>
        {/* Include SemesterSelection component for selecting the semester */}
        <SemesterSelection updateSemester={updateData} updateErrors={updateErrors}/>
      </form>

      {/* Main form for submitting the proposal list */}
      <form className="proposal-form">
        {/* Include CommitteesSelection component for selecting committees */}
        <CommitteesSelection onSelectionChange={handleSelectionChange} updateErrors={updateErrors} />        
        {/* Include TrusteePerson component for selecting trustee person */}
        <TrusteePerson updateTrustee={updateData} updateErrors={updateErrors}/>
        
        {/* Include CandidatesTable component to display and manage candidates */}
        <CandidatesTable onUpdateCandidates={updateCandidates} />
        
        {/* Include DateAndSig component for handling date and signature */}
        <DateAndSig updateDate={updateData}/>
        <Attachement updateAttachement={updateAttachementData}/>
        {/* Submit button to go to the next page */}
        <button type="submit" className="submit-button" onClick={handleSaveAndSendEmails}>
          Abschicken
        </button>
      </form>
    </div>
  );
};

// Export the ProposalList component for use in other parts of the app
export default ProposalList;