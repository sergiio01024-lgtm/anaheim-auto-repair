import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('public/photos', { recursive: true });

const photos = [
  { name: 'luke-van.jpg', url: 'https://s3-media0.fl.yelpcdn.com/bphoto/Fg8HqnCw9bDDlX8BqU1qhQ/o.jpg' },
  { name: 'luke-commercial.jpg', url: 'https://s3-media0.fl.yelpcdn.com/bphoto/3Qn0oEMCj0FDFqDvBkRVoA/o.jpg' },
  { name: 'panel-work.jpg', url: 'https://s3-media0.fl.yelpcdn.com/bphoto/U0q3DcFQ3QXxMvYd7eEFoQ/o.jpg' },
  { name: 'lighting.jpg', url: 'https://s3-media0.fl.yelpcdn.com/bphoto/tS3R_KBDrW7MIFX0BfN9tQ/o.jpg' },
  { name: 'kitchen.jpg', url: 'https://s3-media0.fl.yelpcdn.com/bphoto/vX2G_yGWLJaqXCn_FdEK5A/o.jpg' },
  { name: 'panel2.jpg', url: 'https://s3-media0.fl.yelpcdn.com/bphoto/nPO7NG9uxl_g5TJ7ADrCXQ/o.jpg' },
];

for (const photo of photos) {
  try {
    const res = await fetch(photo.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.yelp.com/'
      }
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const buffer = await res.arrayBuffer();
    writeFileSync(`public/photos/${photo.name}`, Buffer.from(buffer));
    console.log(`Downloaded: ${photo.name} (${buffer.byteLength} bytes)`);
  } catch (error) {
    console.error(`Failed to download ${photo.name}:`, error.message);
  }
}
