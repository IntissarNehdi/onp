from django.shortcuts import render
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def send_emails(request):
    if request.method == 'POST':
        try:
            # Parse JSON request body
            data = json.loads(request.body)
            candidates = data.get('candidates', [])

            # Iterate over candidates to send emails
            for candidate in candidates:
                first_name = candidate.get('firstName', '').strip()
                last_name = candidate.get('lastName', '').strip()

                if first_name and last_name:
                    email = f"{first_name.lower()}.{last_name.lower()}@stud.tu-darmstadt.de"
                    send_mail(
                        subject='Notification',
                        message=f'Hello {first_name} {last_name},\n\nYou have been listed in the proposal.',
                        from_email='tudawahlamt@gmail.com', 
                        recipient_list=[email],
                    )

            return JsonResponse({'message': 'Emails sent successfully!'})
        except Exception as e:
            # Return error message if exception occurs
            return JsonResponse({'error': str(e)}, status=500)

    # If not a POST request, return error
    return JsonResponse({'error': 'Invalid request method'}, status=400)
