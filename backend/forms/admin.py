from django.contrib import admin
from .models import ElectionOffice, TrustedPerson, NominationList, Candidate, Consent
from django.urls import reverse
from django.utils.html import format_html


admin.site.site_header = "Election Management Admin"
admin.site.site_title = "Election Admin Portal"
admin.site.index_title = "Welcome to the Election Admin Panel"

@admin.register(ElectionOffice)
class ElectionOfficeAdmin(admin.ModelAdmin):
    list_display = ('tu_id',)  # Show the unique ID
    search_fields = ('tu_id',)  # Add a search bar

@admin.register(TrustedPerson)
class TrustedPersonAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'fb_sb_wf')
    search_fields = ('name', 'email', 'fb_sb_wf')
    list_filter = ('fb_sb_wf',)

@admin.register(NominationList)
class NominationListAdmin(admin.ModelAdmin):
    list_display = ('semester', 'semester_year', 'committee_fb_sb_wf', 'trusted_person', 'number_of_candidates')
    search_fields = ('semester', 'semester_year', 'committee_fb_sb_wf')
    list_filter = ('semester', 'committee_fb_sb_wf', 'election_office')

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'birth_year', 'fb_sb', 'nomination_list')
    search_fields = ('first_name', 'last_name')
    list_filter = ('fb_sb', 'nomination_list')

@admin.register(Consent)
class ConsentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'committee', 'semester', 'semester_year')
    search_fields = ('first_name', 'last_name', 'committee', 'semester_year')
    list_filter = ('semester', 'committee', 'semester_year')

    change_form_template = "admin/backend/consent/change_form.html"

    def get_urls(self):
        urls = super().get_urls()
        return urls  # Keeping it simple since no custom views are added for now
