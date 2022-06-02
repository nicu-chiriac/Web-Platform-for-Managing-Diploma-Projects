import React, { useContext, useEffect, useRef } from 'react';
import ProfessorFinder from '../apis/ProfessorFinder';
import { ProfessorsContext } from '../context/ProfessorsContext';
import './Tables.css';
import Swal from 'sweetalert2';
import { BiEdit } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';
import { fetchRestrictedInfo } from '../apis/AuthFinder';

const ProfessorsList = () => {

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


  const {professors, setProfessors}= useContext(ProfessorsContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProfessorFinder.get("/");
        console.log(response)
        setProfessors(response.data.data.professors);
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
          ProfessorFinder.delete(`/${id}`);
          if (isRestricted.current === true) {
            setProfessors(professors.filter(professor => {
              return professor.id !== id
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
  
  return (
    <div className='list-group'>
      <div className='table-wrapper'>
      <table className='table table-hover table-default'>
        <thead>
          <tr>
            <th scope='col'>Nume</th>
            <th scope='col'>Prenume</th>
            <th scope='col'>Grad Didactic</th>
            <th scope='col'>Grad Științific</th>
            <th scope='col'>Email</th>
            <th scope='col'>Email institutional</th>
            <th scope='col'>Număr curent studenți</th>
            <th scope='col'>Actiuni</th>
          </tr>
        </thead>
        <tbody>
          {professors && professors.filter(s => s.id > 0).map(professor => {
            return (
              <tr key = {professor.id}>
                <td>{professor.nume.toUpperCase()}</td>
                <td>{professor.prenume}</td>
                <td>{professor.grad_didactic}</td>
                <td>{professor.grad_stiintific}</td>
                <td>{professor.email}</td>
                <td>{professor.email_institutional}</td>
                <td>{professor.numar_curent_studenti}</td>
                <td>
                  <button className='btn btn-outline-dark btn-sm'><BiEdit size="1.5em"/></button>
                  <button onClick={() => handleDelete(professor.id)} className='btn btn-outline-danger btn-sm'><TiDelete size="1.5em"/></button>
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

export default ProfessorsList
