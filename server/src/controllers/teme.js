const db = require('../db');


//GET lista tema
exports.getTemeList = async (req, res) => {
  try {
    const results = await db.query(
      "SELECT t.id, t.denumire_descriere_tema, concat( UPPER(s.nume), ' ', s.prenume ) AS fullname_s, s.grupa , concat( UPPER(p.nume), ' ', p.prenume ) AS fullname_p , p.email,  f.file_path, t.status_tema FROM public.teme t,studenti s, professors p,files f WHERE t.id_studenti = s.id AND t.id_professor  = p.id AND t.id_file_path = f.id ORDER BY s.grupa asc, fullname_s asc");
    res.status(200).json({
      status: "succes",
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
      data: {
        teme: results.rows[0],
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
      data: {
        teme: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//UPDATE alocare student si coordonator la o tema
exports.updateTema = async (req, res) => {
  try {
    let result_s = -1;
    let result_p = -1;
    if (req.body.fullname_s !== undefined)
      result_s = await db.query("SELECT s.id FROM studenti s WHERE concat( s.nume, ' ', s.prenume ) = $1", [req.body.fullname_s]);
    if (req.body.fullname_p !== undefined)
      result_p = await db.query("SELECT p.id FROM professors p WHERE concat( p.nume, ' ', p.prenume ) = $1", [req.body.fullname_p]);

    let results;
    if (result_s != -1 && result_p != -1)
      results = await db.query("UPDATE public.teme SET denumire_descriere_tema=$1, id_studenti=$2, id_professor=$3, status_tema=$4 WHERE id=$5 returning *",
        [req.body.denumire_descriere_tema, result_s.rows[0].id, result_p.rows[0].id, req.body.status_tema, req.params.id]);
    else
    if (result_s != -1)
      results = await db.query("UPDATE public.teme SET denumire_descriere_tema=$1, id_studenti=$2, status_tema=$3 WHERE id=$4 returning *",
        [req.body.denumire_descriere_tema, result_s.rows[0].id, req.body.status_tema, req.params.id]);
    else
    if (result_p != -1)
      results = await db.query("UPDATE public.teme SET denumire_descriere_tema=$1, id_professor=$2, status_tema=$3 WHERE id=$4 returning *",
        [req.body.denumire_descriere_tema, result_p.rows[0].id, req.body.status_tema, req.params.id]);
    else
      results = await db.query("UPDATE public.teme SET denumire_descriere_tema=$1, status_tema=$2 WHERE id=$3 returning *",
        [req.body.denumire_descriere_tema, req.body.status_tema, req.params.id]);

    res.status(200).json({
      data: {
        teme: results.rows[0]
      },
    });
  } catch (error) {
    console.log(error);
  }
  // console.log(req.params.id);
  // console.log(req.body);


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

//GET search student in teme

exports.getSearchTema = async (req, res) => {
  try {
    let {
      param
    } = req.query;
    param = param.toLowerCase();
    const query = '%' + param + '%';
    results = await db.query(
      `SELECT t.denumire_descriere_tema,
      concat( UPPER(s.nume), ' ', s.prenume ) AS fullname_s,
      s.grupa ,
      concat( UPPER(p.nume), ' ', p.prenume ) AS fullname_p
      FROM public.teme t
      JOIN public.professors p ON t.id_professor = p.id
      JOIN public.studenti s ON t.id_studenti = s.id 
      WHERE lower(t.denumire_descriere_tema)  || 
      lower(concat( UPPER(s.nume), ' ', s.prenume )) || 
      lower(concat( UPPER(p.nume), ' ', p.prenume )) || s.grupa  
      LIKE $1 ORDER BY s.grupa asc, fullname_s asc`, [query]);

    res.status(200).json({
      status: "succes",
      results: results.rows.length,
      data: {
        teme: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
};