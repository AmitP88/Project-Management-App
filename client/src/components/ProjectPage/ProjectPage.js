import React from 'react';
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
}));

const ProjectPage = () => {
  let selected_project = store.getState().getSelectedProjectReducer;
  const classes = useStyles();

  return (
    <div className="ProjectPage">
      <Grid container>
        <Grid item xs={12} className="header">
          <Card className={classes.card}>
            <Link to='/projects'>
              <NavigateBeforeIcon />
              Back to Projects
            </Link>
            {/**
              <h1 className="project_name">{selected_project.name}</h1>
            */}
            <CKEditor
              editor={InlineEditor}
              data={selected_project.name}
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



            <div className="deadline">
              {'Deadline: '}
              <Moment format="ddd MMMM D, YYYY">{selected_project.deadline}</Moment>
            </div>          
          </Card>
        </Grid>      
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <h6>Description Box</h6>
            <Paper elevation={0} variant='outlined'>
              Content goes here
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