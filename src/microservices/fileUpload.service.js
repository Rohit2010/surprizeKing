const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express'); // Assuming you're using express

// Define the maximum size for uploading
const maxSize = 50 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const splitUrl = req.baseUrl.split("/");
    console.log(splitUrl[splitUrl.length - 1]);
    const dir = "uploads/" + splitUrl[splitUrl.length - 1];
    console.log(dir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let fileType = file.originalname.split(".")[1];
    if (fileType.includes("+")) {
      fileType = fileType.split("+")[0];
    }
    cb(null, file.fieldname + "-" + Date.now() + "." + fileType);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /doc|docx|pdf|ppt|pptx|xls|xlsx|mp4|mov|jpeg|jpg|png|gif|svg|csv|swf|mp3|AVI|WMV|flv|ogg|webm|webp|wav/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images & Videos Only!"));
  }
}

module.exports = upload;
