from django.urls import path
from .views import ConsentView, NominationListView

urlpatterns = [
    path('consent/', ConsentView.as_view(), name='consent'), # Endpoint for Consent
    path('nomination-list/', NominationListView.as_view(), name='nomination_list'),  # Endpoint for NominationList
]