import React from 'react';
// import './StudentList.css';

const ProfesoriList = () => {
  return (
    <div>
      <div className='list-group'>
        <table className='table table-hover table-default'>
          <thead>
            <tr className='bg-light'>
              <th scope='col'>Nume</th>
              <th scope='col'>Prenume</th>
              <th scope='col'>Grad didactic</th>
              <th scope='col'>Grad stiintific</th>
              <th scope='col'>Email</th>
              <th scope='col'>Email institutional</th>
              <th scope='col'>Numar curent studenti</th>
              <th scope='col'>Actiuni</th>
            </tr>
          </thead>
          <tbody>
            <td>Tarbă</td>
            <td>Ioan-Cristian</td>
            <td>A</td>
            <td>B</td>
            <td>x@yahoo.com</td>
            <td>y@upb.ro</td>
            <td>4</td>
            <td>
              <button className='btn btn-outline-warning btn-sm'>Update</button>
              <button className='btn btn-outline-danger btn-sm'>Delete</button>
            </td>      
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfesoriList
