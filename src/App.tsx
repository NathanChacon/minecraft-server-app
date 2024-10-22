import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayersList from './pages/PlayersList';
import Home from './pages/Home';
import Nav from './components/Nav';
import SignIn from './pages/SignIn';
const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<PlayersList />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;