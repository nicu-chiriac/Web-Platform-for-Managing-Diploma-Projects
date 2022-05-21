import React, { useContext, useState } from 'react';
import ProfessorFinder from '../apis/ProfessorFinder';
import { Button, Modal } from 'react-bootstrap';
import './ButtonsCSS.css';
import { ProfessorsContext } from '../context/ProfessorsContext';
import Swal from 'sweetalert2';
import { FaUniversity } from 'react-icons/fa';

function AddProfessor() {
  const {addProfessor} = useContext(ProfessorsContext)
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [gradDidactic, setGradDidactic] = useState("Grad didactic");
  const [gradStiintific, setGradStiintific] = useState("Grad științific");
  const [email, setEmail] = useState("");
  const [emailInst, setEmailInst] = useState("");
  const [numarCurentStudenti, setNumarCurentStudenti] = useState("");
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await ProfessorFinder.post("/", {
        nume,
        prenume,
        grad_didactic : gradDidactic,
        grad_stiintific : gradStiintific,
        email,
        email_institutional : emailInst,
        numar_curent_studenti : numarCurentStudenti,
      
      });
      addProfessor(response.data.data.professors);
      handleClose();
      Swal.fire({      
        position: 'bottom-start',
        title: "Succes!",
        text: `Cadrul didactic ${response.data.data.professors.nume} ${response.data.data.professors.prenume} a fost adaugat cu succes!`,
        button: "OK!",
        timer: 2500,
        timerProgressBar: true,
        allowOutsideClick: true
      });
      
    } catch (error) {
      
    }
  }

  return (
    <div className='addButton'>
      <Button variant="primary" onClick={handleShow}>
        Adauga <FaUniversity size='1.8em'/> 
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Adaugare profesor nou</Modal.Title>
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
                  <select
                    value={gradDidactic} 
                    onChange={(e) => setGradDidactic(e.target.value)} 
                    className='custom-select my-1 mr-sm-2'
                  >
                    <option value="" hidden>Grad didactic</option>
                    <option value='nespecificat'>nespecificat</option>
                    <option value='asistent universitar'>asistent universitar</option>
                    <option value=' lector universitar/şef de lucrări'>lector universitar/şef de lucrări</option>
                    <option value='conferenţiar universitar'>conferenţiar universitar</option>
                    <option value='profesor universitar'>profesor universitar</option>
                  </select>
                </div>
                <div className='p-1'>
                  <select
                    value={gradStiintific} 
                    onChange={(e) => setGradStiintific(e.target.value)} 
                    className='custom-select my-1 mr-sm-2'
                  >
                    <option value="" hidden>Grad științific</option>
                    <option value='nespecificat'>nespecificat</option>
                    <option value='asistent cercetare'>asistent cercetare</option>
                    <option value='cercetător ştiinţific'>cercetător ştiinţific</option>
                    <option value='cercetător ştiinţific gradul III'>cercetător ştiinţific gradul III</option>
                    <option value='cercetător ştiinţific gradul II'>cercetător ştiinţific gradul II</option>
                    <option value='cercetător ştiinţific gradul I'>cercetător ştiinţific gradul I</option>
                  </select>
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
                    value={numarCurentStudenti} 
                    onChange={(e) => setNumarCurentStudenti(e.target.value)} 
                    type="number" 
                    min="0"
                    max="100"
                    className='form-control' 
                    placeholder='Număr curent studenți' 
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
  
export default AddProfessor