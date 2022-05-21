import React from 'react';
import TemeList from '../../components/TemeList';
import { TemeContextProvider } from '../../context/TemeContext';
import AddTema from '../../components/AddTema';

const Teme = () => {
  return (
    <TemeContextProvider>
    <div>
      <div className='btn-toolbar'>
        <div className='btn-group-2'>
          <AddTema />  
        </div>
      </div>
      <TemeList />
    </div>
    </TemeContextProvider>
  )
}

export default Teme;