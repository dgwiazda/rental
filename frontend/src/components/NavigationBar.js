import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import styled from "styled-components";

import { logout } from "../actions/auth";

const Styles = styled.div`
  .navbar-nav {
    width: 400px;
  }
  .dropdown-menu {
    a:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const NavigationBar = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };
  return (
    <Styles>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/" className="mr-auto ml-5">
          Hehe
        </Navbar.Brand>
        <Nav>
          {showAdminBoard && (
            <Nav.Link href={"/admin"} className="mr-auto">
              Admin Board
            </Nav.Link>
          )}

          <Nav.Link className="mr-auto" href="/contact">
            Kontakt
          </Nav.Link>

          {currentUser ? (
            <NavDropdown
              className="mr-auto"
              title={currentUser.username}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/user/orders">
                Zamówienia
              </NavDropdown.Item>
              <NavDropdown.Item href="/user/profile">Profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/signin" onClick={logOut}>
                Wyloguj
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link className="mr-auto" href="/signin">
              Zaloguj się
            </Nav.Link>
          )}
        </Nav>
      </Navbar>
    </Styles>
  );
};

export default NavigationBar;
