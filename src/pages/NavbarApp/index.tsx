import "../../index.css";
import { useLanguage } from '../../context/LanguageContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { BiLogOut } from "react-icons/bi";
import Auth from "../../context/Auth";

export default function NavbarApp() {
  const { strings } = useLanguage();
  const navigate = useNavigate();

  const Logout = () => {
    Auth.logout();
    navigate("/");
  };

  return (
    <>
      <Navbar className="custom-navbar" expand="lg" fixed="top">
        <Navbar.Brand as={Link} to="/">
          {/* <img className='navbar-logo' src={logo} alt="Logo" /> */}
          <span className='navbar-logo'>{Auth.user?.username ? Auth.user.username.charAt(0).toUpperCase() + Auth.user.username.slice(1) : 'User'}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <div style={{ marginLeft: '15px' }}><Nav.Link className='navbar-link' as={Link} to="/Notes">{strings.notes_title}</Nav.Link></div>
            <div style={{ marginLeft: '15px' }}><Nav.Link className='navbar-link' as={Link} to="/Settings">{strings.settings_title}</Nav.Link></div>
          </Nav>
          <Nav className="logout-container">
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
