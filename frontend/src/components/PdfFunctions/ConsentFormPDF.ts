import { jsPDF } from 'jspdf';

// Define the function to generate PDF from an object
export function generatePDF(obj: any): void {
  const doc = new jsPDF();
  const margin = 10; // Margin for text placement
  const pageHeight = doc.internal.pageSize.height; // Height of the page
  const lineHeight = 10; // Space between lines
  let yPosition = 20; // Starting Y position
  // Title for the document
  doc.text('Einverständniserklärung', margin, yPosition);
  yPosition += 10;
  doc.text('Ich,', margin, yPosition);
  yPosition += 10;
  // Iterate over the object fields and print them
  Object.entries(obj).forEach(([key, value]) => {
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
    if(key==='Studienbereichsbezeichnung:FB Nr./SB'){
      doc.text('bin mit meiner Benennung als Bewerber:in der Vorschlagsliste:', margin,yPosition);
      yPosition+=lineHeight;
    }
    
  });
  const signatureWidth = 80;
  const signatureHeight = 20;
  const signatureX = margin;
  const signatureY = yPosition; // Adjust position slightly below the "Eigenhändige Unterschrift" text
  doc.rect(signatureX, signatureY, signatureWidth, signatureHeight);
  doc.text('Eigenhändige Unterschrift', margin, signatureY + signatureHeight + 5);
 
 // Save the generated PDF
  doc.save('Einverständniserklärung.pdf');
}
