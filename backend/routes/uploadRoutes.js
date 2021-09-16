import express from 'express';
const router = express.Router();

import path from path;
import multer from 'multer';

// null - for the ERROR in cb

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.
            originalname)}`)
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) // -> true or false
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true) // null for error
    } else {
        cb('Images only, please!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

// /api/upload/...

// upload.single - only 1 file
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router;