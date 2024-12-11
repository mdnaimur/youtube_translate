from django.urls import path

from video_translate.views import YouTubeTranscriptView


urlpatterns = [
    # path('', index, name="index"),
    path('api/', YouTubeTranscriptView.as_view(), name='youtube-transcipt'),

]
