const express = require("express");
const app = express();
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    console.log( path.join(__dirname, "uploads"))
    cb(null, path.join(__dirname, "uploads"));
    
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.json({});
  console.log("uploaded sucessfully")
});

app.listen(3000, () => {
  console.log("server running succesfully");
});
