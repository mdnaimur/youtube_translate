from django.http import HttpResponse
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, VideoUnavailable
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import re

from video_translate.serializer import YouTubeTranscriptSerializer


class YouTubeTranscriptView(APIView):

    def extract_video_id(self, url):
        pattern = r"(?:v=|/)([0-9A-Za-z_-]{11})"
        match = re.search(pattern, url)
        return match.group(1) if match else None

    def post(self, request, *args, **kwargs):
        serializer = YouTubeTranscriptSerializer(data=request.data)

        if serializer.is_valid():
            video_url = serializer.validated_data['video_url']
            video_id = self.extract_video_id(video_url)

            if not video_id:
                return Response({"error": "Invalid Youtube URL"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                transcript = YouTubeTranscriptApi.get_transcript(
                    video_id, languages=['en', 'bn'])

                return Response({"video_id": video_id, "transcript": transcript}, status=status.HTTP_200_OK)

            except TranscriptsDisabled:
                return Response({"error": "Transcripts are disabled for this video."}, status=status.HTTP_403_FORBIDDEN)
            except VideoUnavailable:
                return Response({"error": "This video is unavailable."}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # If input is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def index(request):
    #     '''
    #     Extracts and displays video transcript information.
    #     '''

    #     # the vide id get from input
    #     # this vide play input also take
    #     #
    #     video_id = 'r0m-iSnbKvc'  # Extracted video ID
    #     try:
    #         # Fetch the transcript for the video
    #         transcript = YouTubeTranscriptApi.get_transcript(
    #             video_id, languages=['en', 'bn'])

    #         # Prepare transcript as a string
    #         print(transcript)
    #         transcript_text = "\n".join(
    #             [f"{item['start']} - {item['text']}" for item in transcript])

    #         # Return as HttpResponse
    #         return HttpResponse(f"<h1>Video Transcript</h1><pre>{transcript_text}</pre>")
    #     except TranscriptsDisabled:
    #         return HttpResponse("<h1>Transcripts are disabled for this video.</h1>")
    #     except VideoUnavailable:
    #         return HttpResponse("<h1>This video is unavailable.</h1>")
    #     except Exception as e:
    #         return HttpResponse(f"<h1>An error occurred:</h1><p>{str(e)}</p>")
