const multer = require("multer");
const path = require("path");

let up = {};
up.imageUploader = (folder) => {
    let storage = multer.diskStorage({
        destination: `./files/${folder}`,
        filename: function (req, file, cb) {
            cb(
                null,
                file.fieldname + "_" + Date.now() + path.extname(file.originalname)
            );
        },
    });
    return (upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            const ext = path.extname(file.originalname);
            if (
                ext !== ".png" &&
                ext !== ".jpg" &&
                ext !== ".jpeg" &&
                ext !== ".gif"
            ) {
                return callback(new Error("Only PNG, JPG, JPEG, GIF are allowed"), false)
                return callback(
                    null,
                    false,

                );
            }
            callback(null, true);
        },
    }).single(`${folder}`));
};

up.videoUploader = (folder) => {
    let storage = multer.diskStorage({
        destination: `./files/${folder}`,
        filename: function (req, file, cb) {
            cb(
                null,
                file.fieldname + "_" + Date.now() + path.extname(file.originalname)
            );
        },
    });
    return (upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            const ext = path.extname(file.originalname);
            if (ext !== ".mp4") {
                return callback(null, false, new Error("Only MP4 is allowed"));
            }
            callback(null, true);
        },
    }).single(`${folder}`));
};

up.anyUploader = (folder) => {
    let storage = multer.diskStorage({
        destination: `./files/${folder}`,
        filename: function (req, file, cb) {
            cb(
                null,
                file.fieldname + "_" + Date.now() + path.extname(file.originalname)
            );
        },
    });
    return (upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            const ext = path.extname(file.originalname);
            if (
                ext !== ".png" &&
                ext !== ".jpg" &&
                ext !== ".jpeg" &&
                ext !== ".gif" &&
                ext !== ".pdf" &&
                ext !== ".mp4" &&
                ext !== ".mp3"
            ) {
                return callback(
                    null,
                    false,
                    new Error("Only PNG, JPG, JPEG, GIF, MP4, MP3, PDF are allowed")
                );
            }
            callback(null, true);
        },
    }).single(`${folder}`));
};

up.fileUploader = (folder) => {
    let storage = multer.diskStorage({
        destination: `./files/${folder}`,
        filename: function (req, file, cb) {
            cb(
                null,
                file.fieldname + "_" + Date.now() + path.extname(file.originalname)
            );
        },
    });
    return (upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            const ext = path.extname(file.originalname);
            if (
                ext != ".png" &&
                ext != ".jpg" &&
                ext != ".jpeg" &&
                ext != ".gif" &&
                ext != ".pdf" &&
                ext != ".mp3" &&
                ext != ".mp4" &&
                ext != ".mkv" &&
                ext != ".ogg" &&
                ext != ".bmp" &&
                ext != ".m4a" &&
                ext != ".doc" &&
                ext != ".docx"
            ) {
                return callback(
                    null,
                    false,
                    new Error(
                        "Only PNG, JPG, JPEG, GIF, PDF, MP3, MP4, OGG, BMP, M4A are allowed"
                    )
                );
            }
            callback(null, true);
        },
    }).single(`${folder}`));
};

module.exports = up;
