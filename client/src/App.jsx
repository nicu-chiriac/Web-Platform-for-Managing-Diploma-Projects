import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom';
import './App.css';
import Acasa from './pages/Acasa/Acasa';
import Profesori from './pages/Profesori/Profesori';
import Profil from './pages/Profil/Profil';
import Studenti from './pages/Studenti/Studenti';
import Teme from './pages/Teme/Teme';
import UpdateStudenti from './pages/Studenti/UpdateStudenti';
import LandingPage from './pages/Autentificare/landingpage';
import Login from './pages/Autentificare/login';
import Register from './pages/Autentificare/register';
import { useSelector } from 'react-redux';
import { fetchProtectedInfo } from './apis/AuthFinder'
import UpdateTemePage from './pages/Teme/UpdateTemePage';

let isProtected = false

const protectedInfo = async () => {
  try {
    await fetchProtectedInfo()
    isProtected = true
  } catch (error) {
    
  }
}
protectedInfo();
console.log("APP log " + isProtected)

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isProtected && isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!(isAuth && isProtected) ? <Outlet /> : <Navigate to='/acasa' />}</>
}

const App = () => {
  
  return (
  <>
    <Router>
      <Navbar />
      <Routes>
        
        <Route path='/' element={<LandingPage />} />
        
        <Route element={<PrivateRoutes />}>
          <Route path='/acasa' element={<Acasa />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profesori' element={<Profesori />} />
          <Route path='/profil' element={<Profil />} />
          <Route path='/studenti' element={<Studenti />} />
          <Route path='/studenti/:id/update' element={<UpdateStudenti />} />
          <Route path='/teme' element={<Teme />} />
          <Route path='/teme/:id/update' element={<UpdateTemePage />} />
        </Route>
       
        <Route element={<RestrictedRoutes />}>
          <Route path='/login' element={<Login />} />
        </Route>
       
      </Routes>
    </Router>
  </>
  );
}

export default App;