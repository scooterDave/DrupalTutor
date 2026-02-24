import React from 'react';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-inner">
          <span className="drupal-drop" aria-hidden="true">💧</span>
          <h1>DrupalTutor</h1>
          <p className="subtitle">Test your Drupal 10 &amp; 11 knowledge</p>
        </div>
      </header>
      <main>
        <Quiz />
      </main>
      <footer className="App-footer">
        <p>DrupalTutor &copy; {new Date().getFullYear()} – Built with React</p>
      </footer>
    </div>
  );
}

export default App;
