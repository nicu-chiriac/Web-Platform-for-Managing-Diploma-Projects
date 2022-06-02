import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TemeContext } from "../context/TemeContext";
import TemeFinder from "../apis/TemeFinder";
import { StudentiContext } from "../context/StudentiContext";
import StudentSearch from "../apis/StudentSearch";
import { ProfessorsContext } from "../context/ProfessorsContext";
import ProfessorSearch from "../apis/ProfessorSearch";
import StudentFinder from "../apis/StudentFinder";
import ProfessorFinder from "../apis/ProfessorFinder";
import { Button, Modal } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';
import './styles/UpdateTema.css';


const UpdateTema = (props) => {
 
  const { id } = useParams();
  let navigate = useNavigate();
  const { teme } = useContext(TemeContext);
  const [numeTema, setNumeTema] = useState();
  const [student, setStudent] = useState();
  const [profesor, setProfesor] = useState();
  const [statusTema, setStatusTema] = useState();
  const { studenti, setStudenti } = useContext(StudentiContext);
  const { professors, setProfessors } = useContext(ProfessorsContext);
  
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [showProfesor, setShowProfesor] = useState(false);
  
  const handleCloseProfesor = () => setShowProfesor(false);
  const handleShowProfesor = () => setShowProfesor(true);

  const handleEmptyStudent = () => {
    setStudent(" ")
  }

  const handleEmptyProfesor = () => {
    setProfesor(" ")
  }

  const fetchData = async (searchValue) => {
    try {
      const response = await StudentSearch.get(`?param=${searchValue}`);
      setStudenti(response.data.data.studenti);
    } catch (error) {
      console.log(error)
    }
  };

  const fetchDataProfessor = async (searchValue) => {
    try {
      const response = await ProfessorSearch.get(`?param=${searchValue}`);
      setProfessors(response.data.data.professors);
      
    } catch (error) {}
  };
  
  const fetchFullNameStudent = async (id_s) => {
    try {
      const response = await StudentFinder.get(`/fullname/${id_s}`);
      return response
    } catch (error) {}
  };

  const fetchFullNameProfesor = async (id_p) => {
    try {
      const response = await ProfessorFinder.get(`/fullname/${id_p}`);
      return response
    } catch (error) {}
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await TemeFinder.get(`/${id}`);
      const response2 = await StudentFinder.get(`/fullname/${response.data.data.teme.id_studenti}`);
      const response3 = await ProfessorFinder.get(`/fullname/${response.data.data.teme.id_professor}`);

      setNumeTema(response.data.data.teme.denumire_descriere_tema);
      setStudent(response2.data.data.studenti.fullname_s);
      // console.log(response2.data.studenti.fullname_s);
      setProfesor(response3.data.data.professors.fullname_p);
      setStatusTema(response.data.data.teme.status_tema)

      // setNewStudent(response.data.data.teme.fullname_s);
      // setNewProfesor(response.data.data.teme.fullname_p);
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
    <div className="wrapper-div">
      <form action="">
        {/* Div pentru denumirea temei */}
        <div className="form-fields">
          <div className="form-group">
            <label className="field-title" htmlFor="name">Nume / descriere temă</label>
            <textarea
              value={numeTema}
              onChange={(e) => setNumeTema(e.target.value)}
              id="tema"
              className="form-control"
              type="text"
              rows="4"
              cols="50"
            />
          </div>
          {/* Div pentru student */}
          <div className ="form-group">
            <label className="field-title" htmlFor="name">Student</label>
            <input
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              id="nume"
              className="form-control"
              type="text"
            />
            <div className='edit'>
              <button type="button" className="btn btn-outline-dark" onClick={ handleShow }>
                Edit student
                <MdEdit size='1.2em'/>
              </button>
              <button type="button" className="btn btn-outline-dark" onClick={ handleEmptyStudent }>Lasă câmpul necompletat</button>
              <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                  <Modal.Title>Editare student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                      <div>
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
                          {studenti && studenti.map(student => (
                                <option id={student.id}>
                                  <option>{`${student.nume} ${student.prenume}`}</option>
                                </option>
                            )
                          )}
                        </select>
                      </div>
                    </form>
                  
                </Modal.Body>
                <Modal.Footer>
                  <Button id='1' variant="info" 
                    onClick={handleClose}
                    >
                    Ok!
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
            
          {/* Div pentru profesor */}
          <div className ="form-group">
            <label className="field-title" htmlFor="name">Profesor coordonator</label>
            <input
              value={profesor}
              onChange={(e) => setProfesor(e.target.value)}
              id="nume"
              className="form-control"
              type="text"
            />
            <div className='edit'>
              <button type="button" className="btn btn-outline-dark sm" onClick={handleShowProfesor}>
                Edit profesor
                <MdEdit size='1.2em'/>
              </button>
              <button type="button" className="btn btn-outline-dark" onClick={ handleEmptyProfesor }>Lasă câmpul necompletat</button>
              <Modal show={showProfesor} onHide={handleCloseProfesor} backdrop="static">
                <Modal.Header closeButton>
                  <Modal.Title>Editare profesor coordonator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <div>
                      <div>
                        <input 
                          size={30}
                          className="search" 
                          placeholder="Cauta..." 
                          onChange={(event) => fetchDataProfessor(event.target.value)}
                          >
                        </input>
                      </div>
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
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button id='1' variant="info" 
                    onClick={handleCloseProfesor}
                    >
                    Ok!
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          
          {/* Status tema */}
          <div className="form-group">
            <div className="field-title">Status curent temă</div>
            <select 
              value={statusTema} 
              onChange={(e) => setStatusTema(e.target.value)}
              className='form-control' 
            >
              <option defautlvalue={statusTema} disabled>Schimbă statusul temei</option>
              <option value='true'>True</option>
              <option value='false'>False</option>
            </select>
          </div>
          <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-warning"
          id="save-button"
          >
          Salvează modificările
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTema
