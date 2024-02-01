import { extname } from 'path';
import { diskStorage } from 'multer';

export const storageConfig = () =>
  diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

//Photos
export const fileFilterConfig = (req, file, cb) => {
  const extension = extname(file.originalname);
  const allowedExtensions = ['.jpg', '.png', '.jpeg', '.PNG', '.jfif', '.webp'];

  if (!allowedExtensions.includes(extension)) {
    req.fileValidationError = `Wrong extension type. Accepted file extensions are: ${allowedExtensions.join(', ')}.`;
    return cb(new Error(req.fileValidationError), false);
  }

  cb(null, true);
};
