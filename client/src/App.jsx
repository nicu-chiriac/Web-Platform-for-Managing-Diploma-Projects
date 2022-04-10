import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Acasa from './pages/Acasa/Acasa';
import Profesori from './pages/Profesori/Profesori';
import Profil from './pages/Profil/Profil';
import Studenti from './pages/Studenti/Studenti';
import Teme from './pages/Teme/Teme';
import UpdateStudenti from './pages/Studenti/UpdateStudenti';


const App = () => {
  return (
  <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Acasa />} />
        <Route path='/profesori' element={<Profesori />} />
        <Route path='/profil' element={<Profil />} />
        <Route path='/studenti' element={<Studenti />} />
        <Route path='/studenti/:id/update' element={<UpdateStudenti />} />
        <Route path='/Teme' element={<Teme />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;