import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/appbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './Screens/About';
import Detect from './Screens/Detection';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/detect" element={<Detect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
