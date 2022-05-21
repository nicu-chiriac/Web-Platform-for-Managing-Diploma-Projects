import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TemeContext } from "../context/TemeContext";
import TemeFinder from "../apis/TemeFinder";
import { StudentiContext } from "../context/StudentiContext";
import StudentSearch from "../apis/StudentSearch";
import { ProfessorsContext } from "../context/ProfessorsContext";
import ProfessorSearch from "../apis/ProfessorSearch";

const UpdateTema = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const { teme } = useContext(TemeContext);
  const [numeTema, setNumeTema] = useState("");
  const [student, setStudent] = useState();
  const [profesor, setProfesor] = useState();
  const [statusTema, setStatusTema] = useState();

  const { studenti, setStudenti } = useContext(StudentiContext);

  const fetchData = async (searchValue) => {
    try {
      const response = await StudentSearch.get(`?param=${searchValue}`);
      setStudenti(response.data.data.studenti);
    } catch (error) {
      console.log(error)
    }
  };

  const { professors, setProfessors } = useContext(ProfessorsContext);

  const fetchDataProfessor = async (searchValue) => {
    try {
      const response = await ProfessorSearch.get(`?param=${searchValue}`);
      setProfessors(response.data.data.professors);
      // console.log(response.data.data.professors)
    } catch (error) {}
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await TemeFinder.get(`/${id}`);
      console.log(response.data.data);
      setNumeTema(response.data.data.teme.denumire_descriere_tema);
      setStudent(response.data.data.teme.fullname_s);
      setProfesor(response.data.data.teme.fullname_p);
      setStatusTema(response.data.data.teme.status_tema)
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateTeme = await TemeFinder.put(`/${id}`, {
      denumire_descriere_tema: numeTema,
      fullname_s: student,
      fullname_p: profesor,
      status_tema: statusTema
    });
    navigate("/teme");
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Nume / descriere temă</label>
          <input
            value={numeTema}
            onChange={(e) => setNumeTema(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className ="form-group">
          <div>
            <input 
              size={30}
              className="search" 
              placeholder="Cauta..." 
              onChange={(event) => fetchData(event.target.value)}
              >
            </input>
          </div>
          <select value={student} onChange={(e) => setStudent(e.target.value)}>
            {studenti && studenti.map(student => {
              return (
                  <option id={student.id}>
                    <option>{`${student.nume} ${student.prenume}`}</option>
                  </option>
              )
            })}
          </select>
        </div>

        <div className ="form-group">
          <input 
            size={30}
            className="search" 
            placeholder="Cauta..." 
            onChange={(event) => fetchDataProfessor(event.target.value)}
            >
          </input>
          <select value={profesor} onChange={(e) => setProfesor(e.target.value)}>
            {professors && professors.map(professor => {
              return (
                  <option id={professor.id}>
                    <option>{`${professor.nume} ${professor.prenume}`}</option>
                  </option>
              )
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Status temă</label>
          <input
            value={statusTema}
            onChange={(e) => setStatusTema(e.target.value)}
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateTema
