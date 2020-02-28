import React, { useState, useEffect } from 'react';
import './Projects.sass';
import './media_queries.sass';
import projectService from '../../services/projectService';

import VisibilitySensor from 'react-visibility-sensor';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

import { Button, Modal } from 'react-bootstrap';
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
                      const roundedValue = Math.round(value);
                      return (
                        <CircularProgressbar
                          value={value}
                          text={`${roundedValue}%`}
                          styles={buildStyles({ pathTransition: "none", pathColor: `${roundedValue === 100 ? '#4E9' : '#3e98c7'}`, textColor: `${roundedValue === 100 ? '#4E9' : '#3e98c7'}` })}
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
            <div className="ratio">{tasks_completed + '/' + total_tasks}</div>
          </div>
        </div>
        <div className="buttons_container">
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
        </div>
      </div>
    );
  };

  return (
    <div className="Projects">
      <h1 className="pageTitle">Projects</h1>
      <div className="searchBar">
        <button className="add_project" onClick={handleShow}>Add New Project</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
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