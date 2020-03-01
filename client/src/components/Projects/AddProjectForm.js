import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProjectForm = () => {
  return (
    <Form>
      <Form.Group controlId="formProjectName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter project name"
          maxLength={10}
        />
      </Form.Group>
      <Form.Group controlId="formDeadline">
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="date"
        />
      </Form.Group>
    </Form>    
  );
}

export default AddProjectForm;