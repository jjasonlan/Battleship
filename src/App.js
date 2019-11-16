import React from 'react';
import Grid from './components/Grid';
import './App.css';

function App() {
  return (
    <div className='container'>
      <div className='titleSection'>
        <h1>Battleship</h1>
        <p>by Jason Lan</p>
      </div>
      <div className='gameContainer'>
        <div className='screen'>
          <Grid />
        </div>
        <div className='screen'>
          <Grid />
        </div>
      </div>
    </div>
  );
}

export default App;
