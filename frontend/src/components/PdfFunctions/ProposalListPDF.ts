import jsPDF from "jspdf";

export function generatePDF(form1: any, form2: any): void {
  const doc = new jsPDF();
  const margin = 10; // Margin for text placement
  const pageHeight = doc.internal.pageSize.height; // Height of the page
  const lineHeight = 10; // Space between lines
  let yPosition = 20; // Starting Y position
  // Title for the document
  doc.text('Vorschlagsliste: Statusgruppe der Studierenden', margin, yPosition);
  yPosition += 10;
  // Iterate over the object fields and print them
  Object.entries(form1).forEach(([key, value]) => {
    if (key === "Kandidierenden") return;
    const text = `${key}: ${value}`; // to adjust !!!!!!!!!!!!!!!!!!!!!
    
    // Check if the text fits on the current line
    if (doc.getTextWidth(text) + margin * 2 > doc.internal.pageSize.width) {
      // If text overflows, break it into multiple lines (if necessary)
      const lines = doc.splitTextToSize(text, doc.internal.pageSize.width - margin * 2);
      lines.forEach((line: string | string[]) => {
        if (yPosition + lineHeight > pageHeight - margin) {
          // If there's no space left on the page, create a new page
          doc.addPage();
          yPosition = 20; // Reset Y position on the new page
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    } else {
      // If the text fits within the line
      if (yPosition + lineHeight > pageHeight - margin) {
        // If there's no space left on the page, create a new page
        doc.addPage();
        yPosition = 20; // Reset Y position on the new page
      }
      doc.text(text, margin, yPosition);
      yPosition += lineHeight;
    }
    if(key==="Anzahl der Kandidierenden"){
      // Now add the candidates table right after "Anzahl der Kandidierenden"
      const candidates = form1["Kandidierenden"];

      if (candidates.length > 0) {
        const tableX = margin; // X position of the table (left margin)
        let tableY = yPosition + 5; // Starting Y position for the table
        
        // Define column headers and column widths
        const columnWidths = [20, 40, 40, 40, 40]; // Adjust the widths for each column (Nr., Name, Fachbereich, Email, Telefonnummer)
        const columnHeaders = ["Ifd.Nr.", "Nachname", "Vorname", "Geburtsjahr", "FB Nr./SB"];
        
        // Draw the column headers
        columnHeaders.forEach((header, index) => {
          doc.text(header, tableX + columnWidths.slice(0, index).reduce((a, b) => a + b, 0), tableY); // X position adjusts by column widths
        });

        // Draw a horizontal line after the headers
        tableY += lineHeight;
        doc.line(tableX, tableY, tableX + columnWidths.reduce((a, b) => a + b, 0), tableY);

        // Draw each row of candidates
        candidates.forEach((candidate: any, index: number) => {
          tableY += lineHeight;

          // Check if there’s enough space for the row
          if (tableY + lineHeight > pageHeight - margin) {
            doc.addPage(); // If no space left, add a new page
            tableY = 20; // Reset Y position on the new page
          }

          // Draw the candidate data in each column
          const row = [
            index + 1, // Nr.
            candidate.lastName,
            candidate.firstName, // Fachbereich
            candidate.birthYear, // E-Mail
            candidate.fbSb // Telefonnummer
          ];

          row.forEach((value, colIndex) => {
            doc.text(value.toString(), tableX + columnWidths.slice(0, colIndex).reduce((a, b) => a + b, 0), tableY);
          });

          // Draw a horizontal line after each row (optional)
          if (index < candidates.length - 1) {
            doc.line(tableX, tableY + lineHeight / 2, tableX + columnWidths.reduce((a, b) => a + b, 0), tableY + lineHeight / 2);
          }
        });

        // Update yPosition after the table to avoid overlap with other content
        yPosition = tableY + lineHeight + 10; // Adding some extra space after the table
      }
    }
  });

  // Draw signature box and text
  const signatureWidth = 80;
  const signatureHeight = 20;
  const signatureX = margin;
  const signatureY = yPosition; // Adjust position slightly below the "Eigenhändige Unterschrift" text
  doc.rect(signatureX, signatureY, signatureWidth, signatureHeight);
  doc.text('Eigenhändige Unterschrift', margin, signatureY + signatureHeight + 5);
  yPosition += (2*lineHeight+signatureHeight);

  //Attachement form
  doc.addPage(); //add new page
  yPosition=20; // rest y Position
  doc.text('Anlage zur Vorschlagsliste',margin,yPosition);
  yPosition+=lineHeight;
  Object.entries(form2).forEach(([key, value]) => {
    const text = `${key}: ${value}`;
    // Check if the text fits on the current line
    if (doc.getTextWidth(text) + margin * 2 > doc.internal.pageSize.width) {
      // If text overflows, break it into multiple lines (if necessary)
      const lines = doc.splitTextToSize(text, doc.internal.pageSize.width - margin * 2);
      lines.forEach((line: string | string[]) => {
        if (yPosition + lineHeight > pageHeight - margin) {
          // If there's no space left on the page, create a new page
          doc.addPage();
          yPosition = 20; // Reset Y position on the new page
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    } else {
      // If the text fits within the line
      if (yPosition + lineHeight > pageHeight - margin) {
        // If there's no space left on the page, create a new page
        doc.addPage();
        yPosition = 20; // Reset Y position on the new page
      }
      doc.text(text, margin, yPosition);
      yPosition += lineHeight;
    }
  })

  doc.rect(margin, yPosition, signatureWidth, signatureHeight);
  doc.text('Unterschrift der Vertrauensperson', margin, yPosition + signatureHeight + 5);
  // Save the generated PDF
  doc.save('Vorschlagsliste.pdf');
}
