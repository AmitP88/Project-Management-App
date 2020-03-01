import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Projects.sass';
import './media_queries.sass';
import projectService from '../../services/projectService';

import VisibilitySensor from 'react-visibility-sensor';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Projects = () => {
  // Hook for getting projects
  const [projects, setprojects] = useState(null);

  // hooks for add project modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(!projects) {
      getProjects();
    }
  })

  const getProjects = async () => {
    let res = await projectService.getAll();
    console.log(res);
    setprojects(res);
  }

  const renderProject = project => {
    let id = project._id;
    let name = project.name;
    let deadline = project.deadline;
    let tasks_completed = project.tasks_completed;
    let total_tasks = project.total_tasks;
    let completed_percentage = ((tasks_completed/total_tasks)*100).toFixed(0);    

    return (
      <div key={id} className="projectTile">
        <h3 className="name">{name}</h3>
        <h4 className="deadline">{deadline}</h4>
        <div className="progress">
          <div className="progress_dial">
            <VisibilitySensor>
              {({ isVisible }) => {
                const percentage = isVisible ? completed_percentage : 0;
                return (
                  <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={percentage}
                    duration={1.4}
                    easingFunction={easeQuadInOut}
                  >
                    {(value = percentage) => {
                      const roundedValue = () => {
                        if(isNaN(value)) {
                          return 0;
                        } else {
                          return Math.round(value);
                        }
                      };
                      return (
                        <CircularProgressbar
                          value={value}
                          text={isNaN(roundedValue()) ? (0 + '%') : (roundedValue() + '%')}
                          styles={buildStyles({ pathTransition: "none", pathColor: `${roundedValue() === 100 ? '#4E9' : '#3e98c7'}`, textColor: `${roundedValue() === 100 ? '#4E9' : '#3e98c7'}` })}
                        />
                      );
                    }}
                  </AnimatedProgressProvider>
                );
              }}
            </VisibilitySensor>
          </div>
          <div className="tasks_completed">
            <h4>Tasks Completed:</h4>
            <div className="ratio">{(tasks_completed !== '0' && total_tasks !== '0') ? (tasks_completed + '/' + total_tasks) : 'N / A'}</div>
          </div>
        </div>
        <div className="buttons_container">
          <Button variant="info" className="button">Edit</Button>
          <Button variant="danger" className="button">Delete</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="Projects">
      <h1 className="pageTitle">Projects</h1>
      <div className="searchBar">
        <Button variant="success"
          onClick={handleShow}
        >
          Add New Project
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Form.Group controlId="formTasksCompleted">
              <Form.Label>Tasks Completed</Form.Label>
              <Form.Control
                type="number"
              />
            </Form.Group>
            <Form.Group controlId="formTotalTasks">
              <Form.Label>Total Tasks</Form.Label>
              <Form.Control
                type="number"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary" 
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleClose}
          >
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display all projects */}
      <div className="list">
        {(projects && projects.length > 0) ? 
          (projects.map(project => renderProject(project))) :
          (<p>No projects found</p>)
        }
      </div>
    </div>
  );
}

export default Projects;