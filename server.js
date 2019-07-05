var express = require('express');
var app = express();
var multer = require('multer');
var cors = require('cors');

const Pool = require('pg').Pool;

const pool = new Pool({
  user      : "pictures",
  host      : "localhost",
  database  : "pictures",
  password  : "pictures",
  port      : 5432,
});

app.use(cors());

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/pictures');
  },
  filename: function (req, file, cb) {
    console.log("file info:", file);
    cb(null, file.originalname);
  }
});

let upload = multer({ storage: storage }).single('file');

app.post("/upload", (req, res) => {
  console.log("inside /upload");
  upload(req, res, err => {
    if (err instanceof multer.MulterError)
      return res.status(500).json(err)
    else if (err)
      return res.status(500).json(err);

  return res.status(200).send(req.file)
  });
});

app.post("/users", (req, res) => {
  pool.query("SELECT * from users", [], (error, result) => {
    if (error) {
      res.send(error.message);
      return;
    }
    res.send(result.rows);
  });
});



app.get("/getPicture", (req, res) => {
  const fileName = req.body.picture_name;

});

app.listen(8888, () => console.log("Server listening on 8888 port"));