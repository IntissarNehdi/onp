/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from 'jspdf';
import tudaLogo from '../../assets/tuda_logo.jpg';

// Define the function to generate PDF from an object
export function generatePDF(obj: any): void {
  const doc = new jsPDF();
  let counter = 0;
  const margin = 10; // Margin for text placement
  const lineHeight = 10; // Space between lines
  const pageWidth = doc.internal.pageSize.width; // Width of the page
  const pageHeight = doc.internal.pageSize.height; // Height of the page
  let yPosition = 50; // Starting Y position
  
  const logoSrc = tudaLogo;
  const logoWidth = 50; // Set the desired width for the logo
  const logoHeight = 20; // Set the desired height for the logo
  const logoX = pageWidth - margin - logoWidth + 5; // Position logo at right margin
  const logoY = 5; // Position logo near the top
  
  doc.addImage(logoSrc, 'JPEG', logoX, logoY, logoWidth, logoHeight);
  

  // Title settings
  const title = 'Einverständniserklärung';
  const titleFontSize = 16; // Set title font size
  doc.setFont('helvetica', 'bold'); // Set font to bold
  doc.setFontSize(titleFontSize); // Set font size
  doc.setTextColor(64, 127, 244); // Set color to blue (RGB: 0, 0, 255)
  const titleX = pageWidth / 2; // Middle of the page width
  const titleY = logoY + logoHeight - 3; // Position below the logo
  doc.text(title, titleX, titleY, { align: 'center' });

  // Reset text configurations after the title
  doc.setFont('helvetica', 'normal'); // Reset font to normal
  doc.setFontSize(12); // Reset font size to default
  doc.setTextColor(0, 0, 0); // Reset text color to black

  yPosition = titleY + 10; // Update yPosition to continue writing content
  doc.text('Ich,', margin, yPosition);
  yPosition += lineHeight;

  // Iterate over the object fields and print them
  Object.entries(obj).forEach(([key, value]) => {
    const keyText = `${key}: `;
    const valueText = `${value}`;
    const spaceBetweenKeyAndValue = 5; // Space between key and value

    // Function to handle page breaks
    const checkAndAddPage = () => {
      if (yPosition + lineHeight > pageHeight - margin) {
        doc.addPage(); // Add a new page
        yPosition = 20; // Reset Y position on the new page
      }
    };

    if (key === 'Hinweis') {
      doc.setFontSize(10); // Set the smaller font size for the Hinweis value
      // If the key is "Hinweis", handle it separately
      const wrappedHinweis = doc.splitTextToSize(valueText, pageWidth - margin * 3); // Wrap the text to fit the available width
          
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
      doc.text(keyText, rectX + 2, rectY + lineHeight); // Add padding inside the rectangle
    
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
    else if(key==='Kennwort'){
      checkAndAddPage(); // Ensure space before writing the key-value pair
      // Write the key in bold at the default margin
      doc.setFont('helvetica', 'bold');
      doc.text(keyText, pageWidth/2 - doc.getTextWidth(keyText)/2 - doc.getTextWidth(valueText)/2, yPosition);

      doc.setFont('helvetica', 'normal');
      doc.text(valueText, pageWidth/2 + doc.getTextWidth(keyText)/2 - doc.getTextWidth(valueText)/2 + spaceBetweenKeyAndValue , yPosition);
      yPosition+=lineHeight;
    }
    else{
      // Handle regular key-value pairs
      const combinedText = `${keyText}${valueText}`;

      if (doc.getTextWidth(combinedText) + margin * 2 > pageWidth - margin * 2) {
        // If the combined text overflows, split it into multiple lines
        const keyLines = doc.splitTextToSize(keyText, pageWidth - margin * 2);
        const valueLines = doc.splitTextToSize(valueText, pageWidth - margin * 2);

        keyLines.forEach((keyLine: string, index: number) => {
          checkAndAddPage(); // Ensure space before writing each key-value line
          
          // Write the key in bold
          doc.setFont('helvetica', 'bold');
          doc.text(keyLine, margin, yPosition);

          // Write the value in normal font
          if (index < valueLines.length) {
            const valueLine = valueLines[index];
            doc.setFont('helvetica', 'normal');
            doc.text(valueLine, margin + doc.getTextWidth(keyLine) + 2, yPosition);
          }

          yPosition += lineHeight;
          
        });
      } else {
        // If the text fits on one line
        checkAndAddPage(); // Ensure space before writing

        doc.setFont('helvetica', 'bold');
        doc.text(keyText, margin, yPosition);

        doc.setFont('helvetica', 'normal');
        doc.text(valueText, margin + doc.getTextWidth(keyText) + 2 + counter, yPosition);

        yPosition += lineHeight;
        counter+=0.5;
      }
    }

    // Additional specific content handling (e.g., "Studienbereichsbezeichnung:FB Nr./SB")
    if (key === 'Studienbereichsbezeichnung:FB Nr./SB') {
      checkAndAddPage(); // Ensure space before adding this specific line
      doc.text('bin mit meiner Benennung als Bewerber:in der Vorschlagsliste:', pageWidth / 2, yPosition,{ align: 'center' });
      yPosition += lineHeight;
    }
    if(key==='zu'){
      checkAndAddPage();
      doc.text('einverstanden.', margin,yPosition);
      yPosition+=lineHeight;
    }
  });

  
  // Draw the signature box
  const signatureHeight = 20;
  if (yPosition + lineHeight + signatureHeight > pageHeight - margin) {
    doc.addPage(); // Add a new page
    yPosition = 20; // Reset Y position on the new page
  }
  const signatureWidth = 190; // Same width as Django
  const signatureY = yPosition + 5; // Adjust position above text
  
  // Draw a line instead of a box
  doc.line(margin, signatureY, margin + signatureWidth, signatureY);
  
  doc.text('Eigenhändige Unterschrift', margin, signatureY + 5);
  

  // Save the generated PDF
  doc.save('Einverständniserklärung.pdf');
}
