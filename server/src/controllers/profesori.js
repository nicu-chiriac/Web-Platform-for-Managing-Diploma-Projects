const db = require('../db');


//GET Lista Profesori

exports.getProfessorsList = async (req, res) => {
  try {
    const update = await db.query("UPDATE professors p SET numar_curent_studenti = (SELECT count(t.id) FROM teme t WHERE t.id_professor = p.id) WHERE p.id > 0;");
    const results = await db.query("SELECT * FROM professors ORDER BY nume asc");

    res.status(200).json({
    status:"succes",
    results: results.rows.length,
    data: {
      professors: results.rows,
    },
  });
  } catch (err) {
    console.log(err);
  }
};

//GET search profesor
 
exports.getSearchProfessor = async (req, res) => {
  try {
    let { param } = req.query;
    param = param.toLowerCase();
    const query = '%' + param + '%';
    results = await db.query('SELECT * FROM professors WHERE lower(nume) || lower(prenume) || lower(email) || lower(email_institutional) || lower(grad_didactic) || lower(grad_stiintific) || numar_curent_studenti  LIKE $1 ORDER BY nume asc', [query]);

    res.status(200).json({
    status:"succes",
    results: results.rows.length,
    data: {
      professors: results.rows,
    },
  });
  } catch (err) {
    console.log(err);
  }
};


//GET Un singur profesor

exports.getProfessor = async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query("select * from professors where id = $1", [req.params.id]);
    res.status(200).json({
      status: "succes", 
      data : {
        professors : results.rows[0],
      }
    })
  } catch (error) {
    console.log(error);
  } 
};

//GET Un nume + prenume student

exports.getFullNameProfesor = async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query("select concat(p.nume, ' ', p.prenume) as fullname_p from professors p where id = $1", [req.params.id]);
    res.status(200).json({
      status: "succes", 
      data : {
        professors : results.rows[0],
      }
    })
  } catch (error) {
    console.log(error);
  } 
};

//POST Adauga un profesor nou

exports.addProfessor = async (req, res) => {
  console.log(req.body);
  
  try {
    const results = await db.query("INSERT INTO professors (nume, prenume, grad_didactic, grad_stiintific, email, email_institutional, numar_curent_studenti) values ($1, $2, $3, $4, $5, $6, $7) returning *",
    [req.body.nume, req.body.prenume, req.body.grad_didactic, req.body.grad_stiintific, req.body.email, req.body.email_institutional, req.body.numar_curent_studenti]);
    res.status(201).json({
      data : {
        professors : results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//POST importa profesori din CSV in baza de date
  
  exports.importProfessorsCsv = async (req, res) => {
  try {
    // console.log(req.body);
    for (i = 0; i < req.body.length; i++) {
      let professor = req.body[i]
      const results = await db.query("INSERT INTO professors (nume, prenume, grad_didactic, grad_stiintific, email, email_institutional, numar_curent_studenti) values ($1, $2, $3, $4, $5, $6, $7) returning *",
                      [professor.nume, professor.prenume, professor.grad_didactic, professor.grad_stiintific, professor.email, professor.email_institutional, professor.numar_curent_studenti]);
    }
    
   } catch (error) {
     
   }
 };


//UPDATE profesori

exports.updateProfessor = async (req, res) => {
  try {
    const results = await db.query("UPDATE professors SET nume = $1, prenume = $2, grad_didactic = $3,  grad_stiintific = $4, email = $5, email_institutional = $6, numar_curent_studenti = $7 where id = $8 returning *",
    [req.body.nume, req.body.prenume, req.body.grad_didactic, req.body.grad_stiintific, req.body.email, req.body.email_institutional, req.body.numar_curent_studenti, req.params.id]);
    res.status(200).json({
    data : {
      professors : results.rows[0],
    },
    });
  } catch (error) {
    console.log(error);
  }
  console.log(req.params.id);
  console.log(req.body);

  
}

//DELETE profesori

exports.deleteProfessor = async (req, res) => {
  try {
    const results = await db.query("DELETE FROM professors where id = $1", [req.params.id]);
    res.status(204).json({
      status: "sters cu succes"
    });
 } catch (error) {
   console.log(error);
 }
  
}