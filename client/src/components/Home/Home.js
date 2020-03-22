import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="Home">
      <h1>WELCOME HOME!</h1>
      <Link to='/projects'>
        <button className="projects_page">Go to Projects</button>      
      </Link>
    </div>
  );
}

export default Home;