
import React from 'react';
import './Forms.css'; 
import logo from '../tuda_logo.jpg'; 
import SemesterSelection from './SemesterSelection'; 
import CommitteesSelection from './CommitteesSelection'; 
import TrusteePerson from './TrusteePerson'; 
import CandidatesTable from './CandidatesTable'; 
import DateAndSig from './DateAndSig'; 
import { useNavigate } from 'react-router-dom'; 

// Define the ProposalList functional component
const ProposalList: React.FC = () => {  
  // Initialize the navigate function to allow navigation between pages
  const navigate = useNavigate(); 

  // Handle form submission and navigate to the next page
  const nextPage = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Navigate to the 'attachement' page
    navigate('/attachement');
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
      <form className="proposal-form" onSubmit={nextPage}>
        {/* Include CommitteesSelection component for selecting committees */}
        <CommitteesSelection/>
        
        {/* Include TrusteePerson component for selecting trustee person */}
        <TrusteePerson/>
        
        {/* Include CandidatesTable component to display and manage candidates */}
        <CandidatesTable/>
        
        {/* Include DateAndSig component for handling date and signature */}
        <DateAndSig/>

        {/* Submit button to go to the next page */}
        <button type="submit" className="submit-button">
          Nächste Seite {/* Button text */}
        </button>
      </form>
    </div>
  );
};
 
// Export the ProposalList component for use in other parts of the app
export default ProposalList; 
