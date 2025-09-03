import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import statsService from '../services/statsService';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statsService.getStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Admin Panel</h1>
          <p className="lead">System administration and management</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="display-4">{stats.totalUsers}</Card.Text>
              <Button variant="primary" onClick={() => navigate('/add-user')}>
                Manage Users
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Courses</Card.Title>
              <Card.Text className="display-4">{stats.totalCourses}</Card.Text>
              <Button variant="success" onClick={() => navigate('/create-course')}>
                Manage Courses
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Enrollments</Card.Title>
              <Card.Text className="display-4">{stats.totalEnrollments}</Card.Text>
              <Button variant="info" onClick={() => navigate('/enrollment')}>
                View Enrollments
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default AdminPanel;
