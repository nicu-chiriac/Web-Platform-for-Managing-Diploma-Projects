const db = require('../db');


//GET lista tema
exports.getTemeList = async (req, res) => {
  try {
    const results = await db.query(
      "SELECT t.id, t.denumire_descriere_tema, s.nume, s.prenume, p.nume, p.prenume, f.file_path, t.status_tema FROM public.teme t,studenti s, professors p,files f WHERE t.id_studenti = s.id AND t.id_professor  = p.id AND t.id_file_path = f.id ORDER BY s.nume asc");
    res.status(200).json({
    status:"succes",
    results: results.rows.length,
    data: {
      teme: results.rows,
    },
  });
  } catch (err) {
    console.log(err);
  }
};

//GET o singura tema
exports.getTema = async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query("select * from teme where id = $1", [req.params.id]);
    res.status(200).json({
      status: "succes", 
      data : {
        teme : results.rows[0],
      }
    })
  } catch (error) {
    console.log(error);
  } 
};

//POST adauga tema
exports.addTema = async (req, res) => {
  console.log(req.body);
  
  try {
    const results = await db.query("INSERT INTO public.teme (denumire_descriere_tema, id_file_path, id_studenti, id_professor, status_tema) values ($1, -1, -1, -1, false) returning *",
    [req.body.denumire_descriere_tema]);
    res.status(201).json({
      data : {
        teme : results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//UPDATE alocare student si coordonator la o tema
exports.updateTema = async (req, res) => {
  try {
    const results = await db.query("UPDATE public.teme SET id_professor = $1, id_studenti = $2 where id = $3 returning *",
    [req.body.id_professor, req.body.id_studenti, req.params.id]);
    res.status(200).json({
    data : {
      teme : results.rows[0],
    },
    });
  } catch (error) {
    console.log(error);
  }
  console.log(req.params.id);
  console.log(req.body);

  
}

//DELETE o tema
exports.deleteTema = async (req, res) => {
  try {
    const results = await db.query("DELETE FROM teme where id = $1", [req.params.id]);
    res.status(204).json({
      status: "sters cu succes"
    });
 } catch (error) {
   console.log(error);
 }
  
}

//POST importa teme(doar titluri de teme) din CSV in baza de date
exports.importTitluriTemeCsv = async (req, res) => {
  try {
    // console.log(req.body);
    for (i = 0; i < req.body.length; i++) {
      let teme = req.body[i]
      const results = await db.query("INSERT INTO public.teme (denumire_descriere_tema, id_file_path, id_studenti, id_professor, status_tema) values ($1, -1, -1, -1, false) returning *",
                      [req.body.denumire_descriere_tema]);
    }
    
   } catch (error) {
     console.log(error)
   }
 };