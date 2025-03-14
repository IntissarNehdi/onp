from django.http import HttpResponse
from django.template.loader import render_to_string
from xhtml2pdf import pisa
from django.urls import path
from django.contrib import admin
from .models import ElectionOffice, TrustedPerson, NominationList, Candidate, Consent
from django.urls import reverse
from django.utils.html import format_html    

def download_pdf(object, request, object_id):
        consent = object
        print(consent)
        if not consent:
            return HttpResponse("Consent not found.", status=404)

        # Render the template with the context
        html_string = render_to_string("pdfs/consent_template.html", {"consent": consent})

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="Einverständniserklärung_{consent.matr_number}.pdf"'
    
        # Convert HTML to PDF
        pisa_status = pisa.CreatePDF(html_string, dest=response)
        if pisa_status.err:
            return HttpResponse("Error generating PDF", status=500)
        return response