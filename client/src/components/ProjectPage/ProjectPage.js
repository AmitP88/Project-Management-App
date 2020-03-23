import React from 'react';
import { Link } from 'react-router-dom';

// Import connect function from React-Redux
import store from '../../redux/store/store';
import { connect } from 'react-redux';

const ProjectPage = () => {
  let selected_project = store.getState().getSelectedProjectReducer;

  return (
    <div className="ProjectPage">
      <h1>{selected_project.name}</h1>
      <Link to='/projects'>
        <button className="projects_page">Go to Projects</button>
      </Link>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  getSelectedProject: state.selectedProject
});


export default connect(mapStatetoProps)(ProjectPage);