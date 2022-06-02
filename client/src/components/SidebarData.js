import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
// import * as ImIcons from 'react-icons/im';


export const SidebarData = [
  {
    title: 'Acasa',
    path: '/acasa',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Profesori',
    path: '/profesori',
    icon: <FaIcons.FaUniversity />,
    cName: 'nav-text'
  },
  {
    title: 'Studenti',
    path: '/studenti',
    icon: <MdIcons.MdSchool />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Profil',
  //   path: '/profil',
  //   icon: <ImIcons.ImProfile />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Teme',
    path: '/teme',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
]