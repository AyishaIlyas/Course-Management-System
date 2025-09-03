import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const SystemSettings = () => {
  return (
    <Container>
      <Row className="mb-4">
        <Col><h1>System Settings</h1></Col>
      </Row>
      <Card>
        <Card.Body>
          <p>Here you can configure system-wide settings.</p>
          <Button variant="primary">Update Settings</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SystemSettings;
