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
  "" :string;
  ":":string;
  "Name, Vorname":string;
  "FB Nr./SB":string;
  "Anschrift": string;
  "E-mail Adresse":string;
  "Telefonnummer" : string;
  "Anzahl der Kandidierenden":number;
  "Kandidierenden" : any[];
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
      "" : "",
      ":":"",
      "Name, Vorname":"",
      "FB Nr./SB":"",
      "Anschrift":"",
      "E-mail Adresse":"",
      "Telefonnummer":"",
      "Anzahl der Kandidierenden":0,
      "Kandidierenden":[],
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
    const handleSaveAsPDF = (e: React.FormEvent) => {
        e.preventDefault();
        const obj = formData;
        generatePDF(obj);
      };
      const handleSelectionChange = (input1: string, input2: string ,label:string) => {
        // Update formData state with selected committee and additional selection
        setFormData((prevData) => ({
          ...prevData,
          "VORSCHLAGSLISTE für die Wahl zu": input1, // Update the first dropdown selection
          ":": input2,             // Update the second dropdown selection 
          "":label,

        }));
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