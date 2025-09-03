import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert, Button } from 'react-bootstrap';
import enrollmentService from '../services/enrollmentService';
import courseService from '../services/courseService';

const CourseEnrollment = () => {
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllEnrollments = async () => {
      try {
        const courses = await courseService.getCourses();
        let allEnrollments = [];
        for (let course of courses) {
          const data = await enrollmentService.getEnrollmentsByCourse(course.id);
          allEnrollments = [...allEnrollments, ...data];
        }
        setEnrollments(allEnrollments);
      } catch (err) {
        console.error(err);
        setError('Failed to load enrollments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllEnrollments();
  }, []);

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container>
      <h2>Enrollment Reports</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Course</th>
            <th>Grade</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enr) => (
            <tr key={enr.id}>
              <td>{enr.id}</td>
              <td>{enr.student?.username || enr.studentId}</td>
              <td>{enr.course?.title || enr.courseId}</td>
              <td>{enr.grade || '-'}</td>
              <td>{enr.score || '-'}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={async () => {
                    await enrollmentService.removeEnrollment(enr.id);
                    setEnrollments(enrollments.filter(e => e.id !== enr.id));
                  }}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CourseEnrollment;