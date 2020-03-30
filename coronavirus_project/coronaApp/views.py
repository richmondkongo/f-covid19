from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from django.contrib.auth.models import User

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

from .serializers import (
    UserSerializers,
    ProfileSerializers,
    TypeUserSerializers,
    ClassificationSerializers,
    InfoAddSerializers,
    RepAddSerializers,
    QuestionSerializers,
    ReponseSerializers,
    TypeMediaSerializers,
    MediaSerializers,
    ChoixSerializers,
    TypeConsigneSerializers,
    ConsigneSerializers,
    MaladieSerializers,
    AnalyseSerializers,
    TypeReponseSerializers,
    SymptomeSerializers

)

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username']


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user']

class TypeUserViewSet(viewsets.ModelViewSet):
    queryset = TypeUser.objects.all()
    serializer_class = TypeUserSerializers

class ClassificationViewSet(viewsets.ModelViewSet):
    queryset = Classification.objects.all()
    serializer_class = ClassificationSerializers

class InfoAddViewSet(viewsets.ModelViewSet):
    queryset = InformationAdittionnelle.objects.all()
    serializer_class = InfoAddSerializers

class RepAddViewSet(viewsets.ModelViewSet):
    queryset = ReponseAdittionnelle.objects.all()
    serializer_class = RepAddSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user']


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializers

class ReponseViewSet(viewsets.ModelViewSet):
    queryset = Reponse.objects.all()
    serializer_class = ReponseSerializers

class TypeMediaViewSet(viewsets.ModelViewSet):
    queryset = TypeMedia.objects.all()
    serializer_class = TypeMediaSerializers

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user']

class ChoixViewSet(viewsets.ModelViewSet):
    queryset = Choix.objects.all()
    serializer_class = ChoixSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['analyse']

class TypeConsigneViewSet(viewsets.ModelViewSet):
    queryset = TypeConsigne.objects.all()
    serializer_class = TypeConsigneSerializers

class ConsigneViewSet(viewsets.ModelViewSet):
    queryset = Consigne.objects.all()
    serializer_class = ConsigneSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['maladie']

class MaladieViewSet(viewsets.ModelViewSet):
    queryset = Maladie.objects.all()
    serializer_class = MaladieSerializers


class AnalyseViewSet(viewsets.ModelViewSet):
    queryset = Analyse.objects.all()
    serializer_class = AnalyseSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user']

class TypeReponseViewSet(viewsets.ModelViewSet):
    queryset = TypeReponse.objects.all()
    serializer_class = TypeReponseSerializers

class SymptomeViewSet(viewsets.ModelViewSet):
    queryset = Symptome.objects.all()
    serializer_class = SymptomeSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['maladie']
    filterset_fields = ['question']