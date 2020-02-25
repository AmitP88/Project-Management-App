import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import projectService from './services/projectService';

function App() {

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
      <li key={project.id} className="list__item project">
        <h3>{project.name}</h3>
      </li>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {(projects && projects.length > 0) ? (
            projects.map(project => renderProject(project))
          ) : (
            <p>No projects found</p>
          )}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
