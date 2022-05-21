import React, { useContext, useEffect } from 'react';
import TemeFinder from '../apis/TemeFinder';
import { TemeContext } from '../context/TemeContext';
import './Tables.css';
import Swal from 'sweetalert2';
import { BiEdit } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';
import './styles/TemeList.css';
import { useNavigate } from 'react-router-dom';

const TemeList = () => {
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
          setTeme(teme.filter(tema => {
            return tema.id !== id
          }))
        } catch (error) {
          console.log(error)
        }
        Swal.fire(
          'Șters!',
          'Înregistrarea a fost ștearsă cu succes.',
          'info'
        )
      }
    }) 
  }

  const handleUpdate = (id) => {
    navigate(`/teme/${id}/update`);
  }
  
  return (
    <div className='list-group'>
      <div className='table-wrapper'>
      <table className='table table-hover table-default'>
        <thead>
          <tr>
            <th className='row-tema' scope='col'>Denumire / descriere temă</th>
            <th scope='col'>Student</th>
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
                <td>{tema.fullname_p}</td>
                <td>{tema.file_path}</td>
                <td>{tema.status_tema}</td>
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