import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.sass';
import './media_queries.sass';

// import app header
import TopBar from './components/TopBar/TopBar';

// import mobile navbar
import BottomBar from './components/BottomBar/BottomBar';

// import page components
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';
import ProjectPage from './components/ProjectPage/ProjectPage';
import Productivity from './components/Productivity/Productivity';

const App = () => {
  return (
    <div className="App">
      <TopBar />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/projects' component={Projects} />
        <Route path='/projectpage' component={ProjectPage} />
        <Route path='/productivity' component={Productivity} />
      </Switch>
      <BottomBar />
    </div>
  );
}

export default App;
