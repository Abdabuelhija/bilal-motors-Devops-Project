import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Logo from '../GeneralStyles/Logo.png';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './NavStyle.css';

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse
} from 'mdb-react-ui-kit';

export default function Navbar({ setUser }) {
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(localStorage.getItem('user'));
  };
  const [showNav, setShowNav] = useState(false);
  return (
    <MDBNavbar expand='lg' light bgColor='dark'>
      <MDBContainer fluid>
        <MDBNavbarBrand href="/Stock" style={{color:'white'}}>מלאי</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNav(!showNav)}
        >
          <FontAwesomeIcon icon={faBars} size='1x' style={{color:'white'}}/>
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink href="/Sold" style={{color:'white'}}>נמכר</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/Search' style={{color:'white'}}> <FontAwesomeIcon icon={faMagnifyingGlass} /> חיפוש</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink onClick={handleLogout} href='/Search' style={{color:'white'}}> <FontAwesomeIcon icon={faRightFromBracket} /> יציאה</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
        <MDBNavbarLink href='/' style={{color:'white'}}> <img src={Logo} alt="Logo" className="NavLogo" /></MDBNavbarLink>
      </MDBContainer>
    </MDBNavbar>
  );
}
