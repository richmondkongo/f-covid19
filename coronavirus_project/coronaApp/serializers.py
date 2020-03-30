from rest_framework.serializers import ModelSerializer
from drf_queryfields import QueryFieldsMixin

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

class UserSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProfileSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"

class TypeUserSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = TypeUser
        fields = "__all__"

class ClassificationSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = Classification
        fields = "__all__"

class InfoAddSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = InformationAdittionnelle
        fields = '__all__'

class RepAddSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = ReponseAdittionnelle
        fields = '__all__'

class QuestionSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class ReponseSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = Reponse
        fields = '__all__'

class TypeMediaSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = TypeMedia
        fields = '__all__'

class MediaSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'

class ChoixSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = Choix
        fields = '__all__'

class TypeConsigneSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = TypeConsigne
        fields = '__all__'

class ConsigneSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = Consigne
        fields = '__all__'

class MaladieSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = Maladie
        fields = '__all__'

class AnalyseSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = Analyse
        fields = '__all__'

class TypeReponseSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = TypeReponse
        fields = '__all__'

class SymptomeSerializers(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = Symptome
        fields = '__all__'