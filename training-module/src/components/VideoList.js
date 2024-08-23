
import React from 'react';
import { Link } from 'react-router-dom';

const VideoList = ({ videos, currentVideoIndex }) => {
  return (
    <ul>
      {videos.map((video, index) => (
        <li key={video.id}>
          {index <= currentVideoIndex ? (
            <Link to={`/video/${video.id}`}>{video.title}</Link>
          ) : (
            <span>{video.title} (Locked)</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default VideoList;
