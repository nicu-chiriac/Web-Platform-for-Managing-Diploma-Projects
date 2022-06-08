import React from 'react';
import UploadTema from './../../components/UploadTema';
import { StudentiContextProvider } from '../../context/StudentiContext';
import { ProfessorsContextProvider } from '../../context/ProfessorsContext';
import { TemeContextProvider } from '../../context/TemeContext';
import { FilesContextProvider } from '../../context/FilesContext';
import FilesList from './../../components/FilesList';

const UploadTemePage = () => {
  return (
    <div>
      <TemeContextProvider>
        <StudentiContextProvider>
          <ProfessorsContextProvider>
            <FilesContextProvider>
              <UploadTema />
              <FilesList />
            </FilesContextProvider>
          </ProfessorsContextProvider>
        </StudentiContextProvider>
      </TemeContextProvider>
    </div>
  )
}

export default UploadTemePage