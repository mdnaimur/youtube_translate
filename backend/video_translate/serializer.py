from rest_framework import serializers


class YouTubeTranscriptSerializer(serializers.Serializer):
    video_url = serializers.URLField(
        required=True, help_text="The URL of the YouTube video ")
