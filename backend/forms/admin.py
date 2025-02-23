from django.contrib import admin
from .models import ElectionOffice, TrustedPerson, NominationList, Candidate, Consent

admin.site.site_header = "Election Management Admin"
admin.site.site_title = "Election Admin Portal"
admin.site.index_title = "Welcome to the Election Admin Panel"

@admin.register(ElectionOffice)
class ElectionOfficeAdmin(admin.ModelAdmin):
    list_display = ('tu_id',)  # Show the unique ID
    search_fields = ('tu_id',)  # Add a search bar

@admin.register(TrustedPerson)
class TrustedPersonAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone', 'fb_sb')
    search_fields = ('first_name', 'last_name', 'email', 'fb_sb')
    list_filter = ('fb_sb',)

@admin.register(NominationList)
class NominationListAdmin(admin.ModelAdmin):
    list_display = ('semester', 'semester_year', 'committee', 'trusted_person', 'number_of_candidates')
    search_fields = ('semester', 'semester_year', 'committee')
    list_filter = ('semester', 'committee', 'election_office')

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'birth_year', 'fb_sb', 'matr_number', 'nomination_list')
    search_fields = ('first_name', 'last_name', 'matr_number')
    list_filter = ('fb_sb', 'nomination_list')

@admin.register(Consent)
class ConsentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'committee', 'semester', 'semester_year', 'candidate')
    search_fields = ('first_name', 'last_name', 'committee', 'semester_year')
    list_filter = ('semester', 'committee', 'semester_year')
