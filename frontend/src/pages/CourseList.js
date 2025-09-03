import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import courseService from '../services/courseService';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Available Courses</h1>
          <p className="lead">Browse all available courses in the system</p>
        </Col>
      </Row>

      {courses.length === 0 ? (
        <Alert variant="info">No courses available at the moment.</Alert>
      ) : (
        <Row>
          {courses.map((course) => (
            <Col key={course.id} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {course.code} - {course.credits} credits
                  </Card.Subtitle>
                  <Card.Text>{course.description}</Card.Text>
                  
                  {course.teacher && (
                    <p className="text-muted">
                      <small>Instructor: {course.teacher.firstName} {course.teacher.lastName}</small>
                    </p>
                  )}
                  
                  {user?.role === 'ROLE_STUDENT' && (
                    <Button variant="primary" size="sm">
                      View Details
                    </Button>
                  )}
                  
                  {user?.role === 'ROLE_ADMIN' && (
                    <div>
                      <Button variant="warning" size="sm" className="me-2">
                        Edit
                      </Button>
                      <Button variant="danger" size="sm">
                        Delete
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CourseList;
