const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

mongoose
  .connect("mongodb://localhost:27017/FileUpload")
  .then(() => {
    console.log("connected to mongodb");
    app.listen(3000, () => {
      console.log("server running succesfully");
    });
  })
  .catch(() => console.log("error"));

  const fileSchema = new mongoose.Schema({
    fileName: String,
    fileType: String,
    fileSize: Number,
    filePath: String,
  });

  const File = mongoose.model('File', fileSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.join(__dirname, "uploads"));
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try{
const {originalname, mimetype, size, path} = req.file;
const newFile = new File({
  fileName: originalname,
  fileType: mimetype,
  fileSize: size,
  filePath: path,
});
await newFile.save();
    console.log("uploaded sucessfully and saved to MongoDB");
    res.json({message: "File uploaded successfully"});
  }
 catch(error){
  console.error("Error uploading file:", error);
  res.status(500).json({error: "Internal server Error"});

 }
  
});
