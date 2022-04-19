import React, { useContext, useEffect } from 'react';
import StudentFinder from '../apis/StudentFinder';
import { StudentiContext } from '../context/StudentiContext';
import './StudentList.css';
import Swal from 'sweetalert2';

const StudentList = () => {
  const {studenti, setStudenti}= useContext(StudentiContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StudentFinder.get("/");
        setStudenti(response.data.data.studenti);
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
          StudentFinder.delete(`/${id}`);
          setStudenti(studenti.filter(student => {
            return student.id !== id
          }))
        } catch (error) {
          console.log(error)
        }
        Swal.fire(
          'Șters!',
          'înregistrarea a fost ștearsă cu succes.',
          'info'
        )
      }
    }) 
  }
  
  return (
    <div className='list-group'>
      <table className='table table-hover table-default'>
        <thead>
          <tr className='bg-light'>
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
          {studenti && studenti.map(student => {
            return (
              <tr key = {student.id}>
                <td>{student.nume}</td>
                <td>{student.prenume}</td>
                <td>{student.email}</td>
                <td>{student.email_institutional}</td>
                <td>{student.an_inscriere}</td>
                <td>{student.an_curent_student}</td>
                <td>{student.specializare}</td>
                <td>{student.grupa}</td>
                <td>
                  <button className='btn btn-outline-warning btn-sm'>Update</button>
                  <button onClick={() => handleDelete(student.id)} className='btn btn-outline-danger btn-sm'>Delete</button>
                </td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StudentList

