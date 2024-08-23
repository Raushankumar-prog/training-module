
import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';

const VideoPlayer = ({ videoUrl, onVideoProgress }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: 'auto',
    });

    playerRef.current.on('timeupdate', () => {
      const currentTime = playerRef.current.currentTime();
      onVideoProgress(currentTime);
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoUrl]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin" controls>
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
