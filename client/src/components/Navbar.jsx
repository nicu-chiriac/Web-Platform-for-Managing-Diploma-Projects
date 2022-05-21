import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdLogin } from 'react-icons/md';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { onLogout } from '../apis/AuthFinder';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { VscDebugStart } from 'react-icons/vsc';
import { ImLink } from 'react-icons/im';
import Swal from 'sweetalert2';


const Navbar= () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  
  const dispatch = useDispatch()
  
  const {isAuth} = useSelector((state) => state.auth)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
      Swal.fire({      
        position: 'bottom-start',
        title: "Delogare reușită!",
        button: "OK!",
        timer: 2500,
        timerProgressBar: true,
        allowOutsideClick: true
      });
    } catch (error) {
      console.log(error.response)
    }
  }
 
  return (
    <>
    <IconContext.Provider value={{color:  '#fff'}}>
      <div className="navbar">
        <Link to="#" className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
        <NavLink to='/'>
          <button className='page-icons'>Pagina de start<VscDebugStart size="1.5em" /></button>
        </NavLink>
        <button 
          className='fiir-link' 
          onClick={(e) => {
            e.preventDefault();
            window.open("http://www.fiir.upb.ro/index.php/ro/", "_blank");
          }}>
          Site FIIR <ImLink />
        </button>
        {isAuth ? (
          <div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to="#" className='menu-bars'>
                  <AiIcons.AiFillCloseSquare />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className='spanitems'>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
            </nav>
            <button onClick={() => logout()} className='logoutbutton'><BiLogOut /> Logout</button>
          </div>
        ) : (
          <div className="authbuttons">
            <NavLink to='/login'>
              <button className='navlinkbuttons'><MdLogin /> Login</button>
            </NavLink>

            <NavLink to='/register'>
              <button className='navlinkbuttons'><BsFillPersonPlusFill /> Register</button>
            </NavLink>
          </div>
        )}
      </div>
    </IconContext.Provider>
    </>
  )
}

export default Navbar;
