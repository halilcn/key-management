import multer from 'multer'

const types = [
    'image/png',
    'image/jpg',
    'image/jpeg'
]

export default multer({
    limits: {
        fileSize: 1024 * 1024,
    },
    dest: 'public/uploads/user-images',
    fileFilter: (req, file, cb) => {
        if (!types.includes(file.mimetype)) {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
        cb(null, true);
    }
});

