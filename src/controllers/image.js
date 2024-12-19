const express = require("express");
const multer = require("multer");

const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/uploads/"); // Temporary folder for uploads
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
  });
const upload = multer({ storage });
const extractPublicIdFromUrl = (imageUrl) => {
  try {
    const url = new URL(imageUrl); // Parse the URL
    const pathname = url.pathname; // Extract the path (e.g., /dlilw5qcv/image/upload/v1734247890/1734247888559.png)

    // Find the "upload" segment and take everything after it
    const segments = pathname.split("/");
    const uploadIndex = segments.indexOf("upload") + 1;

    // Extract the public ID (removing version and file extension)
    const publicIdWithVersion = segments.slice(uploadIndex).join("/");
    const publicId = publicIdWithVersion
      .replace(/^v\d+\//, "")
      .replace(/\.\w+$/, ""); // Remove "v<number>/" and file extension

    return publicId;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

const checkImageExists = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    console.log("Image still exists:", result);
  } catch (error) {
    if (error.http_code === 404) {
      console.log("Image successfully deleted.");
    } else {
      console.error("Error checking image status:", error);
    }
  }
};
//const publicId = '1734247888559';

module.exports = { checkImageExists,extractPublicIdFromUrl,upload};
