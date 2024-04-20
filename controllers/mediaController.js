const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const pLimit = require("p-limit");
const app = express();

// Configure multer for multiple files
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Set up Cloudinary configuration
cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});

const mediaController = {
  uploadMedia: upload.array("images", 5), // This initializes middleware to handle multiple file uploads
  handleUpload: async (req, res) => {
    if (!req.files) {
      return res.status(400).send('No files uploaded.');
    }

    const limit = pLimit(5); // Limiting the number of concurrent uploads

    const uploadPromises = req.files.map(file => {
      return limit(() => {
        const uploadStream = cloudinary.uploader.upload_stream({
          folder: "hotels-ng"
        }, (error, result) => {
          if (error) {
            return Promise.reject(error);
          }
          return Promise.resolve(result);
        });

        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        bufferStream.pipe(uploadStream);
      });
    });

    try {
      const uploadResults = await Promise.all(uploadPromises);
      res.json(uploadResults);
    } catch (error) {
      console.log(error);
      res.status(500).send(`Upload failed: ${error.message}`);
    }
  }
};


module.exports = mediaController;