import React, { useState } from 'react';
import './Forms.css'; 
import logo from '../../assets/tuda_logo.jpg';  // Importing logo image
import SemesterSelection from './SemesterSelection'; 
import CommitteesSelection from './CommitteesSelection'; 
import TrusteePerson from './TrusteePerson'; 
import CandidatesTable from './CandidatesTable'; 
import DateAndSig from './DateAndSig'; 
import { generatePDF } from '../PdfFunctions/ProposalListPDF';
import Attachement from './AttachementForm';

export interface ProposalListInterface {
  "Hochschulwahlen im": string;
  "Semesterjahr": string;
  "Kennwort der Liste" : string;
  "VORSCHLAGSLISTE für die Wahl zu":string;
  "Name, Vorname":string;
  "FB Nr./SB":string;
  "Anschrift": string;
  "E-mail Adresse":string;
  "Telefonnummer" : string;
  "Anzahl der Kandidierenden":number;
  "Kandidierenden" : any[];
  "Darmstadt, den":string;
}
export interface AttachementInterface{
  "Kennwort":string;
  "Hinweis":string;
  "Erklärung gemäß § 16 Abs. 2 WahlO":string;
  "Darmstadt, den":string;
}
// Define the ProposalList functional component
const ProposalList: React.FC = () => {  
  // Initialize the navigate function to allow navigation between pages
  const [, setCandidates] = useState<any[]>([]);
  const [formData, setFormData] = useState<ProposalListInterface>({
      "Hochschulwahlen im": "",
      "Semesterjahr": "",
      "Kennwort der Liste" : "",
      "VORSCHLAGSLISTE für die Wahl zu":"",
      "Name, Vorname":"",
      "FB Nr./SB":"",
      "Anschrift":"",
      "E-mail Adresse":"",
      "Telefonnummer":"",
      "Anzahl der Kandidierenden":0,
      "Kandidierenden":[],
      "Darmstadt, den":"",
  })
  const [attachementFormData, setAttachementFormData] = useState<AttachementInterface>({
    "Kennwort":"",
    "Hinweis":"Bei der Aufstellung von Wahlvorschlägen sollen Frauen und Männer entsprechend ihrem jeweiligen Anteil in der jeweiligen Statusgruppe angemessen berücksichtigt werden. Für die Gruppe der wissenschaftlichen Mitglieder sollen zusätzlich unbefristet und befristet Beschäftigte entsprechend ihrem Anteil in der Gruppe angemessen berücksichtigt werden. Eine entsprechende Erklärung, dass diese Anforderungen erfüllt sind oder eine Begründung für die Abweichung ist schriftlich dem Wahlvorschlag beizufügen (§ 16 Abs. 2 WahlO). Die Erklärung wird bei Zulassung des Wahlvorschlages mit der Bekanntmachung der Zulassung veröffentlicht (§ 18 Abs. 10 WahlO).",
    "Erklärung gemäß § 16 Abs. 2 WahlO":"",
    "Darmstadt, den":"",
  })

  const updateCandidates = (numCandidates:number,candidates: any[]) => {
    setCandidates(candidates); // Keep the parent's candidates state in sync
    setFormData((prevData) => ({
      ...prevData,
      "Anzahl der Kandidierenden":numCandidates,
      "Kandidierenden": candidates,
    }));
  };
  const updateData = (field: keyof ProposalListInterface, value: string) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };
    const updateAttachementData = (field: keyof AttachementInterface, value: string) => {
      setAttachementFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };
    const handleSaveAsPDF = (e: React.FormEvent) => {
        e.preventDefault();
        generatePDF(formData,attachementFormData);
        
      };
      const handleSelectionChange = (input: string) => {
        // Update formData state with selected committee and additional selection
        setFormData((prevData) => ({
          ...prevData,
          "VORSCHLAGSLISTE für die Wahl zu": input, // Update the first dropdown selection
        }));
      };
      const sendEmails = async () => {
        try {
          const response = await fetch('/api/send-emails/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ candidates: formData["Kandidierenden"] }), // Include candidate data
          });
      
          if (response.ok) {
            alert('Emails sent successfully!');
          } else {
            const errorData = await response.json();
            alert(`Failed to send emails: ${errorData.error}`);
          }
        } catch (error) {
          console.error('Error sending emails:', error);
          alert('An error occurred while sending emails.');
        }
      };
      

  return (
    <div className="proposal-list-container"> {/* Container for the proposal list */}
      {/* Display TU_DA logo at the top right of the container */}
      <img
        src={logo}
        alt="TU_DA Logo"
        className="top-right-image" // Apply CSS class to the image
      />
      
      {/* Title of the page */}
      <h1 className="title">Vorschlagsliste: </h1>
      <h1 className="title">Statusgruppe der Studierenden</h1>
      
      {/* Form for selecting the semester */}
      <form className='nomination-semester'>
        <label>Hochschulwahlen im</label>
        {/* Include SemesterSelection component for selecting the semester */}
        <SemesterSelection updateSemester={updateData}/>
      </form>
      
      {/* Main form for submitting the proposal list */}
      <form className="proposal-form">
        {/* Include CommitteesSelection component for selecting committees */}
        <CommitteesSelection onSelectionChange={handleSelectionChange} />        
        {/* Include TrusteePerson component for selecting trustee person */}
        <TrusteePerson updateTrustee={updateData}/>
        
        {/* Include CandidatesTable component to display and manage candidates */}
        <CandidatesTable onUpdateCandidates={updateCandidates} />
        
        {/* Include DateAndSig component for handling date and signature */}
        <DateAndSig updateDate={updateData}/>
        <Attachement updateAttachement={updateAttachementData}/>
        {/* Submit button to go to the next page */}
        <button type="submit" className="submit-button" onClick={sendEmails}>
          Abschicken {/* Button text */}
        </button>
      </form>
    </div>
  );
};
 
// Export the ProposalList component for use in other parts of the app
export default ProposalList;