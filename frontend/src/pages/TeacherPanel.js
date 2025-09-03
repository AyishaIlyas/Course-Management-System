import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert, Spinner } from 'react-bootstrap';

const TeacherPanel = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulate loading teacher courses
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          code: 'CS101',
          title: 'Introduction to Computer Science',
          credits: 3,
          enrollments: 25
        },
        {
          id: 2,
          code: 'CS201',
          title: 'Data Structures and Algorithms',
          credits: 4,
          enrollments: 18
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

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
          <h1>Teacher Panel</h1>
          <p className="lead">Manage your courses and student grades</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <h4>My Courses</h4>
            </Card.Header>
            <Card.Body>
              {courses.length === 0 ? (
                <Alert variant="info">No courses assigned yet.</Alert>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Title</th>
                      <th>Credits</th>
                      <th>Enrollments</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td>{course.code}</td>
                        <td>{course.title}</td>
                        <td>{course.credits}</td>
                        <td>{course.enrollments}</td>
                        <td>
                          <Button variant="primary" size="sm" className="me-2">
                            View Students
                          </Button>
                          <Button variant="success" size="sm">
                            Manage Grades
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
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Quick Actions</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <Button variant="outline-primary" className="w-100 mb-2">
                    Upload Materials
                  </Button>
                </Col>
                <Col md={3}>
                  <Button variant="outline-success" className="w-100 mb-2">
                    Grade Assignments
                  </Button>
                </Col>
                <Col md={3}>
                  <Button variant="outline-warning" className="w-100 mb-2">
                    Send Announcements
                  </Button>
                </Col>
                <Col md={3}>
                  <Button variant="outline-info" className="w-100 mb-2">
                    View Analytics
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TeacherPanel;
