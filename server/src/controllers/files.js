const db = require('../db');
const multer = require("multer");
path = require("path");
const { PORT, CLIENT_URL } = require("../constants");
const fs = require("fs");

const port = PORT || 3002;

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let year = date_ob.getFullYear();
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let currentTime = year + "_" + month + "_" + date + "_" + hours + "_" + minutes + "_" + seconds;

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'assets/uploads');
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1];
    const {
      body : { name }
    } = req;
    callback(null, `${name}_${currentTime}.${ext}`)
  },
});

console.log(multerConfig)

exports.addTema = async (req, res) => {
  console.log(req.body);

  
};

const isFile = (req, file, callback) => {
  if(file.mimetype.startsWith('image') 
    || file.mimetype === 'application/pdf'  
    || file.mimetype === 'application/vnd.ms-excel' 
    || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    || file.mimetype === 'text/plain' 
    || file.mimetype === 'application/msword' 
    || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    || file.mimetype === 'text/csv'
  ) {
    callback(null, true);
  } else {
    callback(new Error("Fisierul nu poate fi incarcat"))
  }
}

const upload = multer({
  storage: multerConfig,
  fileFilter: isFile,
});

exports.uploadImage = upload.single("file");

exports.uploadFile = async (req, res) => {
  let newPath = path.join(__dirname, '../../',`${req.file.path}`);
  try {    
    const currentDate = new Date().toISOString().slice(0, 10)
    const results = await db.query("INSERT INTO files (file_path, id_student, upload_date) VALUES ($1, $2 ,$3) returning *",
      [newPath, req.body.id_student, currentDate ]);
    res.status(201).json({
      data: {
        files: results.rows[0],
      },
    });

  } catch (error) {
    console.log(error);
  }

}

exports.getFiles = async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM files where id_student = $1", [req.params.id]);

    res.status(200).json({
      status: "succes",
      results: results.rows.length,
      data: {
        files: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
}




exports.downloadFile = async (req, res) => {
  const {
      body : { fileName }
    } = req;
  const fileUrl = `http://localhost:${port}/api/download/${fileName}`;
  const filePath = path.join(__dirname, '../../assets/uploads', `${fileName}`);
 
  try {
    res.download(filePath)
  } catch (error) {
    console.log(error)
  }
}

exports.fileDelete = async (req, res) => {
  try {
    const results = await db.query("DELETE FROM files where id = $1", [req.body.fileId]);
    const {
      body : { fileName }
    } = req;
    const filePath = path.join(__dirname, '../../assets/uploads', `${fileName}`);
    const deleteFile = fs.unlinkSync(filePath)
    res.status(204).json({
      status: "sters cu succes"
    });
  } catch (error) {
    console.log(error.message);
  }
}

console.log(`${new Date()}+${new Date().toLocaleTimeString()}`)





