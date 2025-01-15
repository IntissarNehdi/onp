import { jsPDF } from "jspdf";

// Utility function to save form data as a PDF
export function saveFormAsPDF(formId: string, fileName: string): void {
    try {
        // Find the form element by its ID
        const formElement = document.getElementById(formId);

        if (!formElement) {
            throw new Error(`Form with ID '${formId}' not found.`);
        }

        // Create a new jsPDF instance
        const pdf = new jsPDF();

        // Get the form content (you can enhance this part for styling and layout)
        const formContent = formElement.outerHTML;

        // Use jsPDF's built-in HTML rendering method
        pdf.html(formContent, {
            callback: function (doc) {
                // Save the PDF file
                doc.save(`${fileName}.pdf`);
            },
            x: 10,
            y: 10,
            html2canvas: {
                scale: 0.5 // Adjust scale for better readability
            }
        });
    } catch (error) {
        console.error("Error saving form as PDF:", error);
    }
}
