import React from 'react';
import UpdateTema from '../../components/UpdateTema';
import { StudentiContextProvider } from '../../context/StudentiContext';
import { ProfessorsContextProvider } from '../../context/ProfessorsContext';
// import SearchTemeStudent from '../../components/SearchTemeStudent';
// import SearchTemeProfessors from '../../components/SearchTemeProfessor';
// import '../../components/styles/UpdateTemePage.css';
import { TemeContextProvider } from '../../context/TemeContext';

const UpdateTemePage = () => {
  return (
    <div>
      <h1 className='text-center'>Update Tema</h1>
      <TemeContextProvider>
        <StudentiContextProvider>
          <ProfessorsContextProvider>
            <UpdateTema />
          </ProfessorsContextProvider>
        </StudentiContextProvider>
      </TemeContextProvider>
    </div>
  )
}

export default UpdateTemePage
