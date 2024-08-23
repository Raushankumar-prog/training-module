// backend/index.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/videos', async (req, res) => {
  const videos = await prisma.video.findMany();
  res.json(videos);
});

app.get('/api/videos/:id', async (req, res) => {
  const { id } = req.params;
  const video = await prisma.video.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(video);
});

app.get('/api/progress', async (req, res) => {
  const progress = await prisma.userProgress.findMany({
    where: { userId: 1 }, // Assume single user for simplicity
  });
  const totalProgress = progress.reduce((acc, cur) => acc + cur.progress, 0);
  res.json(totalProgress);
});

app.post('/api/progress/:id', async (req, res) => {
  const { id } = req.params;
  const { currentTime } = req.body;

  await prisma.userProgress.upsert({
    where: { videoId: parseInt(id) },
    update: { progress: currentTime },
    create: {
      videoId: parseInt(id),
      userId: 1, // Assume single user for simplicity
      progress: currentTime,
    },
  });

  res.status(200).json({ message: 'Progress updated' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
