from django.contrib import admin
from django.urls import path, include
from forms.views import send_emails 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('forms/', include('forms.urls')),
    path('send-emails/', send_emails, name='send_email'), 
]
