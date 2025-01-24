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
  "Zuname": string;
  "Vorname": string;
  "Geburtsjahr": number;
  "E-Mail": string;
  "Anschrift": string;
  "Semesteranschrift":string;
  "Matrikelnummer": number;
  "Studienbereichsbezeichnung:FB Nr./SB": string;
  "Kennwort":string;
  "für die Wahl im": string;
  "Semesterjahr":number;
  "Darmstadt, den":string;
  "Hinweis": string;
}
// Define the ProposalList functional component
const ProposalList: React.FC = () => {  
  // Initialize the navigate function to allow navigation between pages
  const [, setCandidates] = useState<any[]>([]);
  const [formData, setFormData] = useState<ProposalListInterface>({
      "Zuname": "",
      "Vorname": "",
      "Geburtsjahr": 0,
      "E-Mail": "",
      "Anschrift": "",
      "Semesteranschrift":"",
      "Matrikelnummer": 0,
      "Studienbereichsbezeichnung:FB Nr./SB": "",
      "Kennwort": "",
      "für die Wahl im": "",
      "Semesterjahr":0,
      "Darmstadt, den": "",
      "Hinweis": "Rechtsgrundlage für die Erhebung der voran genannten personenbezogenen Daten ist § 16 der Wahlordnung der TU Darmstadt. Die Verarbeitung der Daten durch das Wahlamt sowie den Wahlvorstand erfolgt nach den Vorschriften der Datenschutz-Grundverordnung (DSGVO) und des Hessischen Datenschutz- und Informationsfreiheitsgesetzes (HDSIG). Gemäß § 18 Abs. 10 der Wahlordnung werden die Wahlvorschläge nur mit Name, Vorname und Fach- und Studienbereich bzw. Einrichtung der Bewerber:innen veröffentlicht. Eine Rücknahme der Erklärung ist gemäß § 16 Abs. 6 Satz 3 der Wahlordnung bis zur abschließenden Zulassungsprüfung durch schriftliche Erklärung gegenüber dem Wahlvorstand möglich."
    });

  const updateCandidates = (updatedCandidates: any[]) => {
    setCandidates(updatedCandidates); // Keep the parent's candidates state in sync
  };
  const updateData = (field: keyof ProposalListInterface, value: string) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };
    const handleSaveAsPDF = (e: React.FormEvent) => {
        e.preventDefault();
        const obj = formData;
        generatePDF(obj);
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
        <SemesterSelection/>
      </form>
      
      {/* Main form for submitting the proposal list */}
      <form className="proposal-form">
        {/* Include CommitteesSelection component for selecting committees */}
        <CommitteesSelection/>
        
        {/* Include TrusteePerson component for selecting trustee person */}
        <TrusteePerson/>
        
        {/* Include CandidatesTable component to display and manage candidates */}
        <CandidatesTable onUpdateCandidates={updateCandidates} />
        
        {/* Include DateAndSig component for handling date and signature */}
        <DateAndSig updateDate={updateData}/>
        <Attachement/>
        {/* Submit button to go to the next page */}
        <button type="submit" className="submit-button" onClick={handleSaveAsPDF}>
          Abschicken {/* Button text */}
        </button>
      </form>
    </div>
  );
};
 
// Export the ProposalList component for use in other parts of the app
export default ProposalList;