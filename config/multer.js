const _bird = require("../utils/messageBird");
const multer = require("multer");
const path = require("path");

// @desc	configure multer
const storage = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "-" + file.originalname + "-" + Date.now() + path.extname(file.originalname));
	}
});

module.exports = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if(file.fieldname === "image"){
			if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
				cb(null, true);
			} else {
				cb(null, false);
				_bird.message("danger", "You can only upload .png, .jpg, .gif and .jpeg files!");
				_bird.message("danger", "Please re-upload the file");
			}
		}else{
			console.log("check multer file");
			throw "Unknow field name";
		}
	}
});