from urllib.parse import urlencode
from django.core.mail import send_mail
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Consent, NominationList
from .serializers import ConsentSerializer, NominationListSerializer
from django.http import HttpResponse
from django.shortcuts import get_object_or_404


@csrf_exempt
def send_emails(request):
    # Handle POST requests for sending emails
    if request.method == 'POST':
        try:
            # Parse the JSON request body
            data = json.loads(request.body.decode("utf-8"))
            candidates = data.get('candidates', [])  # Get the list of candidates
            selectedCommittee = data.get('selectedCommittee', "").strip()  # Get the selected committee
            semesterYear=data.get('semesterYear',"").strip()
            trusteePerson=data.get('trusteePerson',"").strip()
            password=data.get('password',"").strip()
            semester=data.get('semester',"").strip()

            base_url = "http://localhost:3000/consent"  # Base URL for the consent page

            # Iterate through each candidate and send an email
            for candidate in candidates:
                first_name = candidate.get('firstName', '').strip()  # Extract first name
                last_name = candidate.get('lastName', '').strip()  # Extract last name

                if first_name and last_name:
                    # Generate the candidate's email based on TU Darmstadt format
                    email = f"{first_name.lower()}.{last_name.lower()}@stud.tu-darmstadt.de"

                    # Construct the query parameters for the consent link
                    query_params = urlencode({'committee': selectedCommittee,'password':password})
                    consent_link = f"{base_url}?{query_params}"  # Create the full consent link

                    # Send an email to the candidate
                    send_mail(
                        subject='Bestätigung erforderlich: Teilnahme an der Vorschlagsliste.',  # Email subject
                        message=f"""Guten Tag {first_name} {last_name},

Sie wurden für die Hochschulwahlen im {semester} {semesterYear}
von der Vertrauensperson {trusteePerson} der Vorschlagsliste {password} 
zu {selectedCommittee} als kandidierende Person zu der genannten Vorschlagsliste hinzugefügt.
Um Ihr Einverständnis zu Ihrer Kandidatur zu erklären, klicken Sie bitte auf den folgenden Link

{consent_link} 

und füllen Sie die Einverständniserklärung aus.

Mit freundlichen Grüßen,
Ihr Wahlteam
""",  # Email body
                        from_email='tudawahlamt@gmail.com',  # Sender email address
                        recipient_list=[email],  # List of recipients
                        fail_silently=False,  # Raise an error if email sending fails
                    )

            # Return a success response if emails are sent successfully
            return JsonResponse({'message': 'Emails sent successfully!'}, status=200)

        except Exception as e:
            # Return an error response if an exception occurs
            return JsonResponse({'error': str(e)}, status=500)

    # Return an error response for invalid request methods (e.g., GET)
    return JsonResponse({'error': 'Invalid request method'}, status=400)




def download_consent_pdf(request, consent_id):
    return None


# Handles HTTP POST requests to create a new Consent record
class ConsentView(APIView):
    """
    API view for managing Consent records.

    Methods:
        - post: Accepts data from the client to create a new Consent entry 
          by validating and saving it through the ConsentSerializer.

    Workflow:
        1. The POST request sends data to this view.
        2. Data is validated through the ConsentSerializer.
        3. If valid, the data is saved, and the created object is returned with 
           a 201 CREATED status.
        4. If invalid, validation errors are returned with a 400 BAD REQUEST status.
    """
    def post(self, request):
        # Initialize the serializer with the request data
        serializer = ConsentSerializer(data= request.data) # Process the incoming form data
        if serializer.is_valid():  # Check if the data is valid
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

# Handles HTTP POST requests to create a new NominationList record
class NominationListView(APIView):
    """
    API view for managing NominationList records and their related objects.

    Methods:
        - post: Accepts data from the client to create a new NominationList entry,
          including nested TrustedPerson and Candidate objects.

    Workflow:
        1. The POST request sends data to this view, including:
           - NominationList details
           - TrustedPerson data
           - Candidate data (optional)
        2. Data is validated through the NominationListSerializer, which also 
           handles nested TrustedPerson and Candidate objects.
        3. If valid, the entire structure is saved:
           - NominationList
           - TrustedPerson (linked to the NominationList)
           - Candidates (linked to the NominationList)
        4. If invalid, validation errors are returned with a 400 BAD REQUEST status.
    """
    def post(self, request):
        serializer = NominationListSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
