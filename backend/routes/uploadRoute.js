const express = require('express');
const multer = require("multer");
const {uploadFile} = require('../controller/uploadController');
const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload-xml-file",upload.single("file"), uploadFile);

module.exports = router;