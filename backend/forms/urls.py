from django.urls import path
from .views import send_emails

urlpatterns = [
    path('send-emails/', send_emails, name='send_emails'),
]
