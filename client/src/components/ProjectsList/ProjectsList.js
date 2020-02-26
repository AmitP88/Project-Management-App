import React, { useState, useEffect } from 'react';
import './ProjectsList.sass';

import projectService from '../../services/projectService';

const ProjectsList = () => {
  // Hook for getting projects
  const [projects, setprojects] = useState(null);

  useEffect(() => {
    if(!projects) {
      getProjects();
    }
  })

  const getProjects = async () => {
    let res = await projectService.getAll();
    console.log(res);
    setprojects(res);
  }

  const renderProject = project => {
    return (
      <li key={project._id} className="projectTile">
        <h3>{project.name}</h3>
      </li>
    );
  };

  return (
    <div className="projectsList">
      {/* Display all projects */}
      <ul>
        {(projects && projects.length > 0) ? 
          (projects.map(project => renderProject(project))) :
          (<p>No projects found</p>)
        }
      </ul>
    </div>
  );
}

export default ProjectsList;