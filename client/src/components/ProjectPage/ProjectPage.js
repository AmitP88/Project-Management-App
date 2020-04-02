import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectPage.sass';
import './media_queries.sass';

// Import connect function from React-Redux
import store from '../../redux/store/store';
import { connect } from 'react-redux';

// Import moment component for formatting date from deadline
import Moment from 'react-moment';
import 'moment-timezone';

// Import styled components from Material UI
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 5,
  },
}));

const ProjectPage = () => {
  let selected_project = store.getState().getSelectedProjectReducer;
  const classes = useStyles();

  return (
    <div className="ProjectPage">
      <Grid container>
        <Grid item xs={12} className="header">
          <Paper className={classes.paper}>
            <Link to='/projects'>
              <NavigateBeforeIcon />
              Back to Projects
            </Link>
            <h1 className="project_name">{selected_project.name}</h1>
            <div className="deadline">
              {'Deadline: '}
              <Moment format="ddd MMMM D, YYYY">{selected_project.deadline}</Moment>
            </div>          
          </Paper>
        </Grid>      
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Description Box</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Progress Box</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Upload Box</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Task Box</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  getSelectedProject: state.selectedProject
});


export default connect(mapStatetoProps)(ProjectPage);