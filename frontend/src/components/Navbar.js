import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_TEACHER':
        return 'Teacher';
      case 'ROLE_STUDENT':
        return 'Student';
      default:
        return 'User';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          University CMS
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
            
            {user?.role === 'ROLE_STUDENT' && (
              <>
                <Nav.Link as={Link} to="/register-course">Register for Courses</Nav.Link>
                <Nav.Link as={Link} to="/results">My Results</Nav.Link>
              </>
            )}
            
            {user?.role === 'ROLE_TEACHER' && (
              <Nav.Link as={Link} to="/teacher">Teacher Panel</Nav.Link>
            )}
            
            {user?.role === 'ROLE_ADMIN' && (
              <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>
            )}
          </Nav>
          
          <Nav className="ms-auto">
            <Navbar.Text className="me-3">
              {user?.firstName} {user?.lastName} ({getRoleDisplayName(user?.role)})
            </Navbar.Text>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
