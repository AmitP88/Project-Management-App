import React, { useState, useEffect } from 'react';
import './Projects.sass';
import './media_queries.sass';
import projectService from '../../services/projectService';

import VisibilitySensor from 'react-visibility-sensor';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Projects = () => {
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
    let id = project._id;
    let name = project.name;
    let deadline = project.deadline;
    let tasks_completed = project.tasks_completed;
    let total_tasks = project.total_tasks;
    let completed_percentage = ((tasks_completed/total_tasks)*100).toFixed(0);    

    return (
      <div key={id} className="projectTile">
        <h3 className="name">{name}</h3>
        <h4 className="deadline">{deadline}</h4>
        <div className="progress">
          <div className="progress_dial">
            <VisibilitySensor>
              {({ isVisible }) => {
                const percentage = isVisible ? completed_percentage : 0;
                return (
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                  />
                );
              }}
            </VisibilitySensor>
          </div>
          <div className="tasks_completed">
            <h4>Tasks Completed:</h4>
            <div className="ratio">{tasks_completed + '/' + total_tasks}</div>
          </div>
        </div>
        <div className="buttons_container">
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
        </div>
      </div>
    );
  };

  return (
    <div className="Projects">
      <h1 className="pageTitle">Projects</h1>
      <div className="searchBar">"(Search bar goes here)"</div>
      {/* Display all projects */}
      <div className="list">
        {(projects && projects.length > 0) ? 
          (projects.map(project => renderProject(project))) :
          (<p>No projects found</p>)
        }
      </div>
    </div>
  );
}

export default Projects;