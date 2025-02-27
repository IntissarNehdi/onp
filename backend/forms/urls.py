from django.urls import path
from .views import ConsentView, NominationListView, download_consent_pdf, send_emails

urlpatterns = [
    path('admin/consent/<int:consent_id>/download_pdf/', download_consent_pdf, name='download_consent_pdf'),
    path('consent/', ConsentView.as_view(), name='consent'), # Endpoint for Consent
    path('nomination-list/', NominationListView.as_view(), name='nomination_list'),  # Endpoint for NominationList
    path('send-emails/', send_emails, name='send_emails'),
]
