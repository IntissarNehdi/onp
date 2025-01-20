from django.shortcuts import render

from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def send_emails(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            candidates = data.get('candidates', [])
            for candidate in candidates:
                first_name = candidate.get('firstName', '').strip()
                last_name = candidate.get('lastName', '').strip()

                if first_name and last_name:
                    email = f"{first_name.lower()}.{last_name.lower()}@stud.tu-darmstadt.de"
                    send_mail(
                        'Notification',
                        f'Hello {first_name} {last_name},\n\nYou have been listed in the proposal.',
                        'noreply@gmail.com'
                        [email],
                    )
            return JsonResponse({'message': 'Emails sent successfully!'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request'}, status=400)