import multer from "multer";
import path from 'path';
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
      cb(null, "./src/uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      const extension = path.extname(file.originalname);
      const filename = `${uniqueSuffix}${extension}`;
      cb(null, filename);
  }
 });

const upload = multer({ storage: storage });

export default upload;