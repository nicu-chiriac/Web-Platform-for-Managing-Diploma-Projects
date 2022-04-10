import React, { useContext, useEffect } from 'react';
import StudentFinder from '../apis/StudentFinder';
import { StudentiContext } from '../context/StudentiContext';
import './StudentList.css';

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
                  <button className='btn btn-outline-danger btn-sm'>Delete</button>
                </td>
            </tr>
            )
          })}
            
           
          {/* <tr>
            <td>Chiriac</td>
            <td>Nicu-Manuel</td>
            <td>nicu.chiriac99@yahoo.com</td>
            <td>nicu_manuel.chiriac@stud.fiir.upb.ro</td>
            <td>2018</td>
            <td>4</td>
            <td>IAII</td>
            <td>641AD</td>
            <td>
              <button className='btn btn-outline-warning btn-sm'>Update</button>
              <button className='btn btn-outline-danger btn-sm'>Delete</button>
            </td>
          </tr>

          <tr>
            <td>Chiriac</td>
            <td>Nicu</td>
            <td>nicu.chiriac99@yahoo.com</td>
            <td>nicu_manuel.chiriac@stud.fiir.upb.ro</td>
            <td>2018</td>
            <td>4</td>
            <td>IAII</td>
            <td>641AD</td>
            <td>
              <button className='btn btn-outline-warning btn-sm'>Update</button>
              <button className='btn btn-outline-danger btn-sm'>Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default StudentList
