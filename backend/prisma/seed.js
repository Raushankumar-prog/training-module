
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.video.createMany({
    data: [
      { title: 'Video 1', url: 'http://example.com/video1.mp4', duration: 300 },
      { title: 'Video 2', url: 'http://example.com/video2.mp4', duration: 450 },
      { title: 'Video 3', url: 'http://example.com/video3.mp4', duration: 600 },
    ],
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
