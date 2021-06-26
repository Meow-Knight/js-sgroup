import multer from 'multer';
import path from  'path';

export default multer ({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jqg" && ext !== ".jqeg" && ext !== ".png"){
            cb(null, false);
            return;
        }

        cb(null, true);
    }
});