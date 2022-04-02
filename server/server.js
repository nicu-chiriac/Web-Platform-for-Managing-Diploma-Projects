require('dotenv').config();
const express = require("express");
const db = require('./db');

const app = express();

app.use(express.json());

//GET Lista Studenti
app.get("/api/studentlist", async (req, res) => {
  try {
    const results = await db.query("select * from studenti");
    console.log(results);
    res.status(200).json({
    status:"succes",
    results: results.rows.length,
    data: {
      studenti: results.rows,
    },
  });
  } catch (err) {
    console.log(err);
  }
});

//GET Un singur student
app.get("/api/studentlist/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query("select * from studenti where id = $1", [req.params.id]);
    res.status(200).json({
      status: "succes", 
      data : {
        studenti : results.rows[0],
      }
    })
  } catch (error) {
    console.log(error);
  } 
});

//POST Adauga un student nou
app.post("/api/studentlist", async (req, res) => {
  console.log(req.body);
  
  try {
    //const [nume, prenume, email, email_institutional, an_inscriere, an_curent_student, specializare, grupa] = req.body;
    const results = await db.query("INSERT INTO studenti (nume, prenume, email, email_institutional, an_inscriere, an_curent_student, specializare, grupa) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
    [req.body.nume, req.body.prenume, req.body.email, req.body.email_institutional, req.body.an_inscriere, req.body.an_curent_student, req.body.specializare, req.body.grupa]);
    //console.log(results);
    res.status(201).json({
      data : {
        studenti : results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//UPDATE studenti
app.put("/api/studentlist/:id", async (req, res) => {
  try {
    const results = await db.query("UPDATE studenti SET nume = $1, prenume = $2, email = $3, email_institutional = $4, an_inscriere = $5, an_curent_student = $6, specializare = $7, grupa = $8 where id = $9 returning *",
    [req.body.nume, req.body.prenume, req.body.email, req.body.email_institutional, req.body.an_inscriere, req.body.an_curent_student, req.body.specializare, req.body.grupa, req.params.id]);
    res.status(200).json({
    data : {
      studenti : results.rows[0],
    },
    });
  } catch (error) {
    console.log(error);
  }
  console.log(req.params.id);
  console.log(req.body);

  
})

//DELETE studenti
app.delete("/api/studentlist/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM studenti where id = $1", [req.params.id]);
    res.status(204).json({
      status: "sters cu succes"
    });
 } catch (error) {
   console.log(error);
 }
  
})

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`server is running on Port ${port}`);
});