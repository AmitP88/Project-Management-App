import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
import { Card, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import moment component for formatting date from deadline
import Moment from 'react-moment';
import 'moment-timezone';

// Import connect function from React-Redux
import store from '../../redux/store/store';
import { connect } from 'react-redux';

import ADD_PROJECT_SUBMIT from '../../redux/actions/addProjectSubmit';
import STORE_PROJECT_NAME from '../../redux/actions/storeProjectName';
import GET_SELECTED_PROJECT from '../../redux/actions/getSelectedProject';

const Projects = (props) => {
  // Hook for getting projects
  let [projects, setProjects] = useState(null);

  // Hooks for add project modal
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  useEffect(() => {
    if(!projects) {
      getProjects();
    }
  })

  const getProjects = async () => {
    let res = await projectService.getAll();
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

    // hook for navigating to project page
    const [toProjectPage, setToProjectPage] = useState(false);
    const navToProjectPage = () => setToProjectPage(true);

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

    const getSelectedProject = async () => {
      const res = await projectService.getOne();
      console.log('selected project: ', res);
      props.dispatch({ type: GET_SELECTED_PROJECT, payload: { name: res[0].name, deadline: res[0].deadline, tasks_completed: res[0].tasks_completed, total_tasks: res[0].total_tasks } });
      console.log('redux store: ', store.getState());
    }

    const handleOnClickPageButton = (e) => {
      e.preventDefault();
      console.log('project name from db: ', project.name);
      props.dispatch({ type: STORE_PROJECT_NAME, payload: { projectName: project.name } });
      console.log('redux store: ', store.getState());
      getSelectedProject();
      navToProjectPage();
    };

    if(toProjectPage === true) {
      return <Redirect key={0} to='/projectpage' />
    } else {
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
              <button className="button Page_button" onClick={handleOnClickPageButton}>Go to Page</button>
            </div>
          </Card.Body>
        </Card>
      );
    }

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
        {console.log(projects)}
      </div>
    );
  };

  // Modal component for adding new projects
  const AddProjectModal = () => {
    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      props.dispatch({ type: ADD_PROJECT_SUBMIT, payload: { name, deadline } });
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
      <div className="header">
        <Link to='/'>
          <button className="home_page">Home</button>
        </Link>
        <h1 className="pageTitle">Projects</h1>      
      </div>
      <SearchBar />
      <AddProjectModal />
      <List />
    </div>
  );
}

const mapStateToProps = (state) => ({
  addProjectForm: state.addProjectForm,
  storeProjectName: state.projectName,
  getSelectedProject: state.selectedProject
});

export default connect(mapStateToProps)(Projects);