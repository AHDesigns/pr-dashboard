import React from 'react';
import './App.css';
import Repo from './Repo';

const App: React.FC = () => {
  return (
    <div className="App">
      <Repo repo="skyport-graphql" />
    </div>
  );
}

export default App;
