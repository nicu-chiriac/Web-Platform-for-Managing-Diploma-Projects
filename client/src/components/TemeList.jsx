import React, { useContext, useEffect, useRef, useState } from 'react';
import TemeFinder from '../apis/TemeFinder';
import { TemeContext } from '../context/TemeContext';
import './Tables.css';
import Swal from 'sweetalert2';
import { BiEdit } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';
import './styles/TemeList.css';
import { useNavigate } from 'react-router-dom';
import { GrStatusGood } from 'react-icons/gr';
import { VscFileSymlinkDirectory } from 'react-icons/vsc';
import { fetchRestrictedInfo } from '../apis/AuthFinder';
import { Button, Modal } from 'react-bootstrap';


const TemeList = () => {

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let isRestricted = useRef(false);

  const restrictedInfo = async () => {
    try {
      const request = await fetchRestrictedInfo()
      
      if (request.status === 200) {
        isRestricted.current = true;
      
      }
      
    } catch (error) {
      
    }
  }
  
  restrictedInfo();
  restrictedInfo();
  

  const {teme, setTeme}= useContext(TemeContext)
  let navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TemeFinder.get("/");
        console.log(response)
        setTeme(response.data.data.teme);
      } catch (error) {}
    };
    
    fetchData();
    
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Esti sigur?',
      text: "Odată ștearsă înregistrarea nu va mai putea fi recuperată!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da, șterge!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          TemeFinder.delete(`/${id}`);
          if (isRestricted.current === true) {
            setTeme(teme.filter(tema => {
              return tema.id !== id
            }))
            Swal.fire(
              'Șters!',
              'Înregistrarea a fost ștearsă cu succes.',
              'info'
            )
          } else {
            Swal.fire({      
              position: 'center',
              title: "Eșuat!",
              text:"Nu sunteți autorizat!" ,
              button: "Închide",
              allowOutsideClick: true 
            })
          }
          
        } catch (error) {
          console.log(error)
        }
      }
    }) 
  }

  const handleUpdate = (id) => {
    navigate(`/teme/${id}/update`);
  }
  
  return (
    <div className='list-group'>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Fișiere</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Aici vor fi fișierele</div>
        </Modal.Body>
        <Modal.Footer>
          <Button id='1' variant="info" 
            onClick={handleClose}
            >
            Ok!
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='table-wrapper'>
      <table className='table table-hover table-default'>
        <thead>
          <tr>
            <th className='row-tema' scope='col'>Denumire / descriere temă</th>
            <th scope='col'>Student</th>
            <th scope='col'>Grupă</th>
            <th scope='col'>Profesor</th>
            <th scope='col'>Fișiere</th>
            <th scope='col'>Status temă</th>
            <th scope='col'>Actiuni</th>
          </tr>
        </thead>
        <tbody>
          {teme && teme.map(tema => {
            return (
              <tr key = {tema.id}>
                <td>{tema.denumire_descriere_tema}</td>
                <td>{tema.fullname_s}</td>
                <td>{tema.grupa}</td>
                <td>{tema.fullname_p}</td>
                <td>{tema.file_path}
                  <button type ="button" className="btn btn-outline-dark btn-sm" onClick={ handleShow }>
                    <VscFileSymlinkDirectory size="1.5em"/>
                  </button>
                </td>
                <td>{tema.status_tema}
                {tema.status_tema ? (
                  <>
                    <div className='verified-icon'><GrStatusGood size="1.5em" /></div>
                  </>
                ) : (
                  <></>
                )}
                </td>
                <td>
                  <button onClick={() => handleUpdate(tema.id)} className='btn btn-outline-dark btn-sm'><BiEdit size="1.5em"/></button>
                  <button onClick={() => handleDelete(tema.id)} className='btn btn-outline-danger btn-sm'><TiDelete size="1.5em"/></button>
                </td>
            </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default TemeList