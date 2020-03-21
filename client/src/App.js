import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.sass';
import './media_queries.sass';

// import page components
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/projects' component={Projects} />
      </Switch>
    </div>
  );
}

export default App;
