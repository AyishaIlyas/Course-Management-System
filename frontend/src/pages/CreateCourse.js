import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import courseService from '../services/courseService';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onSuccess = location.state?.onSuccess; // callback passed from AdminPanel

  const [course, setCourse] = useState({
    code: '',
    title: '',
    description: '',
    credits: 1
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await courseService.createCourse(course);
      setSuccess('✅ Course created successfully!');
      setError('');

      // refresh stats in AdminPanel if callback exists
      if (onSuccess) onSuccess();

      // redirect after short delay
      setTimeout(() => navigate('/admin'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || '❌ Failed to create course');
      setSuccess('');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="my-4">Create New Course</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Course Code</Form.Label>
              <Form.Control
                name="code"
                value={course.code}
                onChange={handleChange}
                required
                placeholder="e.g. CS101"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={course.title}
                onChange={handleChange}
                required
                placeholder="e.g. Introduction to Computer Science"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={course.description}
                onChange={handleChange}
                placeholder="Brief description of the course"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Credits</Form.Label>
              <Form.Control
                type="number"
                name="credits"
                value={course.credits}
                min="1"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate('/admin')}>
                Cancel
              </Button>
              <Button type="submit" variant="success">
                Create Course
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCourse;
