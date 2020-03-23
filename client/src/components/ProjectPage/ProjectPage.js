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

const ProjectPage = () => {
  let selected_project = store.getState().getSelectedProjectReducer;

  return (
    <div className="ProjectPage">
      <div className="header">
        <Link to='/projects'>
          <button className="projects_page">Go to Projects</button>
        </Link>
        <h1 className="project_name">{selected_project.name}</h1>
        <div className="deadline">
          {'Deadline: '}
          <Moment format="ddd MMMM D, YYYY">{selected_project.deadline}</Moment>
        </div>
      </div>
      <div className="page_content">
        <div className="row">
          <div className="container"></div>
          <div className="container"></div>
        </div>
        <div className="row">
          <div className="container"></div>
          <div className="container"></div>
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  getSelectedProject: state.selectedProject
});


export default connect(mapStatetoProps)(ProjectPage);