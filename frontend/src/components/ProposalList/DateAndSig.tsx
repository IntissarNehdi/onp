import { useState } from 'react'; // Importing the useState hook from React to manage component state
import './Forms.css' // Import the associated CSS file for styling

// Functional component to handle the date input and signature section
const DateAndSig = () => {
  // State variable to store the selected date, initialized to today's date in ISO format (YYYY-MM-DD)
  const [date, setDate] = useState(() => {
    const today = new Date(); // Get the current date
    return today.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD (ISO format)
  });

  return (
    <div>
      {/* Section for the date input */}
      <section className="signature-section">
        <label htmlFor="date">Darmstadt, den </label> {/* Label for the date input */}
        <input
          type="date" 
          id="date" 
          name="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
      </section>

      {/* Section for the signature input */}
      <section className="signature-section">
        <label htmlFor="signature">Unterschrift der Vertrauensperson: </label> {/* Label for the signature input */}
        <input
          type="text" 
          id="signature" 
          disabled 
        />
      </section>
    </div>
  );
};

export default DateAndSig; 
