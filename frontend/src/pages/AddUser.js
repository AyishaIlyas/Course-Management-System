import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const AddUser = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', role: 'ROLE_STUDENT' });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User added:', formData);
    setSuccess('User successfully added!');
    setFormData({ firstName: '', lastName: '', email: '', role: 'ROLE_STUDENT' });
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Add New User</h1>
        </Col>
      </Row>
      {success && <Alert variant="success">{success}</Alert>}
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange}>
                <option value="ROLE_ADMIN">Admin</option>
                <option value="ROLE_TEACHER">Teacher</option>
                <option value="ROLE_STUDENT">Student</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit">Add User</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddUser;
