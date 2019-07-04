var express = require('express');
var app = express();
var multer = require('multer');
var cors = require('cors');

app.use(cors());

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/pictures')
  },
  filename: function (req, file, cb) {
    cb(null, "IMG_" + Date.now() )
  }
});

let upload = multer({ storage: storage }).single('file');

app.post('/upload',function(req, res) {
  console.log("inside /upload");
  upload(req, res, err => {
    if (err instanceof multer.MulterError)
      return res.status(500).json(err)
    else if (err)
      return res.status(500).json(err);

  return res.status(200).send(req.file)
  });
});


app.listen(8888, () => console.log("Server listening on 8888 port"));