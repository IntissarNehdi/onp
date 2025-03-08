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
    name = models.CharField(max_length=255)
    fb_sb_wf = models.CharField(max_length=255) # Fachbereich oder Studienbereich 
    address = models.CharField(max_length=255)
    email = models.EmailField(max_length=320)
    phone = models.CharField(max_length=30)
    
    def __str__(self):
	    return self.name


class NominationList(models.Model):
    """
    Represents a nomination list submitted for an election. Each list is associated 
    with a trusted person.
    """
    SEMESTER_CHOICES = [
        ('WS', 'Winter semester'),
        ('SS', 'Summer semester'),
    ]
    #SHARE_CHOICES = [ ('1', 'Considered'), # Anteil berücksichtigt  ('0', 'Not considered'), # Anteil nicht berücksichtigt]

    semester = models.CharField(max_length=2, choices=SEMESTER_CHOICES)
    semester_year = models.CharField(max_length=10)
    committee_fb_sb_wf = models.CharField(max_length=400) # Gremium
    #fb_sb_wf = models.CharField(max_length=255, blank=True, null=True) # Fachbereich oder Studienbereich
    list_password = models.CharField(max_length=255) # Kennwort der Liste
    number_of_candidates = models.IntegerField()
    date = models.DateField()
    consideration_justification = models.TextField(blank=True, null=True) # Berücksichtigung des Anteils mit Begründung falls nicht berücksichtigt
    #consideration = models.CharField(max_length=1, choices=SHARE_CHOICES) # Berücksichtigung des Anteils
    #justification = models.TextField(blank=True, null=True) # Begründung falls nicht berücksichtigt
    
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
    address = models.CharField(max_length=255) 
    semester_address = models.CharField(max_length=255) 
    
    list_password = models.CharField(max_length=255) # Kennwort der Liste
    fb_sb_label = models.CharField(max_length=255) 
    semester = models.CharField(max_length=2, choices=SEMESTER_CHOICES)
    semester_year = models.CharField(max_length=10)
    committee = models.CharField(max_length=255, blank=True, null=True) # Gremium
    date = models.DateField()

    def __str__(self):
	    return self.first_name + ' ' + self.last_name + ' ' + self.committee + ' ' + self.semester_year
	    
