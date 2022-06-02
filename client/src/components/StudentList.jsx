import React, { useContext, useEffect, useRef } from 'react';
import StudentFinder from '../apis/StudentFinder';
import { StudentiContext } from '../context/StudentiContext';
import './Tables.css';
import Swal from 'sweetalert2';
import { BiEdit } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';
import { fetchRestrictedInfo } from '../apis/AuthFinder';


const StudentList = () => {

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

  const { studenti, setStudenti } = useContext(StudentiContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StudentFinder.get("/");
        // console.log(response.data.data.studenti)
        setStudenti(response.data.data.studenti);
      } catch (error) { }
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
          StudentFinder.delete(`/${id}`);
          if (isRestricted.current === true) {
            setStudenti(studenti.filter(student => {
              return student.id !== id
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
              text: "Nu sunteți autorizat!",
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
              <th scope='col'>Email</th>
              <th scope='col'>Email institutional</th>
              <th scope='col'>An inscriere</th>
              <th scope='col'>An curent student</th>
              <th scope='col'>Specializare</th>
              <th scope='col'>Grupa</th>
              <th scope='col'>Actiuni</th>
            </tr>
          </thead>
          <tbody>
            {studenti && studenti.filter(s => s.id > 0).map(student => {
              return (
                <tr key={student.id}>
                  <td>{student.nume.toUpperCase()}</td>
                  <td>{student.prenume}</td>
                  <td>{student.email}</td>
                  <td>{student.email_institutional}</td>
                  <td>{student.an_inscriere}</td>
                  <td>{student.an_curent_student}</td>
                  <td>{student.specializare}</td>
                  <td>{student.grupa}</td>
                  <td>
                    <button className='btn btn-outline-dark btn-sm'><BiEdit size="1.5em" /></button>
                    <button onClick={() => handleDelete(student.id)} className='btn btn-outline-danger btn-sm'><TiDelete size="1.5em" /></button>
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

export default StudentList

