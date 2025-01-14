from django.contrib import admin
from .models import ElectionOffice, TrustedPerson, NominationList, Candidate, Consent

admin.site.register(ElectionOffice)

admin.site.register(TrustedPerson)

admin.site.register(NominationList)

admin.site.register(Candidate)

admin.site.register(Consent)