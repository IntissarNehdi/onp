import jsPDF from "jspdf";
import tudaLogo from '../../assets/tuda_logo.jpg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generatePDF(form1: any, form2: any): void {
  const doc = new jsPDF();
  const margin = 10; // Margin for text placement
  const pageWidth = doc.internal.pageSize.width; // Width of the page
  const pageHeight = doc.internal.pageSize.height; // Height of the page
  const lineHeight = 10; // Space between lines
  let yPosition = 20; // Starting Y position

  const logoSrc = tudaLogo;
  const logoWidth = 50; // Set the desired width for the logo
  const logoHeight = 20; // Set the desired height for the logo
  const logoX = pageWidth - margin - logoWidth + 5; // Position logo at right margin
  const logoY = 5; // Position logo near the top
  doc.addImage(logoSrc, 'JPEG', logoX, logoY, logoWidth, logoHeight);

  // Title for the document
  const title1 ='Vorschlagsliste:';
  const title2 = 'Statusgruppe der Studierenden';
  const titleFontSize = 16; // Set title font size
  doc.setFont('helvetica', 'bold'); // Set font to bold
  doc.setFontSize(titleFontSize); // Set font size
  doc.setTextColor(64, 127, 244); // Set color to blue (RGB: 0, 0, 255)
  const titleX = pageWidth / 2; // Middle of the page width
  const titleY = logoY + logoHeight; // Position below the logo
  doc.text(title1, titleX, titleY, { align: 'center' });
  yPosition = titleY + 10; // Update yPosition to continue writing content
  doc.text(title2, titleX, yPosition, { align: 'center' });
  yPosition+= 10;

  // Reset text configurations after the title
  doc.setFont('helvetica', 'normal'); // Reset font to normal
  doc.setFontSize(12); // Reset font size to default
  doc.setTextColor(0, 0, 0); // Reset text color to black


  const spaceBetweenKeyAndValue = 5; // Space between key and value
  Object.entries(form1).forEach(([key, value]) => {
    if (key === "Kandidierenden") return;
    const boldKey = `${key}: `; // Bold key
    const normalValue = `${value}`; // Normal value
    
    // Check if the text fits on the current line
    if (doc.getTextWidth(boldKey + normalValue) + margin * 2 > doc.internal.pageSize.width) {
      // If text overflows, break it into multiple lines (if necessary)
      const lines = doc.splitTextToSize(normalValue, doc.internal.pageSize.width - margin * 2 - doc.getTextWidth(boldKey));
      
      if (yPosition + lineHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFont('helvetica', "bold");
      doc.text(boldKey, margin, yPosition);
      
      doc.setFont('helvetica', "normal");
      doc.text(lines[0], margin + doc.getTextWidth(boldKey) + spaceBetweenKeyAndValue, yPosition);
      
      lines.slice(1).forEach((line: string) => {
        yPosition += lineHeight;
        if (yPosition + lineHeight > pageHeight - margin) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin, yPosition);
      });
      
      yPosition += lineHeight;
    } else {
      if (yPosition + lineHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFont('helvetica', "bold");
      doc.text(boldKey, margin, yPosition);
      
      doc.setFont('helvetica', "normal");
      doc.text(normalValue, margin + doc.getTextWidth(boldKey) + spaceBetweenKeyAndValue, yPosition);
      
      yPosition += lineHeight;
    }
    
    if (key === "Anzahl der Kandidierenden") {
      const candidates = form1["Kandidierenden"];
    
      if (candidates.length > 0) {
        const tableX = margin;
        let tableY = yPosition + 10;
        
        const columnWidths = [20, 50, 50, 40, 30]; // Adjusted column widths for better spacing
        const columnHeaders = ["Ifd.Nr.", "Nachname", "Vorname", "Geburtsjahr", "FB Nr./SB"];
        
        // Header row background color
        doc.setFillColor(200, 200, 200); // Light gray background
        doc.rect(tableX, tableY - lineHeight + 2, columnWidths.reduce((a, b) => a + b, 0), lineHeight, 'F');
    
        // Draw column headers
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0); // Black text
        columnHeaders.forEach((header, index) => {
          const xPos = tableX + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
          doc.text(header, xPos + 2, tableY);
        });
    
        // Draw table border line below headers
        tableY += lineHeight;
        doc.setDrawColor(100); // Dark gray for borders
        doc.line(tableX, tableY, tableX + columnWidths.reduce((a, b) => a + b, 0), tableY);
    
        // Draw each row with alternate row coloring
        doc.setFont("helvetica", "normal");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        candidates.forEach((candidate: any, index: number) => {
          if (tableY + lineHeight > pageHeight - margin) {
            doc.addPage();
            tableY = 20;
          }
    
          // Alternate row background color
          if (index % 2 === 0) {
            doc.setFillColor(240, 240, 240); // Light gray for even rows
            doc.rect(tableX, tableY - lineHeight + 2, columnWidths.reduce((a, b) => a + b, 0), lineHeight, 'F');
          }
    
          // Candidate row data
          const row = [
            index + 1,
            candidate.lastName,
            candidate.firstName,
            candidate.birthYear,
            candidate.fbSb
          ];
    
          row.forEach((value, colIndex) => {
            const xPos = tableX + columnWidths.slice(0, colIndex).reduce((a, b) => a + b, 0);
            doc.text(value.toString(), xPos + 2, tableY);
          });
    
          // Draw a separator line between rows
          if (index < candidates.length - 1) {
            doc.setDrawColor(180); // Light gray line
          }
    
          tableY += lineHeight;
        });
    
        yPosition = tableY + 10; // Extra spacing after the table
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
  doc.addImage(logoSrc, 'JPEG', logoX, logoY, logoWidth, logoHeight);//logo 
   // Title for the document
   const title3 ='Anlage zur Vorschlagsliste:';
   doc.setFont('helvetica', 'bold'); // Set font to bold
   doc.setFontSize(titleFontSize); // Set font size
   doc.setTextColor(64, 127, 244); // Set color to blue (RGB: 0, 0, 255)
   yPosition = titleY; // Update yPosition to continue writing content
   doc.text(title3, titleX, yPosition, { align: 'center' });
 
   // Reset text configurations after the title
   doc.setFont('helvetica', 'normal'); // Reset font to normal
   doc.setFontSize(12); // Reset font size to default
   doc.setTextColor(0, 0, 0); // Reset text color to black
   yPosition+=lineHeight;
  Object.entries(form2).forEach(([key, value]) => {

    const boldKey = `${key}: `;
    const normalValue = `${value}`;
    if (key === 'Hinweis') {
      doc.setFontSize(10); // Set the smaller font size for the Hinweis value
      // If the key is "Hinweis", handle it separately
      const wrappedHinweis = doc.splitTextToSize(normalValue, pageWidth - margin * 3); // Wrap the text to fit the available width
          
      // Set the color for the rectangle (gray)
      const rectX = margin;
      const rectY = yPosition;
      const rectWidth = pageWidth - margin * 2; // Width of the rectangle
      const rectHeight = lineHeight/2 * (wrappedHinweis.length) + 2 * lineHeight; // Height of the rectangle, considering the wrapped text
    
      doc.setFillColor(249, 249, 249); // Set the fill color to gray
      doc.setDrawColor(51, 51, 51); // Set the border color to dark gray (#333)
      doc.rect(rectX, rectY, rectWidth, rectHeight, 'FD'); // 'FD' means fill and draw


      doc.setFontSize(12); // Set the smaller font size for the Hinweis value
      // Write the "Hinweis" key in bold inside the rectangle
      doc.setFont('helvetica', 'bold');
      doc.text(boldKey, rectX + 2, rectY + lineHeight); // Add padding inside the rectangle
    
      doc.setFontSize(10); // Set the smaller font size for the Hinweis value
      // Write the wrapped "Hinweis" value inside the rectangle
      doc.setFont('helvetica', 'normal');
      let currentY = rectY + 2*lineHeight; // Start slightly below the key text
      wrappedHinweis.forEach((line: string) => {
        doc.text(line, rectX + 2, currentY); // Add padding inside the rectangle
        currentY += lineHeight/2; // Increase Y position for the next line of text
      });
    
      // Update yPosition to below the rectangle after printing the Hinweis
      yPosition = currentY + 10; // Add some padding below the rectangle
      doc.setFontSize(12);
    }
    else if(key==='Erklärung gemäß § 16 Abs. 2 WahlO'){
      // Set font to bold for the key
      doc.setFont('Helvetica', "bold");
      const keyWidth = doc.getTextWidth(key);
      const centerX = pageWidth / 2 - keyWidth / 2;
      // Center the text and draw an underline
      doc.text(key, pageWidth / 2 - doc.getTextWidth(key) / 2, yPosition);
      doc.line(pageWidth / 2 - doc.getTextWidth(key) / 2, yPosition + 1, centerX + keyWidth, yPosition + 1); // Adjust the `+1` for proper spacing

      yPosition += lineHeight; // Move to next line for the value
      doc.setFont('Helvetica', "normal");
      const wrappedLines = doc.splitTextToSize(normalValue, doc.internal.pageSize.width - margin * 2);
      
      // Iterate over wrapped lines to check for page breaks and add text accordingly
      wrappedLines.forEach((line: string) => {
        if (yPosition + lineHeight > pageHeight - margin) {
          doc.addPage(); // Add new page if needed
          yPosition = 20;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    }
    else{
      // Check if the key-value pair exceeds page width and needs wrapping
      if (doc.getTextWidth(boldKey + normalValue) + margin * 2 > doc.internal.pageSize.width) {
        const lines = doc.splitTextToSize(normalValue, doc.internal.pageSize.width - margin * 2 - doc.getTextWidth(boldKey));
        
        if (yPosition + lineHeight > pageHeight - margin) {
          doc.addPage(); // Add new page if necessary
          yPosition = 20;
        }
        
        // Print the key in bold
        doc.setFont('Helvetica', "bold");
        doc.text(boldKey, margin, yPosition);
        
        // Print the first line of the wrapped value on the same line as the key
        doc.setFont('Helvetica', "normal");
        doc.text(lines[0], margin + doc.getTextWidth(boldKey) + spaceBetweenKeyAndValue, yPosition);
        
        // Print remaining wrapped lines below
        lines.slice(1).forEach((line: string) => {
          yPosition += lineHeight;
          if (yPosition + lineHeight > pageHeight - margin) {
            doc.addPage(); // Add a new page if needed
            yPosition = 20;
          }
          doc.text(line, margin, yPosition);
        });
        
        yPosition += lineHeight;
      } else {
        // If the key-value pair fits on one line, print normally
        if (yPosition + lineHeight > pageHeight - margin) {
          doc.addPage(); // Add a new page if needed
          yPosition = 20;
        }
        
        doc.setFont('Helvetica', "bold");
        doc.text(boldKey, margin, yPosition);
        
        doc.setFont('Helvetica', "normal");
        doc.text(normalValue, margin + doc.getTextWidth(boldKey) + spaceBetweenKeyAndValue, yPosition);
        
        yPosition += lineHeight;
      }
    }
  });


  doc.rect(margin, yPosition, signatureWidth, signatureHeight);
  doc.text('Unterschrift der Vertrauensperson', margin, yPosition + signatureHeight + 5);
  // Save the generated PDF
  doc.save('Vorschlagsliste.pdf');
}
