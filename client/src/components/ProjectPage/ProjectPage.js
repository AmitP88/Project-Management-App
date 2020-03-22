import React from 'react';
import { Link } from 'react-router-dom';

const ProjectPage = () => {
  return (
    <div className="ProjectPage">
      <h1>THIS IS THE PROJECT PAGE</h1>
      <Link to='/projects'>
        <button className="projects_page">Go to Projects</button>
      </Link>
    </div>
  );
}

export default ProjectPage;