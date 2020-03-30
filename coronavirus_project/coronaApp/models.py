from django.db import models
from django.contrib.auth.models import User
from coreApp.models import BaseModel

# Create your models here.
class TypeUser(BaseModel):
    libelle = models.CharField(max_length=255, help_text="le libelle du type utilisateur", blank=True, null=True)

    def __str__(self):
        return self.libelle

class Classification(BaseModel):
    libelle = models.CharField(max_length=255, help_text="le libelle classification", blank=True, null=True)

    def __str__(self):
        return self.libelle

class Maladie(BaseModel):
    libelle = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.libelle

class Profile(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name="user_profile")
    numero = models.CharField(max_length=255, blank=True, null=True)
    localisation = models.CharField(max_length=255, blank=True, null=True)
    sexe = models.CharField(max_length=255, help_text="M/F", blank=True, null=True)
    type_user = models.ForeignKey(TypeUser, null=True, on_delete=models.CASCADE)
    classe = models.ForeignKey(Classification, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class InformationAdittionnelle(BaseModel):
    libelle = models.CharField(max_length=255, blank=True, null=True)

class ReponseAdittionnelle(BaseModel):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    question = models.ForeignKey(InformationAdittionnelle, null=True, on_delete=models.CASCADE)
    valeur = models.CharField(max_length=255, blank=True, null=True)

class TypeReponse(BaseModel):
    libelle = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.libelle

class Question(BaseModel):
    numero = models.CharField(max_length=255, help_text="Id du symptome auquel la question est liée.", blank=True, null=True)
    libelle = models.CharField(max_length=255, help_text="le libelle question", blank=True, null=True)
    #type_reponse = models.ForeignKey(TypeReponse, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.libelle


class Symptome(BaseModel):
    libelle = models.CharField(max_length=255, help_text="le libelle symptome", blank=True, null=True)
    question = models.ForeignKey(Question, null=True, on_delete=models.CASCADE)
    maladie = models.ForeignKey(Maladie, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.libelle

class Reponse(BaseModel):
    numero = models.IntegerField()
    libelle = models.CharField(max_length=255, help_text="le libelle reponse", blank=True, null=True)

    def __str__(self):
        return self.libelle

class Analyse(BaseModel):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    maladie = models.ForeignKey(Maladie, null=True, on_delete=models.CASCADE)
    # classification = models.ForeignKey(Classification, null=True, on_delete=models.CASCADE)


class Choix(BaseModel):
    analyse = models.ForeignKey(Analyse, null=True, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, null=True, on_delete=models.CASCADE)
    #reponse = models.ForeignKey(Reponse, null=True, on_delete=models.CASCADE)
    valeur = models.CharField(max_length=255, blank=True, null=True)

class TypeMedia(BaseModel):
    numero = models.IntegerField()
    libelle = models.CharField(max_length=255,  blank=True, null=True)

class Media(BaseModel):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    url = models.CharField(max_length=255,  blank=True, null=True)
    type_media = models.ForeignKey(TypeMedia, null=True, on_delete=models.CASCADE)


class TypeConsigne(BaseModel):
    libelle = models.CharField(max_length=255, blank=True, null=True)

class Consigne(BaseModel):
    type_consigne =  models.ForeignKey(TypeConsigne, null=True, on_delete=models.CASCADE)
    maladie = models.ForeignKey(Maladie, null=True, on_delete=models.CASCADE)
    libelle = models.CharField(max_length=255, blank=True, null=True)
    explication = models.CharField(max_length=255, blank=True, null=True)