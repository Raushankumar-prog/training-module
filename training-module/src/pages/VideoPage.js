
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { getVideo, updateProgress } from '../services/api';

const VideoPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      const videoData = await getVideo(videoId);
      setVideo(videoData);
    }
    fetchVideo();
  }, [videoId]);

  const handleProgress = async (currentTime) => {
    await updateProgress(videoId, currentTime);
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <VideoPlayer videoUrl={video.url} onVideoProgress={handleProgress} />
    </div>
  );
};

export default VideoPage;
