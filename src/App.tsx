import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PlayersList from './pages/PlayersList/PlayersList';
import Home from './pages/Home';
import Nav from './components/Nav';
const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<PlayersList />} />
      </Routes>
    </Router>
  );
};

export default App;