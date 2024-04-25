const express = require("express");
const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/dbConfig");
const app = express();
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: false,
};
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

let upload = multer({
  storage: storage,
  // limits: {fileSize: 1000000},
});
app.use("/", user_route);
// app.use('/upload', mediaFile);
app.get("/", (req, res) => {
  res.send("Description.");
});
app.post("/upload", upload.single("image", { folder: "hotels-ng" }),
  async (req, res) => {
    try {
      const product_id = '5678'
      const image_id = '1234'
      let items =req.body.file;
      const imagesToUpload = images.map((image) => {
        return (async () => {
          const result = await cloudinary.uploader.upload(image);
          return result;
        })
      });
      
      let uploads = await Promise.all(imagesToUpload);
      console.log(uploads);
      let imagePath = "./uploads/" + req.file.filename;

      const fileName = product_id + _ + image_id;
      console.log('Image name', fileName)
      const byteArrayBuffer = fs.readFileSync('shirt.jpg');
      const uploadResult = await new Promise((resolve) => {
        cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
          return resolve(uploadResult);
        }).end(byteArrayBuffer);
      });
      console.log( "Upload successful! Here's the image url: ", result.secure_url );

      await fs.unlink("./uploads/" + req.file.filename, (err) => {
        if (err) {
          console.error(err);
        }
        console.log("File deleted successfully");
      });
      return res
        .status(200)
        .send({ message: "Upload Successful", result: result.secure_url });
    } catch (err) {
      console.log(err);
    }
  }
);
