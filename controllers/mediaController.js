const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
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

