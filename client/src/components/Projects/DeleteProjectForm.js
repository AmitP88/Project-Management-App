import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteProjectForm = () => {
  return (
    <Form>
      <Form.Group controlId="formProjectName">
        <Form.Label>
          This action <strong>cannot</strong> be undone.
          This will permanently delete the (project name) project,
          along with all of the projects' content including:
          descriptions, uploaded files, created tasks and progress %,
          hours logged, and deadlines.
        </Form.Label>
        <Form.Control
          plaintext 
          readOnly 
          defaultValue="Please type (project name) to confirm."
          style={{textAlign: 'left'}}
        />
        <Form.Control type="text" />
      </Form.Group>
    </Form>
  );
}

export default DeleteProjectForm;