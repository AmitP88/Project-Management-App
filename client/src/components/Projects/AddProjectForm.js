import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProjectForm = () => {
  // Hooks for add project form
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');

  return (
    <Form>
      <Form.Group controlId="formProjectName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter project name"
          maxLength={10}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formDeadline">
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default AddProjectForm;