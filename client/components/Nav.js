import React from 'react';
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <ul className='nav-bar'>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/campuses'>Campuses</NavLink></li>
      <li><NavLink to='/students'>Students</NavLink></li>
    </ul>
  )
}

export default Nav;