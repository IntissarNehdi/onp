from rest_framework import serializers
from .models import Consent, NominationList, Candidate, TrustedPerson, ElectionOffice

# Serialize and deserialize data between Python objects and JSON format
# A serializer performs the following:
# - Field validation: Ensures data integrity (e.g., names are not empty, emails are valid).
# - Data conversion: Converts JSON or HTML form data into Python objects and vice versa.
# - Error handling: Returns validation errors for invalid data.

class TrustedPersonSerializer(serializers.ModelSerializer):
    """
    Serializer for the TrustedPerson model.
    """
    class Meta:
        model = TrustedPerson
        fields = '__all__' 


class CandidateSerializer(serializers.ModelSerializer):
    """
    Serializer for the Candidate model.
    """
    # Wird nur vom Code gesetzt, nicht erwartet bei der Validierung
    nomination_list = serializers.PrimaryKeyRelatedField(read_only=True)  
    class Meta:
        model = Candidate
        fields = '__all__' 


class ConsentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Consent model.
    """
    class Meta:
        model = Consent
        fields = '__all__'

    def validate(self, data):
        """
        Custom validation method to ensure uniqueness of consent submissions.
        """
        if Consent.objects.filter(
            matr_number=data['matr_number'],
            committee=data['committee'],
            semester=data['semester'],
            semester_year=data['semester_year']
        ).exists():
            raise serializers.ValidationError(
                "This candidate has already submitted consent for this nomination context."
            )
        return data

    def create(self, validated_data):
        """
        Handles the creation of a Consent instance.
        """
        consent = Consent.objects.create(**validated_data)
        return consent


class NominationListSerializer(serializers.ModelSerializer):
    """
    Serializer for the NominationList model.

    This serializer handles the nested representation and processing of related models:
    - `TrustedPerson`: Serialized and created or retrieved as part of the nomination list.
    - `Candidates`: Serialized as a list and linked to the nomination list.
    """
    trusted_person = TrustedPersonSerializer() # TrustedPerson as a nested serializer

    candidates = CandidateSerializer(many=True, required=False) # Candidates as a nested serializer

    class Meta:
        model = NominationList
        fields = '__all__' 

    def create(self, validated_data):
        """
        Custom creation method to handle nested data.

        Steps:
        1. Extract `trusted_person` data and either retrieve an existing TrustedPerson 
           instance or create a new one using `get_or_create`.
        2. Extract `candidates` data (if provided) and temporarily remove it from the 
           validated data to process separately.
        3. Create the `NominationList` object and associate it with the retrieved or 
           newly created `TrustedPerson`.
        4. Iterate over the candidates, link them to the created `NominationList`, and 
           save them to the database.
        """        
        # Extract and handle TrustedPerson data
        trusted_person_data = validated_data.pop('trusted_person')

        # Check if the TrustedPerson exists or create a new one
        trusted_person, created = TrustedPerson.objects.get_or_create(
            first_name=trusted_person_data['first_name'],
            last_name=trusted_person_data['last_name'],
            fb_sb=trusted_person_data['fb_sb'],
            email=trusted_person_data['email'],
            defaults={
                "address_zip": trusted_person_data['address_zip'],
                "address_city": trusted_person_data['address_city'],
                "address_street": trusted_person_data['address_street'],
                "address_additional": trusted_person_data.get('address_additional', ''),
                "phone": trusted_person_data['phone']
            }
        )
 
        # Extract and handle candidates data
        candidates_data = validated_data.pop('candidates', [])  
        
        # Create the NominationList object and associate it with the TrustedPerson
        nomination_list = NominationList.objects.create(trusted_person=trusted_person, **validated_data)

        # Iterate through candidates data and link each to the NominationList
        for candidate_data in candidates_data:
            # Ensure the nomination list is correctly set for each candidate
            candidate_data['nomination_list'] = nomination_list
            Candidate.objects.create(**candidate_data)

        return nomination_list

