import React, { useState, createContext } from 'react';

export const FilesContext = createContext();

export const FilesContextProvider = props => {
  const [files, setFiles] = useState([])

  return (
    <FilesContext.Provider value={{files, setFiles}}>
      {props.children}
    </FilesContext.Provider>
  );
}