import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Navbar.css'; // 👈 Import custom styles (you’ll create this file)

function AppNavbar({ isAuthenticated }) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm py-2">
      <Container>
        <Navbar.Brand as={Link} to="/">
  
  <span style={{
    fontFamily: "'Poppins', sans-serif",
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#0d6efd",  // Bootstrap primary blue
    letterSpacing: "0.5px"
  }}>
    Upwise
  </span>
</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            {!isAuthenticated && (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
