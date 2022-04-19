import React from 'react';
import AddStudent from '../../components/AddStudent';
import ImportCSVStudenti from '../../components/ImportCSVStudenti';
import ExportCSVStudenti from '../../components/ExportCSVStudenti';
import StudentList from '../../components/StudentList';
import { StudentiContextProvider } from '../../context/StudentiContext';
import '../../components/ButtonsCSS.css';
import SearchBar from '../../components/SearchBar';

const Studenti = () => {

  return (
    <StudentiContextProvider>
    <div>
      <div className='btn-toolbar'>
        <div className='search'>
          <SearchBar />
        </div>
        <div className='btn-group-1'>
          <ImportCSVStudenti />
        </div>
        <div className='btn-group-1'>
          <ExportCSVStudenti />
        </div>
        <div className='btn-group-2'>
          <AddStudent />  
        </div>
      </div>
      <StudentList />
    </div>
    </StudentiContextProvider>
  )
}

export default Studenti;