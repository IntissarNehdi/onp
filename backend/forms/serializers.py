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

    This serializer handles the conversion of TrustedPerson model data
    to and from JSON or Python objects for API interactions.
    """
    class Meta:
        model = TrustedPerson
        fields = '__all__' 


class CandidateSerializer(serializers.ModelSerializer):
    """
    Serializer for the Candidate model.

    Handles the representation of candidates and their relationships,
    including validation and serialization logic.

    Fields:
        - `nomination_list`: A read-only field linked to the nomination list.
    """
    # Wird nur vom Code gesetzt, nicht erwartet bei der Validierung
    nomination_list = serializers.PrimaryKeyRelatedField(read_only=True)  
    class Meta:
        model = Candidate
        fields = '__all__' 


class ConsentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Consent model.

    Ensures that a candidate cannot submit consent multiple times for the same
    committee, semester, and semester year.
    """
    class Meta:
        model = Consent
        fields = '__all__'

    def validate(self, data):
        """
        Custom validation method to ensure uniqueness of consent submissions.

        Checks if a candidate with the same `matr_number` has already submitted
        consent for the specified committee, semester, and semester year.
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

    Fields:
        - `trusted_person`: Uses a nested serializer (TrustedPersonSerializer) to represent the trusted person.
        - `candidates`: Uses a nested serializer (CandidateSerializer) to represent multiple candidates.

    Methods:
        - `create`: Handles the creation of a `NominationList` along with related `TrustedPerson` and `Candidates`.

    Usage:
        This serializer is designed to handle complex data structures for the creation of a 
        `NominationList`, including associated nested objects. It ensures data integrity 
        through validations and relationships.
    """
    # TrustedPerson as a nested serializer
    trusted_person = TrustedPersonSerializer()

    # Candidates as a nested serializer
    candidates = CandidateSerializer(many=True, required=False)   # Allows multiple candidates (optional)

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

        Args:
            validated_data (dict): Validated data from the request, including nested fields.

        Returns:
            NominationList: The created NominationList instance, along with its related objects.
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

