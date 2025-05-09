const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    name: 'tractor1.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'tractor2.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'harvester1.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'harvester2.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'plough1.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'plough2.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'seeder1.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'seeder2.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'sprayer1.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'sprayer2.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'cultivator1.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'cultivator2.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'baler1.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'baler2.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'rotavator1.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  },
  {
    name: 'rotavator2.jpg',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, '..', 'client', 'src', 'Pictures', 'market', filename);
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

const downloadAllImages = async () => {
  const marketDir = path.join(__dirname, '..', 'client', 'src', 'Pictures', 'market');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(marketDir)) {
    fs.mkdirSync(marketDir, { recursive: true });
  }

  for (const image of images) {
    try {
      await downloadImage(image.url, image.name);
    } catch (error) {
      console.error(`Error downloading ${image.name}:`, error);
    }
  }
};

downloadAllImages().then(() => {
  console.log('All images downloaded successfully');
}).catch(error => {
  console.error('Error downloading images:', error);
}); 