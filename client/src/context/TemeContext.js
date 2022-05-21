import React, { useState, createContext } from 'react';

export const TemeContext = createContext();

export const TemeContextProvider = props => {
  const [teme, setTeme] = useState([])

  const addTema = (tema) => {
    setTeme([...teme, tema]);
  }

  return (
    <TemeContext.Provider value={{teme, setTeme, addTema}}>
      {props.children}
    </TemeContext.Provider>
  );
}