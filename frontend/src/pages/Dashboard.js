import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    switch (user?.role) {
      case 'ROLE_ADMIN':
        return 'Welcome to the Admin Dashboard';
      case 'ROLE_TEACHER':
        return 'Welcome to the Teacher Dashboard';
      case 'ROLE_STUDENT':
        return 'Welcome to the Student Dashboard';
      default:
        return 'Welcome to the Dashboard';
    }
  };

  const getDashboardActions = () => {
    switch (user?.role) {
      case 'ROLE_ADMIN':
        return (
          <>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Manage Users</Card.Title>
                  <Card.Text>Add, edit, and remove users from the system</Card.Text>
                  <Link to="/admin">
                    <Button variant="primary">Go to Admin Panel</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Manage Courses</Card.Title>
                  <Card.Text>Create and manage course offerings</Card.Text>
                  <Link to="/courses">
                    <Button variant="primary">View Courses</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>System Overview</Card.Title>
                  <Card.Text>Monitor system statistics and performance</Card.Text>
                  <Button variant="info">View Statistics</Button>
                </Card.Body>
              </Card>
            </Col>
          </>
        );
      case 'ROLE_TEACHER':
        return (
          <>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>My Courses</Card.Title>
                  <Card.Text>View and manage your assigned courses</Card.Text>
                  <Link to="/teacher">
                    <Button variant="primary">Go to Teacher Panel</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Grade Management</Card.Title>
                  <Card.Text>Assign grades and scores to students</Card.Text>
                  <Button variant="success">Manage Grades</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Course Content</Card.Title>
                  <Card.Text>Upload and manage course materials</Card.Text>
                  <Button variant="info">Manage Content</Button>
                </Card.Body>
              </Card>
            </Col>
          </>
        );
      case 'ROLE_STUDENT':
        return (
          <>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>My Courses</Card.Title>
                  <Card.Text>View your enrolled courses and progress</Card.Text>
                  <Link to="/student">
                    <Button variant="primary">Go to Student Panel</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Course Registration</Card.Title>
                  <Card.Text>Enroll in new courses for the semester</Card.Text>
                  <Link to="/register-course">
                    <Button variant="success">Register for Courses</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>My Results</Card.Title>
                  <Card.Text>View your grades and academic performance</Card.Text>
                  <Link to="/results">
                    <Button variant="info">View Results</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>{getWelcomeMessage()}</h1>
          <p className="lead">Hello, {user?.firstName} {user?.lastName}!</p>
        </Col>
      </Row>
      
      <Row>
        {getDashboardActions()}
      </Row>
    </Container>
  );
};

export default Dashboard;
