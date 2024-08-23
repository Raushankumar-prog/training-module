// src/services/api.js
const BASE_URL = 'http://localhost:5000';

export const getVideos = async () => {
  const response = await fetch(`${BASE_URL}/api/videos`);
  return response.json();
};

export const getUserProgress = async () => {
  const response = await fetch(`${BASE_URL}/api/progress`);
  return response.json();
};

export const getVideo = async (videoId) => {
  const response = await fetch(`${BASE_URL}/api/videos/${videoId}`);
  return response.json();
};

export const updateProgress = async (videoId, currentTime) => {
  await fetch(`${BASE_URL}/api/progress/${videoId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentTime }),
  });
};
