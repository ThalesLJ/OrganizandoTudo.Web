import "./styles.css";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/O-positivo-simples.png';
import { AiOutlineLogout } from 'react-icons/ai';
import Auth from "../../services/Auth";

export default function BaseApp() {
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
            <Nav.Link className='navbar-link' as={Link} to="/Notes">Notes</Nav.Link>
            <Nav.Link className='navbar-link' as={Link} to="/Settings">Settings</Nav.Link>
          </Nav>
          <Nav className="logout-container">
            <Nav.Link onClick={Logout} className="logout-icon">
              <AiOutlineLogout size={24} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ paddingTop: '70px' }}> {/* Ajusta o padding para evitar que o conteúdo fique embaixo da navbar */}
        <Outlet></Outlet>
      </div>
    </>
  )
}
