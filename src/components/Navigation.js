import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { logout } from "../features/userSlice";

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispach = useDispatch();

  function handleLogout() {
    dispach(logout());
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>ECOMERN</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* sans utilisateur */}
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Connexion</Nav.Link>
              </LinkContainer>
            )}

            {/* avec utilisateur */}
            {user && (
              <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                {user.isAdmin && (
                  <>
                    <LinkContainer to="/dashboard">
                      <NavDropdown.Item>Tableau de bord</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/new-product">
                      <NavDropdown.Item>Ajouter un produit</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}

                {!user.isAdmin && (
                  <>
                    <LinkContainer to="/cart">
                      <NavDropdown.Item>Mon panier</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/order">
                      <NavDropdown.Item>Mes commandes</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}

                <NavDropdown.Divider />
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Se déconnecter
                </Button>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
