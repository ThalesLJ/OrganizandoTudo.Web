import "./styles.css";
import { useLanguage } from '../../context/LanguageContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/O-positivo-simples.png';
import { BiLogOut } from "react-icons/bi";
import Auth from "../../context/Auth";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function BaseApp() {
  const { strings, changeLanguage, language } = useLanguage();

  const handleLanguageChange = (event: SelectChangeEvent<'en' | 'pt'>) => {
    changeLanguage(event.target.value as 'en' | 'pt');
  };

  const navigate = useNavigate();

  const Logout = () => {
    Auth.logout();
    navigate("/");
  };

  return (
    <>
      <Navbar className="custom-navbar" expand="lg" fixed="top">
        <Navbar.Brand as={Link} to="/">
          <img className='navbar-logo' src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className='navbar-link' as={Link} to="/Notes">{strings.notes_title}</Nav.Link>
            <Nav.Link className='navbar-link' as={Link} to="/Settings">{strings.settings_title}</Nav.Link>
          </Nav>
          <Nav className="logout-container">
            <Select className="custom-select" value={language} onChange={handleLanguageChange} displayEmpty inputProps={{ 'aria-label': 'Select Language' }}>
              <MenuItem value={'en'} className="custom-select-menu-item">EN</MenuItem>
              <MenuItem value={'pt'} className="custom-select-menu-item">PT</MenuItem>
            </Select>
            <Nav.Link onClick={Logout} className="logout-icon">
              <BiLogOut size={24} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div> {/* Ajusta o padding para evitar que o conteúdo fique embaixo da navbar */}
        <Outlet></Outlet>
      </div>
    </>
  )
}
