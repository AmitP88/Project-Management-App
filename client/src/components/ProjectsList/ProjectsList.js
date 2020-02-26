import React, { useState, useEffect } from 'react';
import './ProjectsList.sass';
import './media_queries.sass';

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
      <div key={project._id} className="projectTile">
        <h3 className="name">{project.name}</h3>
        <h4 className="deadline">{project.deadline}</h4>
      </div>
    );
  };

  return (
    <div className="projectsList">
      {/* Display all projects */}
      <div className="list_container">
        {(projects && projects.length > 0) ? 
          (projects.map(project => renderProject(project))) :
          (<p>No projects found</p>)
        }
      </div>
    </div>
  );
}

export default ProjectsList;