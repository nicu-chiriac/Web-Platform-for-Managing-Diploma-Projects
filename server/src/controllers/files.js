const db = require('../db');
const multer = require("multer");
path = require("path");

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'assets/uploads');
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1];
    const {
      body : { name }
    } = req;
    callback(null, `${name}_${Date.now()}.${ext}`)
  },
});

console.log(multerConfig)

exports.addTema = async (req, res) => {
  console.log(req.body);

  
};

const isImage = (req, file, callback) => {
  if(file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new Error("Doar imaginile pot fi incarcate"))
  }
}

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
});

exports.uploadImage = upload.single("file");

exports.uploadFile = async (req, res) => {
  // console.log(newPath);
  let newPath = path.join(__dirname, '../../',`${req.file.path}`);
  try {    
    
    const results = await db.query("INSERT INTO files (file_path, id_student) VALUES ($1, $2) returning *",
      [newPath, req.body.id_student]);
    res.status(201).json({
      data: {
        files: results.rows[0],
      },
    });

    // console.log(req.body.newPath)
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

// exports.downloadFile = async (req, res) => {
  
  //   const filePath = `${__dirname}/download/javascript.pdf`;
  //   console.log(filePath)
  //   res.download(filePath, 'js.pdf', (err) => {
  //     if (err) {
  //         console.log(err);
  //         res.status(500).send('Could not download file');
  //     }
  // });
  // const {
  //   body : { fileName }
  // } = req;
  // const filePath = path.join(__dirname, '../../assets/uploads/stanescu_1654633601620.jpeg');
  // console.log(filePath)
  // res.attachment(filePath).send();
    
  
// }
