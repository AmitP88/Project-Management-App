import React, { useState, useRef, useEffect } from 'react';
import './Projects.sass';
import './media_queries.sass';

// Import Font Awesome for React
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

// Import axios get request to get data from DB
import projectService from '../../services/projectService';

// Import components & styles for progress dial
import VisibilitySensor from 'react-visibility-sensor';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

// Import components & styles from React Bootstrap
import { Card, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import moment component for formatting date from deadline
import Moment from 'react-moment';
import 'moment-timezone';

// Import connect function from React-Redux
import store from '../../redux/store/store';
import { connect } from 'react-redux';

import ADD_PROJECT_SUBMIT from '../../redux/actions/addProjectSubmit';

const Projects = (props) => {
  // Hook for getting projects
  let [projects, setProjects] = useState(null);

  // Hooks for add project modal
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);


  // Hooks for delete project modal
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const handleCloseDeleteModal = () => setShowDeleteModal(false);
  // const handleShowDeleteModal = () => setShowDeleteModal(true);

  useEffect(() => {
    if(!projects) {
      getProjects();
    }
  })

  const getProjects = async () => {
    let res = await projectService.getAll();
    // console.log(res);
    setProjects(res);
  }

  const postNewProject = async () => {
    let res = await projectService.postNew();
    console.log(res);
    console.log('store :', store.getState());
    getProjects();
  }

  // Displays a single Project Card
  const ProjectCard = (project) => {
    let id = project._id;
    let name = project.name;
    let deadline = project.deadline;
    let tasks_completed = project.tasks_completed;
    let total_tasks = project.total_tasks;
    let completed_percentage = ((tasks_completed/total_tasks)*100).toFixed(0);

    // Component for displaying progress dial and ratio
    const Progress = () => {
      return (
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
                      const roundedValue = isNaN(value) ? 0 : Math.round(value);
                      return (
                        <CircularProgressbar
                          value={value}
                          text={isNaN(roundedValue) ? (0 + '%') : (roundedValue + '%')}
                          styles={
                            buildStyles({ 
                              pathTransition: "none",
                              pathColor: `${roundedValue === 100 ? '#4E9' : '#3e98c7'}`,
                              textColor: `${roundedValue === 100 ? '#4E9' : '#3e98c7'}` 
                          })}
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
            <div className="ratio">
              {
                (tasks_completed !== 0 && total_tasks !== 0) ?
                (tasks_completed + '/' + total_tasks) :
                'N / A'
              }
            </div>
          </div>
        </div>
      );
    };

    return (
      <Card key={id} className="projectCard">
        <Card.Body>
          <Card.Title className="name">{name}</Card.Title>
          <Card.Subtitle className="deadline">
            {'Due: '} 
            <Moment format="ddd MMMM D, YYYY">{deadline}</Moment>
          </Card.Subtitle>
          <Progress />
          <div className="buttons_container">
            <button className="button Page_button">Go to Page</button>
            {/* <Button variant="danger" className="button" onClick={handleShowDeleteModal}>Delete Project</Button> */}
          </div>        
        </Card.Body>
      </Card>
    );
  };

  // Component for displaying all projects
  const List = () => {
    return (
      <div className="list">
        {
          (projects && projects.length > 0) ? 
          (projects.map(project => ProjectCard(project))) :
          (
            <div className="no_projects_found">
              <p>No projects found. Click on the plus icon below to create a new project! :) </p>
              <FontAwesomeIcon className="plus_icon" icon={faPlusCircle} size="4x" onClick={handleShowAddModal} />            
            </div>
          )
        }
      </div>
    );
  };


  // Modal component for adding new projects
  const AddProjectModal = () => {
    // Hooks for add project form
    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      props.dispatch({ type: ADD_PROJECT_SUBMIT, payload: { name, deadline } });
      // check to see if store gets updated
      console.log(store.getState());
      postNewProject();
      handleCloseAddModal();
    }

    return (
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProjectName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDeadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <button className="button Cancel_New_Project-button" onClick={handleCloseAddModal}>Cancel</button>
              <button className="button Add_New_Project_button" type="submit">Add Project</button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  // Modal component for deleting an existing project
  // const DeleteProjectModal = () => {
  //   return (
  //     <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>Are you sure you want to delete this project?</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Form>
  //           <Form.Group controlId="formProjectName">
  //             <Form.Label>
  //               This action <strong>cannot</strong> be undone.
  //               This will permanently delete the (project name) project,
  //               along with all of the projects' content including:
  //               descriptions, uploaded files, created tasks and progress %,
  //               hours logged, and deadlines.
  //             </Form.Label>
  //             <Form.Control
  //               plaintext 
  //               readOnly 
  //               defaultValue="Please type (project name) to confirm."
  //               style={{textAlign: 'left'}}
  //             />
  //             <Form.Control type="text" />
  //           </Form.Group>
  //         </Form>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="danger" onClick={handleCloseDeleteModal} style={{width: '100%'}}>
  //           I understand, permanently delete this project
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // };

  // Component for search bar
  const SearchBar = () => {
    const [input_value, setInputValue] = useState('');
    const firstUpdate = useRef(true);

    useEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      console.log(input_value);
      let filtered = projects.filter((project) => project.name.startsWith(input_value));
      console.log('filtered:', filtered);
      // Need to prevent SearchBar component from re-rendering when calling setProjects
      // setProjects(filtered);
    });

    return (
      <div className="searchBar">
        <form className="SearchForm">
          <input
            type="text"
            placeholder="Find a project by name..."
            onChange={(e) => setInputValue((e.target.value).toUpperCase())}
          />
        </form>
        <span>Sort By</span>
        <select>
          <option defaultValue="-- select an option --">-- select an option --</option>
          <option>Date Created</option>
          <option>Alphabetical</option>
          <option>Progress % - Low to High</option>
          <option>Progress % - High to Low</option>
          <option>Due Date - Closest Date First</option>
          <option>Due Date - Closest Date Last</option>
        </select>
        <button className="button Add_New_Project_button" onClick={handleShowAddModal}>Add New Project</button>
      </div>
    );
  };

  return (
    <div className="Projects">
      <h1 className="pageTitle">Projects</h1>
      <SearchBar />
      <AddProjectModal />
      {/* <DeleteProjectModal /> */}
      <List />
    </div>
  );
}

const mapStateToProps = (state) => ({
  addProjectForm: state.addProjectForm,
  searchProjectForm: state.searchProjectForm
});

export default connect(mapStateToProps)(Projects);