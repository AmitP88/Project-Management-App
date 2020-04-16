import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectPage.sass';
import './media_queries.sass';

// Import connect function from React-Redux
import store from '../../redux/store/store';
import { connect } from 'react-redux';

// Import Moment component for formatting date from deadline
import Moment from 'react-moment';
import 'moment-timezone';

// Import styled components from Material UI
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// Import components from CKEditor
import CKEditor from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 5,
  },
  heading: {
    fontSize: 'large'
  }
}));

const ProjectPage = () => {
  const classes = useStyles();

  const selected_project = store.getState().getSelectedProjectReducer;
  const project_name = selected_project.name;
  const project_deadline = selected_project.deadline;

  // Hook for storing project data
  const [savedName, setSavedName] = useState(project_name);
  const [inputName, setInputName] = useState('');
  const [savedDeadline, setSavedDeadline] = useState(new Date(project_deadline));

  const handleDeadlineChange = (deadline) => {
    setSavedDeadline(deadline);
  }

  return (
    <div className="ProjectPage">
      <Grid container>
        <Grid item xs={12} className="header">
          <Card className={classes.card}>
            <Link to='/projects'>
              <NavigateBeforeIcon />
              Back to Projects
            </Link>

            <div className="heading">
              <TextField
                id="project_name"
                defaultValue={savedName}
                inputProps={{
                  maxLength: 20,
                }}
              />            
            </div>



            <div className="deadline">
              <p className="deadline-label">{'Deadline: '}</p>
              {/**
                <Moment format="ddd MMMM D, YYYY">{selected_project.deadline}</Moment>              
              */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  format="MM/dd/yyyy"
                  value={savedDeadline}
                  onChange={handleDeadlineChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />              
              </MuiPickersUtilsProvider>
            </div>
            
            

            
          </Card>
        </Grid>      
        <Grid item xs={12} sm={6} className="description">
          <Card className={classes.card}>
            <h6>Description Box</h6>
            <Paper elevation={0} variant='outlined'>
              <CKEditor
                editor={InlineEditor}
                data={'<p>What is the project about?</p>'}
                onInit={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log( 'Editor is ready to use!', editor );                
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({event, editor, data});
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
            </Paper>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <h6>Progress Box</h6>
            <Paper elevation={0} variant='outlined'>
              Content goes here
            </Paper>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <h6>Documents Box</h6>
            <Paper elevation={0} variant='outlined'>
              Content goes here
            </Paper>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <h6>Task Box</h6>
            <Paper elevation={0} variant='outlined'>
              Content goes here
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  getSelectedProject: state.selectedProject
});


export default connect(mapStatetoProps)(ProjectPage);