import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert, Spinner } from 'react-bootstrap';

const StudentPanel = () => {
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    // Simulate loading student enrollments
    setTimeout(() => {
      setEnrollments([
        {
          id: 1,
          course: {
            code: 'CS101',
            title: 'Introduction to Computer Science',
            credits: 3
          },
          grade: 'A',
          score: 95.0,
          enrollmentDate: '2024-01-15'
        },
        {
          id: 2,
          course: {
            code: 'MATH101',
            title: 'Calculus I',
            credits: 4
          },
          grade: 'B+',
          score: 87.5,
          enrollmentDate: '2024-01-15'
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
          <h1>Student Panel</h1>
          <p className="lead">View your enrolled courses and academic progress</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <h4>My Enrolled Courses</h4>
            </Card.Header>
            <Card.Body>
              {enrollments.length === 0 ? (
                <Alert variant="info">You are not enrolled in any courses yet.</Alert>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Title</th>
                      <th>Credits</th>
                      <th>Grade</th>
                      <th>Score</th>
                      <th>Enrollment Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map((enrollment) => (
                      <tr key={enrollment.id}>
                        <td>{enrollment.course.code}</td>
                        <td>{enrollment.course.title}</td>
                        <td>{enrollment.course.credits}</td>
                        <td>
                          <span className={`badge bg-${enrollment.grade === 'A' ? 'success' : 
                            enrollment.grade === 'B' ? 'info' : 'warning'}`}>
                            {enrollment.grade}
                          </span>
                        </td>
                        <td>{enrollment.score}%</td>
                        <td>{enrollment.enrollmentDate}</td>
                        <td>
                          <Button variant="primary" size="sm">
                            View Details
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
              <h4>Academic Summary</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <div className="text-center">
                    <h5>Total Credits</h5>
                    <p className="h3 text-primary">
                      {enrollments.reduce((sum, e) => sum + e.course.credits, 0)}
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center">
                    <h5>GPA</h5>
                    <p className="h3 text-success">3.75</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center">
                    <h5>Courses</h5>
                    <p className="h3 text-info">{enrollments.length}</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center">
                    <h5>Status</h5>
                    <p className="h3 text-warning">Good Standing</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentPanel;
