import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert, Spinner, Form } from 'react-bootstrap';
import courseService from '../services/courseService';

const CourseRegistration = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCourses();
    loadEnrolledCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (err) {
      setError('Failed to load available courses');
    } finally {
      setLoading(false);
    }
  };

  const loadEnrolledCourses = async () => {
    // Simulate loading enrolled courses
    setEnrolledCourses([
      { id: 1, course: { code: 'CS101', title: 'Introduction to Computer Science' } }
    ]);
  };

  const handleEnroll = async (courseId) => {
    try {
      // Simulate enrollment
      const course = courses.find(c => c.id === courseId);
      setEnrolledCourses([...enrolledCourses, { id: Date.now(), course }]);
      setCourses(courses.filter(c => c.id !== courseId));
    } catch (err) {
      setError('Failed to enroll in course');
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

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Course Registration</h1>
          <p className="lead">Enroll in available courses for the current semester</p>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h4>Available Courses</h4>
            </Card.Header>
            <Card.Body>
              {courses.length === 0 ? (
                <Alert variant="info">No courses available for registration.</Alert>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Title</th>
                      <th>Credits</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td>{course.code}</td>
                        <td>{course.title}</td>
                        <td>{course.credits}</td>
                        <td>{course.description}</td>
                        <td>
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => handleEnroll(course.id)}
                          >
                            Enroll
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h4>My Enrolled Courses</h4>
            </Card.Header>
            <Card.Body>
              {enrolledCourses.length === 0 ? (
                <Alert variant="info">You are not enrolled in any courses.</Alert>
              ) : (
                <div>
                  {enrolledCourses.map((enrollment) => (
                    <div key={enrollment.id} className="mb-2 p-2 border rounded">
                      <strong>{enrollment.course.code}</strong><br />
                      <small>{enrollment.course.title}</small>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseRegistration;
