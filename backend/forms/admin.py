from django.http import HttpResponse
from django.template.loader import render_to_string
from xhtml2pdf import pisa
from django.urls import path
from django.contrib import admin
from .models import ElectionOffice, TrustedPerson, NominationList, Candidate, Consent
from django.urls import reverse
from django.utils.html import format_html
from .services import download_pdf


admin.site.site_header = "Election Management Admin"
admin.site.site_title = "Election Admin Portal"
admin.site.index_title = "Welcome to the Election Admin Panel"

@admin.register(ElectionOffice)
class ElectionOfficeAdmin(admin.ModelAdmin):
    list_display = ('tu_id',)  # Show the unique ID
    search_fields = ('tu_id',)  # Add a search bar

    def each_context(self, request):
        context = super().each_context(request)
        context['custom_admin_css'] = 'admin/css/custom_admin.css'
        return context

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
        custom_urls = [
            path('<int:object_id>/download-pdf/', self.admin_site.admin_view(self.download_pdf), name='consent_pdf'),
        ]
        return custom_urls + urls

    def download_pdf(self, request, object_id):
        return download_pdf(self.get_object(request, object_id), request, object_id)
