import { useState } from 'react'; // Importing the useState hook from React to manage component state
import './Forms.css' // Import the associated CSS file for styling
interface DateField {
  updateDate: (field: 'Darmstadt, den', value: string) => void;
}
// Functional component to handle the date input and signature section
const DateAndSig: React.FC<DateField> = ({ updateDate }) => {
  // State variable to store the selected date, initialized to today's date in ISO format (YYYY-MM-DD)
  const [date, setDate] = useState(() => {
    const today = new Date(); // Get the current date
    const value = today.toISOString().split('T')[0];
    updateDate('Darmstadt, den', value);
    return value; // Format the date as YYYY-MM-DD (ISO format)
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setDate(value);
      updateDate('Darmstadt, den', value);
    };
    
  return (
    <div className="form-container">
        
    {/* Date input section */}
    <div className="date-form-section">
      <label htmlFor="date">Darmstadt, den </label>
      <input
        type="date"  // Date picker input
        id="date"
        name="date"
        value={date}  // Controlled input value set by the state
        onChange={handleDateChange}  // Updates the state when date changes
        required  // Makes the input required
      />
    </div>

    {/* Signature section */}
    <div className="signature-container">
      <div className="signature-area"></div>  {/* Placeholder for signature */}
      <label>Eigenhändige Unterschrift</label>  {/* Label for signature */}
    </div>

  </div>
  );
};

export default DateAndSig; 
