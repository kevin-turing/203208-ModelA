import fs from 'fs';
import { pipeline } from 'stream/promises';

async function downloadAudio(url: string, filePath: string): Promise<void> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  const fileStream = fs.createWriteStream(filePath);

  await pipeline(response.body as any, fileStream);
}

downloadAudio('https://example.com/audio.mp3', 'audio.mp3')
  .then(() => console.log('Audio downloaded successfully!'))
  .catch((error) => console.error('Error downloading audio:', error));
