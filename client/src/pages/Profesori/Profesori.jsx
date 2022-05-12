import React from 'react';
import ProfessorsList from '../../components/ProfessorsList';
import { ProfessorsContextProvider } from '../../context/ProfessorsContext';
import AddProfessor from '../../components/AddProfessor';
import ImportCSVProfessors from '../../components/ImportCSVProfessors';
import ExportCSVStudenti from '../../components/ExportCSVStudenti';
import '../../components/ButtonsCSS.css';
import SearchBarProfessors from '../../components/SearchBarProfessors';


const Profesori = () => {
  return (
    <ProfessorsContextProvider>
    <div>
      <div className='btn-toolbar'>
        <div className='search'>
          <SearchBarProfessors />
        </div>
        <div className='btn-group-1'>
          <ImportCSVProfessors />
        </div>
        <div className='btn-group-1'>
          <ExportCSVStudenti />
        </div>
        <div className='btn-group-2'>
          <AddProfessor />  
        </div>
      </div>
      <ProfessorsList />
    </div>
    </ProfessorsContextProvider>
  )
}

export default Profesori;