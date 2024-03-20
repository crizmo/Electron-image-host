const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.post('/upload', express.json(), (req, res) => {
  // The base64 image is stored in req.body.image
  const base64Image = req.body.image;
  const buffer = Buffer.from(base64Image, 'base64');

  // Generate a unique filename for the image
  const filename = `${Date.now()}.png`;
  const filePath = path.join('uploads', filename);

  // Write the image to the file system
  fs.writeFile(filePath, buffer, (error) => {
    if (error) {
      return res.status(500).json({ message: 'Error saving image' });
    }

    const imageUrl = `http://localhost:3000/images/${filename}`;
    res.status(200).json({ message: 'Image uploaded successfully!', url: imageUrl });
  });
});

app.use('/images', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));