const db = require('../db');
const Json2csvParser = require('json2csv').Parser;

//GET Lista Studenti

exports.getStudentList = async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM studenti ORDER BY nume asc");

    res.status(200).json({
      status: "succes",
      results: results.rows.length,
      data: {
        studenti: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

//GET search student

exports.getSearchStudent = async (req, res) => {
  try {
    let {
      param
    } = req.query;
    param = param.toLowerCase();
    const query = '%' + param + '%';
    results = await db.query('SELECT * FROM studenti WHERE lower(nume) || lower(prenume) || lower(specializare) || lower(grupa) || an_inscriere  LIKE $1 ORDER BY nume asc', [query]);

    res.status(200).json({
      status: "succes",
      results: results.rows.length,
      data: {
        studenti: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
};


//GET Un nume + prenume student

exports.getFullNameStudent = async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query("select concat(s.nume, ' ', s.prenume) as fullname_s from studenti s where id = $1", [req.params.id]);
    res.status(200).json({
      status: "succes",
      data: {
        studenti: results.rows[0],
      }
    })
  } catch (error) {
    console.log(error);
  }
};

//GET Un singur student

exports.getStudent = async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query("select * from studenti where id = $1", [req.params.id]);
    res.status(200).json({
      status: "succes",
      data: {
        studenti: results.rows[0],
      }
    })
  } catch (error) {
    console.log(error);
  }
};

//POST Adauga un student nou

exports.addStudent = async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query("INSERT INTO studenti (nume, prenume, email, email_institutional, an_inscriere, an_curent_student, specializare, grupa) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
      [req.body.nume, req.body.prenume, req.body.email, req.body.email_institutional, req.body.an_inscriere, req.body.an_curent_student, req.body.specializare, req.body.grupa]);
    res.status(201).json({
      data: {
        studenti: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//POST importa studenti din CSV in baza de date

exports.importStudentsCsv = async (req, res) => {
  try {
    // console.log(req.body);
    for (i = 0; i < req.body.length; i++) {
      let student = req.body[i]
      const results = await db.query("INSERT INTO studenti (nume, prenume, email, email_institutional, an_inscriere, an_curent_student, specializare, grupa) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
        [student.nume, student.prenume, student.email, student.email_institutional, student.an_inscriere, student.an_curent_student, student.specializare, student.grupa]);
      // console.log(results)
    }

  } catch (error) {

  }
};


//UPDATE studenti

exports.updateStudent = async (req, res) => {
  try {
    const results = await db.query("UPDATE studenti SET nume = $1, prenume = $2, email = $3, email_institutional = $4, an_inscriere = $5, an_curent_student = $6, specializare = $7, grupa = $8 where id = $9 returning *",
      [req.body.nume, req.body.prenume, req.body.email, req.body.email_institutional, req.body.an_inscriere, req.body.an_curent_student, req.body.specializare, req.body.grupa, req.params.id]);
    res.status(200).json({
      data: {
        studenti: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
  console.log(req.params.id);
  console.log(req.body);


}

//DELETE studenti

exports.deleteStudent = async (req, res) => {
  try {
    const results = await db.query("DELETE FROM studenti where id = $1", [req.params.id]);
    res.status(204).json({
      status: "sters cu succes"
    });
  } catch (error) {
    console.log(error.message);
  }

}
