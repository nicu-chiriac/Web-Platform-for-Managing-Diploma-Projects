import React from 'react';
import '../../components/styles/acasa.css';

const Acasa = () => {
  return (
    <div className='acasa-container'>
      <div className='acasa-center-wrapper'>
        <img className='logo-facultate' src="/fiir_logo.png" alt="Fiir logo" />
        <h1 className='heading-acasa'>Bine ai venit!</h1>
      </div>
      <img className='triangles' src='/triangles.png' alt="triangles" />
    </div>
  )
}

export default Acasa;

