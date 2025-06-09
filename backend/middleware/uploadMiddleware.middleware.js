import multer from "multer";

// Configure storage
const storage = multer.diskStorage({
  // Image save path
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // Create image name
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter file
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]; // Allowed file types

  // Check if file mime type is correct
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg .png .jpeg formats are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
