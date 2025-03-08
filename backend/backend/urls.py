from django.contrib import admin
from django.urls import path, include
from forms.views import send_emails 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/forms/', include('forms.urls')),
    path('api/send-emails/', send_emails, name='send_email'), 
]
