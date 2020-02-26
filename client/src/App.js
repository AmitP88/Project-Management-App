import React from 'react';
import './App.sass';
import './media_queries.sass';

import ProjectsList from './components/ProjectsList/ProjectsList';

const App = () => {
  return (
    <div className="App">
      <ProjectsList />
    </div>
  );
}

export default App;
