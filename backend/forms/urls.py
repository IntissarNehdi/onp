from django.urls import path
from .views import ConsentView, NominationListView, send_emails

urlpatterns = [
    path('consent/', ConsentView.as_view(), name='consent'), 
    path('nomination-list/', NominationListView.as_view(), name='nomination_list'), 
    path('send-emails/', send_emails, name='send_emails'),
]
