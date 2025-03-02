from urllib.parse import urlencode
from django.core.mail import send_mail
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt


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
                    query_params = urlencode({'committee': selectedCommittee})
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

