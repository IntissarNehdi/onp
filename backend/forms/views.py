from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Consent, NominationList
from .serializers import ConsentSerializer, NominationListSerializer
from django.http import HttpResponse
from django.shortcuts import get_object_or_404


def download_consent_pdf(request, consent_id):
    return None


# Handles HTTP POST requests to create a new Consent record
class ConsentView(APIView):
    """
    API view for managing Consent records.

    Methods:
        - post: Accepts data from the client to create a new Consent entry 
          by validating and saving it through the ConsentSerializer.

    Workflow:
        1. The POST request sends data to this view.
        2. Data is validated through the ConsentSerializer.
        3. If valid, the data is saved, and the created object is returned with 
           a 201 CREATED status.
        4. If invalid, validation errors are returned with a 400 BAD REQUEST status.
    """
    def post(self, request):
        # Initialize the serializer with the request data
        serializer = ConsentSerializer(data= request.data) # Process the incoming form data
        if serializer.is_valid():  # Check if the data is valid
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

# Handles HTTP POST requests to create a new NominationList record
class NominationListView(APIView):
    """
    API view for managing NominationList records and their related objects.

    Methods:
        - post: Accepts data from the client to create a new NominationList entry,
          including nested TrustedPerson and Candidate objects.

    Workflow:
        1. The POST request sends data to this view, including:
           - NominationList details
           - TrustedPerson data
           - Candidate data (optional)
        2. Data is validated through the NominationListSerializer, which also 
           handles nested TrustedPerson and Candidate objects.
        3. If valid, the entire structure is saved:
           - NominationList
           - TrustedPerson (linked to the NominationList)
           - Candidates (linked to the NominationList)
        4. If invalid, validation errors are returned with a 400 BAD REQUEST status.
    """
    def post(self, request):
        serializer = NominationListSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
