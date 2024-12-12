export const fetchTranscript = async (videoUrl) => {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/video/api/";
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ video_url: videoUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch transcript");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
