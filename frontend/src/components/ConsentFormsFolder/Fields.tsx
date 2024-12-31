import React, { useState } from 'react';
import './ConsentForm.css';

const Fields: React.FC = () => {
  const WAHLFACHSCHAFT_OPTION=[
    { value: "Psychologie", label: "Wahlfachschaft Psychologie" },
    { value: "BEdMEd", label: "Wahlfachschaft B.Ed. und M.Ed." },
    { value: "18IST", label: "Wahlfachschaft 18-IST" },
    { value: "MedTec", label: "Wahlfachschaft MedTec" },
    { value: "LaG", label: "Wahlfachschaft LaG" },
    { value: "Sportwissenschaft", label: "Wahlfachschaft Sportwissenschaft" }]
  
  const STUDIENBEREICH_OPTIONS = [
    { value: "CE", label: "CE – Computational Engineering" },
    { value: "ESE", label: "ESE – Energy Science and Engineering" },
    { value: "Mechanik", label: "Mechanik" },
    { value: "Mechatronik", label: "Mechatronik" }
  ];
  
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
    { value: "20", label: "20 – Informatik" }];
  const allOptions = [...WAHLFACHSCHAFT_OPTION, ...STUDIENBEREICH_OPTIONS, ...FACHSCHAFT_OPTIONS];

    const [selectedFbSb, setSelectedFbSb] = useState<string>("");
    
      const handleFbSbChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFbSb(e.target.value);
    };

    return(
        <div className="form-section">
                  <label>Studienbereichsbezeichnung:</label>
                  <label htmlFor="fbSb" style={{ textAlign: 'left' }}>FB Nr./SB</label>
                  <select
                    id="fbSb"
                    value={selectedFbSb}
                    onChange={handleFbSbChange} 
                    required
                    style={{ width: '100%' }}
                  >
                    <option value="" disabled>Bitte wählen</option>
                    {allOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
    );
};
export default Fields;