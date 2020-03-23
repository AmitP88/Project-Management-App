import React from 'react';
import { Link } from 'react-router-dom';

// Import connect function from React-Redux
import store from '../../redux/store/store';
import { connect } from 'react-redux';

const ProjectPage = () => {

  return (
    <div className="ProjectPage">
      <h1>THIS IS THE PROJECT PAGE</h1>
      <Link to='/projects'>
        <button className="projects_page">Go to Projects</button>
      </Link>
      {console.log('redux store: ', store.getState())}
    </div>
  );
}

const mapStatetoProps = (state) => ({
  getSelectedProject: state.selectedProject
});


export default connect(mapStatetoProps)(ProjectPage);