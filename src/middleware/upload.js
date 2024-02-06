import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "images");
  },

  filename: (req, file, cb) => {
    cb(null, uuidv4() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });
export default upload;
