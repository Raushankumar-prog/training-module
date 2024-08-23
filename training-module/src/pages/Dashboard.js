
import React, { useEffect, useState } from 'react';
import VideoList from '../components/VideoList';
import Progress from '../components/Progress';
import { getVideos, getUserProgress } from '../services/api';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const videos = await getVideos();
      const progress = await getUserProgress();
      setVideos(videos);
      setProgress(progress);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Training Dashboard</h1>
      <VideoList videos={videos} currentVideoIndex={Math.floor(progress / 100 * videos.length)} />
      <Progress progress={progress} />
    </div>
  );
};

export default Dashboard;
