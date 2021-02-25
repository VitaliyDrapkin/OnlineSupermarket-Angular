const multer = require("multer");
const fs = require("fs");

const folderUrl = "http://localhost:3001/upload/";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./upload");
  },
  filename(req, file, cb) {
    cb(
      null,
      Date.now() + file.originalname.substr(file.originalname.length - 5)
    );
  },
});

const upload = multer({ storage: storage }).single("image");

async function uploadFile(request, response) {
  try {
    upload(request, response, function (error) {
      if (error instanceof multer.MulterError) {
        return;
      } else if (error) {
        return;
      } else {
        response.send({
          imgUrl: folderUrl + request.file.filename,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteFile(fileName) {
  fs.unlink(`./upload/${fileName}`, (err) => {
    if (err) console.log(err);
  });
}

function getImageUrlForDB(imgUrl) {
  isLong = imgUrl.startsWith(folderUrl);
  if (isLong) {
    imgUrl = imgUrl.substring(folderUrl.length);
  }
  return imgUrl;
}

function getImageUrlForClient(imgUrl) {
  return folderUrl + imgUrl;
}
module.exports = {
  uploadFile,
  deleteFile,
  getImageUrlForDB,
  getImageUrlForClient,
};
