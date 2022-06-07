import React, { useContext, useState } from 'react';
import TemeFinder from '../apis/TemeFinder';
import { Button, Modal } from 'react-bootstrap';
import './ButtonsCSS.css';
import { TemeContext } from '../context/TemeContext';
import Swal from 'sweetalert2';
import { RiFilePaper2Fill } from 'react-icons/ri';

function AddTema() {
  const { addTema } = useContext(TemeContext)
  const [numeTema, setNumeTema] = useState("");
  // const [fisiere, setFisiere] = useState(-1);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await TemeFinder.post("/", {
        denumire_descriere_tema: numeTema,
        // id_file_path : fisiere
      });
      addTema(response.data.data.teme);
      handleClose();
      Swal.fire({
        position: 'bottom-start',
        title: "Succes!",
        text: `Tema a fost adaugată cu succes!`,
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
        Adauga <RiFilePaper2Fill size='1.8em' />
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Adaugare temă nouă</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <div className='p-1'>
                <input
                  value={numeTema}
                  onChange={(e) => setNumeTema(e.target.value)}
                  type="text"
                  className='form-control'
                  placeholder='Nume/descriere temă'
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

export default AddTema