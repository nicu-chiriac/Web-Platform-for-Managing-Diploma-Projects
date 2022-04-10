import React from 'react';
import AddStudent from '../../components/AddStudent';
import StudentList from '../../components/StudentList';
import { StudentiContextProvider } from '../../context/StudentiContext';

const Studenti = () => {
  return (
    <StudentiContextProvider>
      <div>
        <AddStudent />
        <StudentList />
      </div>
    </StudentiContextProvider>
  )
}

export default Studenti;