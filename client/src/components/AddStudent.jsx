import React, { useContext, useState } from 'react';
import StudentFinder from '../apis/StudentFinder';
import { Button, Modal } from 'react-bootstrap';
import './ButtonsCSS.css';
import { StudentiContext } from '../context/StudentiContext';
import Swal from 'sweetalert2';
import { MdSchool } from 'react-icons/md';

function AddStudent() {
  const {addStudent} = useContext(StudentiContext)
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [email, setEmail] = useState("");
  const [emailInst, setEmailInst] = useState("");
  const [anInscriere, setAnInscriere] = useState("");
  const [anCurent, setAnCurent] = useState("An curent student");
  const [specializare, setSpecializare] = useState("Specializare");
  const [grupa, setGrupa] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await StudentFinder.post("/", {
        nume,
        prenume,
        email,
        email_institutional: emailInst,
        an_inscriere: anInscriere,
        an_curent_student: anCurent,
        specializare,
        grupa
      });
      addStudent(response.data.data.studenti);
      handleClose();
      Swal.fire({      
        position: 'bottom-start',
        title: "Succes!",
        text: `Studentul ${response.data.data.studenti.nume} ${response.data.data.studenti.prenume} a fost adaugat cu succes!`,
        button: "OK!",
        timer: 2500,
        timerProgressBar: true,
        allowOutsideClick: true
      });
      
    } catch (error) {
      Swal.fire({      
        position: 'center',
        title: "Eșuat!",
        text:"Nu sunteți autorizat!" ,
        button: "Închide",
        allowOutsideClick: true 
      })
    }
  }

  return (
    <div className='addButton'>
      <Button variant="primary" onClick={handleShow}>
        Adauga <MdSchool size='1.8em'/>
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Adaugare student nou</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
              <div>
                <div className='p-1'>
                  <input 
                    value={nume} 
                    onChange={(e) => setNume(e.target.value)} 
                    type="text" 
                    className='form-control'
                    placeholder='Nume' 
                  />
                </div>
                <div className='p-1'>
                  <input 
                    value={prenume} 
                    onChange={(e) => setPrenume(e.target.value)} 
                    type="text" 
                    className='form-control' 
                    placeholder='Prenume' 
                  />
                </div>
                <div className='p-1'>
                  <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="text" 
                    className='form-control' 
                    placeholder='Email' 
                  />
                </div>
                <div className='p-1'>
                  <input 
                    value={emailInst} 
                    onChange={(e) => setEmailInst(e.target.value)} 
                    type="text" 
                    className='form-control' 
                    placeholder='Email institutional' 
                  />
                  </div>
                <div className='p-1'>
                  <input 
                    value={anInscriere} 
                    onChange={(e) => setAnInscriere(e.target.value)} 
                    type="text" 
                    className='form-control' 
                    placeholder='An inscriere' 
                  />
                </div>
                <div className='p-1'>
                  <select
                    value={anCurent} 
                    onChange={(e) => setAnCurent(e.target.value)} 
                    className='custom-select my-1 mr-sm-2'
                  >
                    <option value="" hidden>An curent student</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                  </select>
                </div>
                <div className='p-1'>
                  <select 
                    value={specializare} 
                    onChange={(e) => setSpecializare(e.target.value)}
                    className='custom-select my-1 mr-sm-2' 
                  >
                    <option value="" hidden>Specializare</option>
                    <option value='IAII'>IAII</option>
                    <option value='TCM'>TCM</option>
                    <option value='IEI'>IEI</option>
                  </select>
                </div>
                <div className='p-1'>
                  <input 
                    value={grupa} onChange={(e) => setGrupa(e.target.value)} 
                    type="text" 
                    className='form-control' 
                    placeholder='Grupa' 
                  />
                </div>
              </div>
            </form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" 
            // onClick={HandleReset} 
          >
            Reset
          </Button>
          <Button id='1' variant="secondary" 
            onClick={handleClose}
            >
            Inchide
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="primary" 
            >
            Salveaza
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
  
export default AddStudent
