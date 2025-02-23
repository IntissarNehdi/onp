from django.db import models

class ElectionOffice(models.Model):
    """
    Represents the election office authorized to make changes on the nomination lists.   
    """
    tu_id = models.CharField(max_length=10, primary_key=True) 

    @staticmethod
    def get_default_election_office():
        """
        Returns the default election office instance.
        Raises an exception if the default ElectionOffice does not exist.
        """
        default_tu_id = "12345678"  # Replace with your default TU ID
        try:
            return ElectionOffice.objects.get(tu_id=default_tu_id)
        except ElectionOffice.DoesNotExist:
            raise Exception(f"Default ElectionOffice with TU ID '{default_tu_id}' does not exist.")

    def __str__(self):
	    return self.tu_id


class TrustedPerson(models.Model):
    """
    Represents a person who is trusted for managing nomination lists.
    """
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    fb_sb = models.CharField(max_length=255) # Fachbereich oder Studienbereich 
    address_zip = models.CharField(max_length=10)
    address_city = models.CharField(max_length=100)
    address_street = models.CharField(max_length=100)
    address_additional = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=320)
    phone = models.CharField(max_length=30)
    
    def __str__(self):
	    return self.first_name + ' ' + self.last_name


class NominationList(models.Model):
    """
    Represents a nomination list submitted for an election. Each list is associated 
    with a trusted person.
    """
    SEMESTER_CHOICES = [
        ('WS', 'Winter semester'),
        ('SS', 'Summer semester'),
    ]
    SHARE_CHOICES = [
        ('1', 'Considered'), # Anteil berücksichtigt
        ('0', 'Not considered'), # Anteil nicht berücksichtigt
    ]
    semester = models.CharField(max_length=2, choices=SEMESTER_CHOICES)
    semester_year = models.CharField(max_length=10)
    committee = models.CharField(max_length=255) # Gremium
    
    fb_sb_wf = models.CharField(max_length=255, blank=True, null=True) # Fachbereich, Studienbereich oder Wahlfachschaft

    list_password = models.CharField(max_length=255) # Kennwort der Liste
    number_of_candidates = models.IntegerField()
    date = models.DateField()

    consideration = models.CharField(max_length=1, choices=SHARE_CHOICES) # Berücksichtigung des Anteils
    justification = models.TextField(blank=True, null=True) # Begründung falls nicht berücksichtigt
    
    trusted_person = models.ForeignKey(TrustedPerson, on_delete=models.CASCADE)

    election_office = models.ForeignKey(
            ElectionOffice,
            on_delete=models.CASCADE,
            default=ElectionOffice.get_default_election_office  # Standardwert dynamisch über die Methode gesetzt
        )    
    
    def __str__(self):
	    return self.list_password


class Candidate(models.Model):
    """
    Represents a candidate listed in a nomination list for an election.
    """
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_year = models.IntegerField()
    fb_sb = models.CharField(max_length=255) # Fachbereich Nummer oder Studienbereich
    matr_number = models.IntegerField() # Matrikelnummer
    
    nomination_list = models.ForeignKey(NominationList, on_delete=models.CASCADE)  

    def __str__(self):
	    return self.first_name + ' ' + self.last_name

class Consent(models.Model):
    """
    Represents the consent of a candidate to be included in a nomination list.
    This consent is unique for a candidate, committee, and semester year combination.
    """
    SEMESTER_CHOICES = [
        ('WS', 'Winter semester'),
        ('SS', 'Summer semester'),
    ]
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_year = models.IntegerField()
    email = models.EmailField(max_length=320)
    matr_number = models.IntegerField() # Matrikelnummer
    
    address_zip = models.CharField(max_length=10)
    address_city = models.CharField(max_length=100)
    address_street = models.CharField(max_length=100)
    address_house_number = models.CharField(max_length=20)
    address_additional = models.CharField(max_length=100, blank=True, null=True)
    semester_address_zip = models.CharField(max_length=10, blank=True, null=True)
    semester_address_city = models.CharField(max_length=100, blank=True, null=True)
    semester_address_street = models.CharField(max_length=100, blank=True, null=True)
    semester_address_house_number = models.CharField(max_length=20, blank=True, null=True)
    semester_address_additional = models.CharField(max_length=100, blank=True, null=True)
    
    list_password = models.CharField(max_length=255) # Kennwort der Liste
    fb = models.CharField(max_length=255, blank=True, null=True) # Fachbereich

    sb_label = models.CharField(max_length=255, blank=True, null=True) # studienbereichsbezeichnung
    
    semester = models.CharField(max_length=2, choices=SEMESTER_CHOICES)
    semester_year = models.CharField(max_length=10)
    committee = models.CharField(max_length=255) # Gremium
    date = models.DateField()

    # Meta-Einschränkungen
    class Meta:
        unique_together = ('matr_number', 'committee', 'semester_year')

    def __str__(self):
	    return self.first_name + ' ' + self.last_name + ' ' + self.committee + ' ' + self.semester_year
	    
