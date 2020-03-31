import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.sass';
import './media_queries.sass';

// import app header
import SearchBar from './components/SearchBar/SearchBar';

// import mobile navbar
import NavBar from './components/NavBar/NavBar';

// import page components
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';
import ProjectPage from './components/ProjectPage/ProjectPage';

const App = () => {
  return (
    <div className="App">
      <SearchBar />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/projects' component={Projects} />
        <Route path='/projectpage' component={ProjectPage} />
      </Switch>
      <NavBar />
    </div>
  );
}

export default App;
