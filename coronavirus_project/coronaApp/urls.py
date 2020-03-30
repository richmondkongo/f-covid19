from django.urls import path, include
from rest_framework import routers

from .views import (
    UserViewSet,
    ProfileViewSet,
    TypeUserViewSet,
    ClassificationViewSet,
    InfoAddViewSet,
    RepAddViewSet,
    QuestionViewSet,
    ReponseViewSet,
    TypeMediaViewSet,
    MediaViewSet,
    ChoixViewSet,
    TypeConsigneViewSet,
    ConsigneViewSet,
    MaladieViewSet,
    AnalyseViewSet,
    TypeReponseViewSet,
    SymptomeViewSet
)

router = routers.DefaultRouter()

router.register(r'users', UserViewSet, basename='users')
router.register(r'profiles', ProfileViewSet, basename='profiles')
router.register(r'typeusers', TypeUserViewSet, basename='typeusers')
router.register(r'classifications', ClassificationViewSet, basename='classifications')
router.register(r'infoadditionnelles', InfoAddViewSet, basename='infoadditionnelles')
router.register(r'repadditionnelles', RepAddViewSet, basename='repadditionnelles')
router.register(r'questions', QuestionViewSet, basename='questions')
router.register(r'reponses', ReponseViewSet, basename='reponses')
router.register(r'typemedias', TypeMediaViewSet, basename='typemedias')
router.register(r'medias', MediaViewSet, basename='medias')
router.register(r'choixs', ChoixViewSet, basename='choixs')
router.register(r'typeconsignes', TypeConsigneViewSet, basename='typeconsignes')
router.register(r'consignes', ConsigneViewSet, basename='consignes')
router.register(r'maladies', MaladieViewSet, basename='maladies')
router.register(r'analyses', AnalyseViewSet, basename='analyses')
router.register(r'typereponses', TypeReponseViewSet, basename='typereponses')
router.register(r'symptomes', SymptomeViewSet, basename='symptomes')










urlpatterns = [
    path('', include(router.urls)),
]
