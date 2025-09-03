import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Alert, Spinner, ProgressBar } from 'react-bootstrap';

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallGPA, setOverallGPA] = useState(0);

  useEffect(() => {
    // Simulate loading results
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          course: {
            code: 'CS101',
            title: 'Introduction to Computer Science',
            credits: 3
          },
          grade: 'A',
          score: 95.0,
          semester: 'Fall 2024'
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
          semester: 'Fall 2024'
        },
        {
          id: 3,
          course: {
            code: 'ENG101',
            title: 'English Composition',
            credits: 3
          },
          grade: 'A-',
          score: 92.0,
          semester: 'Fall 2024'
        }
      ];
      
      setResults(mockResults);
      
      // Calculate GPA (simplified)
      const totalPoints = mockResults.reduce((sum, result) => {
        const gradePoints = {
          'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0,
          'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7,
          'D+': 1.3, 'D': 1.0, 'F': 0.0
        };
        return sum + (gradePoints[result.grade] * result.course.credits);
      }, 0);
      
      const totalCredits = mockResults.reduce((sum, result) => sum + result.course.credits, 0);
      setOverallGPA(totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0);
      
      setLoading(false);
    }, 1000);
  }, []);

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'success';
    if (grade.startsWith('B')) return 'info';
    if (grade.startsWith('C')) return 'warning';
    if (grade.startsWith('D')) return 'warning';
    return 'danger';
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
          <h1>Academic Results</h1>
          <p className="lead">View your grades and academic performance</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Overall GPA</Card.Title>
              <Card.Text className="display-4 text-primary">{overallGPA}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Credits</Card.Title>
              <Card.Text className="display-4 text-success">
                {results.reduce((sum, result) => sum + result.course.credits, 0)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Courses Completed</Card.Title>
              <Card.Text className="display-4 text-info">{results.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Detailed Results</h4>
            </Card.Header>
            <Card.Body>
              {results.length === 0 ? (
                <Alert variant="info">No results available yet.</Alert>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Title</th>
                      <th>Credits</th>
                      <th>Grade</th>
                      <th>Score</th>
                      <th>Semester</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result) => (
                      <tr key={result.id}>
                        <td>{result.course.code}</td>
                        <td>{result.course.title}</td>
                        <td>{result.course.credits}</td>
                        <td>
                          <span className={`badge bg-${getGradeColor(result.grade)}`}>
                            {result.grade}
                          </span>
                        </td>
                        <td>{result.score}%</td>
                        <td>{result.semester}</td>
                        <td>
                          <ProgressBar 
                            now={result.score} 
                            variant={result.score >= 90 ? 'success' : result.score >= 80 ? 'info' : 'warning'}
                            label={`${result.score}%`}
                          />
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
    </Container>
  );
};

export default Results;
