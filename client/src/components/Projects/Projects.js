import React, { useState, useEffect } from 'react';
import './Projects.sass';
import './media_queries.sass';
import projectService from '../../services/projectService';

import VisibilitySensor from 'react-visibility-sensor';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

import { Card, Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddProjectForm from './AddProjectForm';
import DeleteProjectForm from './DeleteProjectForm';

const Projects = () => {
  // Hook for getting projects
  const [projects, setprojects] = useState(null);

  // hooks for add project modal
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  // hooks for delete project modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

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
      <Card key={id} className="projectTile">
        <Card.Body>
          <Card.Title className="name">{name}</Card.Title>
          <Card.Subtitle className="deadline">{deadline}</Card.Subtitle>
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
            <Button
              variant="info"
              className="button"
            >
              Go to Page
            </Button>
            <Button 
              variant="danger" 
              className="button"
              onClick={handleShowDeleteModal}
            >
              Delete Project
            </Button>
          </div>        
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="Projects">
      <h1 className="pageTitle">Projects</h1>
      <div className="searchBar">
        <Button variant="success"
          onClick={handleShowAddModal}
        >
          Add New Project
        </Button>
      </div>

      {/* Modal for Adding a new project */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProjectForm />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary" 
            onClick={handleCloseAddModal}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleCloseAddModal}
          >
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for deleting the selected project */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this project?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteProjectForm />
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="danger"
            onClick={handleCloseDeleteModal}
            style={{width: '100%'}}
          >
            I understand, permanently Delete This Project
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