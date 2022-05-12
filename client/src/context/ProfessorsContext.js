import React, { useState, createContext } from 'react';

export const ProfessorsContext = createContext();

export const ProfessorsContextProvider = props => {
  const [professors, setProfessors] = useState([])

  const addProfessor = (professor) => {
    setProfessors([...professors, professor]);
  }

  return (
    <ProfessorsContext.Provider value={{professors, setProfessors, addProfessor}}>
      {props.children}
    </ProfessorsContext.Provider>
  );
}
