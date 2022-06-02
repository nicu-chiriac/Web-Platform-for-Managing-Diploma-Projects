import React from 'react';
import UpdateTema from '../../components/UpdateTema';
import { StudentiContextProvider } from '../../context/StudentiContext';
import { ProfessorsContextProvider } from '../../context/ProfessorsContext';
import { TemeContextProvider } from '../../context/TemeContext';
import  "../../components/styles/UpdateTemePage.css"

const UpdateTemePage = () => {
  return (
    <div>
      <h1 className='title-teme-page'>Modifică datele temei</h1>
      <img className="vecteezy" src="/school_01.jpg" alt="students and books. Img from vecteezy.com" />
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
