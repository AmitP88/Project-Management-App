import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.sass';
import './media_queries.sass';

// import app header
import TopBar from './components/TopBar/TopBar';

// import mobile navbar
import BottomBar from './components/BottomBar/BottomBar';

// import page components
import Dashboard from './components/Dashboard/Dashboard';
import Projects from './components/Projects/Projects';
import ProjectPage from './components/ProjectPage/ProjectPage';
import Productivity from './components/Productivity/Productivity';
import Team from './components/Team/Team';

const App = () => {
  return (
    <div className="App">
      <TopBar />
      <Switch>
        <Route path='/' component={Dashboard} exact />
        <Route path='/projects' component={Projects} />
        <Route path='/projectpage' component={ProjectPage} />
        <Route path='/productivity' component={Productivity} />
        <Route path='/team' component={Team} />
      </Switch>
      <BottomBar />
    </div>
  );
}

export default App;
