from rest_framework import serializers
from .models import Consent, NominationList, Candidate, TrustedPerson, ElectionOffice

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
                "Eine Einverständniserklärung mit dieser Matrikelnummer, diesem Gremium und diesem Semesterjahr wurde bereits eingereicht. Bitte prüfen Sie Ihre Eingabe."
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
        """        
        # Extract and handle TrustedPerson data
        trusted_person_data = validated_data.pop('trusted_person')

        # Check if the TrustedPerson exists or create a new one
        trusted_person = TrustedPerson.objects.filter(
            name=trusted_person_data['name'],
            fb_sb_wf=trusted_person_data['fb_sb_wf'],
            email=trusted_person_data['email'],
            address=trusted_person_data['address'],
            phone=trusted_person_data['phone']
        ).first()

        # Falls keine exakte Übereinstimmung existiert, erstelle eine neue TrustedPerson
        if not trusted_person:
            trusted_person = TrustedPerson.objects.create(**trusted_person_data)

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

