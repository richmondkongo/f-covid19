from django.contrib import admin
from .models import (
    Profile,
    TypeUser,
    Classification,
    InformationAdittionnelle,
    ReponseAdittionnelle,
    Question,
    Reponse,
    TypeMedia,
    Media,
    Choix,
    TypeConsigne,
    Consigne,
    Maladie,
    Analyse,
    TypeReponse,
    Symptome
)

# Register your models here.
admin.site.register(Profile)
admin.site.register(TypeMedia)
admin.site.register(TypeUser)
admin.site.register(Classification)
admin.site.register(InformationAdittionnelle)
admin.site.register(ReponseAdittionnelle)
admin.site.register(Question)
admin.site.register(Reponse)
admin.site.register(Media)
admin.site.register(Choix)
admin.site.register(TypeConsigne)
admin.site.register(Consigne)
admin.site.register(Maladie)
admin.site.register(Analyse)
admin.site.register(TypeReponse)
admin.site.register(Symptome)