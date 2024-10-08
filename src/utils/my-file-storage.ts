import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination(_req, _file, callback) {
    try {
      mkdirSync('uploads');
    } catch (e) {}

    callback(null, 'uploads');
  },
  filename(_req, file, callback) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    callback(null, uniqueSuffix);
  },
});

export default storage;
