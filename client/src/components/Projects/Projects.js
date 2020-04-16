import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './Projects.sass';
import './media_queries.sass';

// Import Font Awesome for React
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

// Import axios get request to get data from DB
import projectService from '../../services/projectService';

// Import components & styles for progress dial
import VisibilitySensor from 'react-visibility-sensor';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

// Import components & styles from React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Import styled components from Material UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Card from '@material-ui/core/Card';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Slide from '@material-ui/core/Slide';

// Import moment component for formatting date from deadline
import Moment from 'react-moment';
import 'moment-timezone';

// Import connect function from React-Redux
// import store from '../../redux/store/store';
import { connect } from 'react-redux';

import ADD_PROJECT_SUBMIT from '../../redux/actions/addProjectSubmit';
import STORE_PROJECT_NAME from '../../redux/actions/storeProjectName';
import GET_SELECTED_PROJECT from '../../redux/actions/getSelectedProject';
import REQUEST_SENT from '../../redux/actions/requestSent';
import REQUEST_SUCCEEDED from '../../redux/actions/requestSucceeded';
import REQUEST_RESET from '../../redux/actions/requestReset';

// import React Loader Spinner
// import Loader from 'react-loader-spinner';

const Projects = (props) => {
  // Hook for getting projects
  let [projects, setProjects] = useState(null);

  // Hook for sorting projects
  const [sorted, setSorted] = useState('Recently Added');

  const handleSortedChange = (event) => {
    setSorted(event.target.value);
  }

  // Hook for add project modal with functions to change state
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  // Hook for sliding animation for project Cards
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if(!projects) {
      getProjects();
    }
  })

  const getProjects = async () => {
    props.dispatch({ type: REQUEST_SENT, payload: { requestStatus: 'request sent!' } });
    let res = await projectService.getAll();
    props.dispatch({ type: REQUEST_SUCCEEDED, payload: { requestStatus: 'request succeeded!' } });
    setProjects(res);
    setChecked((prev) => !prev);
    props.dispatch({ type: REQUEST_RESET, payload: { requestStatus: '' } });
  }

  const postNewProject = async () => {
    // let res = await projectService.postNew();
    getProjects();
  }

  // Displays a single Project Card
  const ProjectCard = (project) => {
    let id = project._id;
    let name = project.name;
    // let created = project.created;
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
      props.dispatch({ type: GET_SELECTED_PROJECT, payload: { _id: res[0]._id ,name: res[0].name, deadline: res[0].deadline, tasks_completed: res[0].tasks_completed, total_tasks: res[0].total_tasks } });
      navToProjectPage();      
    }

    const handleOnClickPageButton = (e) => {
      e.preventDefault();
      props.dispatch({ type: STORE_PROJECT_NAME, payload: { projectName: project.name } });
      getSelectedProject();
    };

    if(toProjectPage === true) {
      return <Redirect key={0} to='/projectpage' />
    } else {
      return (
        <Slide key={id} in={checked} direction='right' timeout={500} mountOnEnter>
          <Card className="projectCard" onClick={handleOnClickPageButton}>
            <div className="left-half">
              <p className="name">{name}</p>
              {/**
                <p className="created-label">Created:</p>              
                <p className="created">
                  <Moment format="ddd MMMM D, YYYY">{created}</Moment>
                </p>            
              */}
              <p className="deadline-label">Deadline:</p>
              <p className="deadline">
                <Moment format="ddd MMMM D, YYYY">{deadline}</Moment>
              </p>
            </div>
            <div className="right-half">
              <Progress />          
            </div>
          </Card>        
        </Slide>

      );
    }

  };

  // Component for displaying all projects
  const List = () => {
    const renderProjects = () => {
      if(projects && projects.length > 0){
        switch(sorted) {
          case('Recently Added'):
            let recently_added = projects.reverse();
            // console.log(recently_added);
            return recently_added.map(project => ProjectCard(project));
          case('Alphabetical'):
            let alphabetical = projects.sort((a, b) => {
              let nameA = a.name;
              let nameB = b.name;
              return nameA.localeCompare(nameB);
            });
            // console.log(alphabetical);
            return alphabetical.map(project => ProjectCard(project));
          default:
            recently_added = projects.reverse();
            // console.log(recently_added);
            return recently_added.map(project => ProjectCard(project));
        }        
      } else {
        return (
          <div className="no_projects_found">
            <p>No projects found. Click on the green + icon above to create a new project! :) </p>          
          </div>
        )
      }

    }

    return (
      <div className="list">
        {renderProjects()}
      </div>
    );
  };

  // Modal component for adding new projects
  const AddProjectModal = () => {
    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState(new Date());

    const handleDeadlineChange = (date) => {
      setDeadline(date);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      props.dispatch({ type: ADD_PROJECT_SUBMIT, payload: { name, deadline } });
      // console.log(store.getState());
      postNewProject();
      handleCloseAddModal();
    }

    return (
       <div>
        <Dialog open={showAddModal} onClose={handleCloseAddModal}>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Project Name'
              inputProps={{maxLength: 20}}
              type='text'
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Deadline"
                value={deadline}
                onChange={handleDeadlineChange}
                required
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddModal} color='primary'>Cancel</Button>
            <Button onClick={handleSubmit} color='primary'>Add Project</Button>
          </DialogActions>
        </Dialog>
       </div>

    );
  };

  // Component for search bar
  const ProjectsBar = () => {
    // useEffect(() => {
    //   console.log('sorted:', sorted);
    // });

    const useStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        backgroundColor: '#ffffff'
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
        backgroundColor: '#ffffff'
      },
      card: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: '0px 5px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      add: {
        backgroundColor: '#00bfa5',
        color: 'white',
      },
      add_icon: {
        fontSize: '40px',
      }
    }));

    const classes = useStyles();

    return (
      <Card className={classes.card}>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select 
            labelId='sort-by-label' 
            id='sort-by' 
            label='Sort By' 
            value={sorted}
            onChange={handleSortedChange}
          >
            <MenuItem value={'Recently Added'} onClick={handleSortedChange}>Recently Added</MenuItem>
            <MenuItem value={'Alphabetical'} onClick={handleSortedChange}>Alphabetical</MenuItem>
            <MenuItem value={'Progress % - Low to High'} onClick={handleSortedChange}>Progress % - Low to High</MenuItem>
            <MenuItem value={'Progress % - High to Low'} onClick={handleSortedChange}>Progress % - High to Low</MenuItem>
            <MenuItem value={'Due Date - Closest Date First'} onClick={handleSortedChange}>Due Date - Closest Date First</MenuItem>
            <MenuItem value={'Due Date - Closest Date Last'} onClick={handleSortedChange}>Due Date - Closest Date Last</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" className={classes.add}>
          <AddToPhotosIcon onClick={handleShowAddModal} className={classes.add_icon} />
        </Button>
      </Card>
    );
  };

  return (
    <div className="Projects">
      <ProjectsBar />
      <AddProjectModal />
      <div>
        <List />
        {/**
          store.getState().requestSentReducer.requestStatus === 'request succeeded!' ?
          <List /> :
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              marginTop: '50%'
            }}
          >
            <Loader type="ThreeDots" color="#3f51b5" height={50} width={100} />
          </div>          
          */
        }      
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  addProjectForm: state.addProjectForm,
  storeProjectName: state.projectName,
  getSelectedProject: state.selectedProject,
  requestStatus: state.requestStatus
});

export default connect(mapStateToProps)(Projects);