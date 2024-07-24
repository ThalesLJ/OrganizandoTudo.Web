import * as React from 'react';
//import { Link } from 'react-router-dom';
import "./styles.css";
//import { AnimatePresence, motion } from 'framer-motion';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/icone-positivo/mipmap-xxxhdpi/icon.png';

export default function BaseApp() {
  return (
    <>
      <Navbar variant="dark" expand="lg" fixed="top" style={{ backgroundColor: '#a87861' }}>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" style={{ height: '50px', marginLeft: '20px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className='navbar-link' as={Link} to="/notes">Notes</Nav.Link>
            <Nav.Link className='navbar-link' as={Link} to="/settings">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ paddingTop: '70px' }}> {/* Ajusta o padding para evitar que o conteúdo fique embaixo da navbar */}
        <Outlet></Outlet>
      </div>
    </>
  )
}
