import React, { useState, createContext } from 'react';

export const StudentiContext = createContext();

export const StudentiContextProvider = props => {
  const [studenti, setStudenti] = useState([])

  const addStudent = (student) => {
    setStudenti([...studenti, student]);
  }

  return (
    <StudentiContext.Provider value={{studenti, setStudenti, addStudent}}>
      {props.children}
    </StudentiContext.Provider>
  );
}


