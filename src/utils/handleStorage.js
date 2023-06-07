const multer = require('multer');



const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage)
    },

    filename: function (req, file, cb) {
        // mi-cv.png .jpg .mp4 .mp3 extencion

        const ext = file.originalname.split('.').pop()
        const filename = `file-${Date.now()}.${ext}`; //file-23412312312.png  .mp4 .jpg
        cb(null, filename)
    },

});
const uploadMiddleware = multer({ storage });


module.exports = uploadMiddleware