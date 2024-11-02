import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayersList from './pages/PlayersList';
import Home from './pages/Home';
import Nav from './components/Nav';
import SignIn from './pages/SignIn';
import EditProfile from './pages/EditProfile';
import { UserProvider } from './context/UserContext';
import AuthGuardian from './guardians/AuthGuardian';
import Help from './pages/Help';

const App: React.FC = () => {
  return (
      <Router>
        <UserProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<AuthGuardian><PlayersList /></AuthGuardian>} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/edit-profile" element={<AuthGuardian><EditProfile /></AuthGuardian>} />
          <Route path="/help" element={<Help />} />
        </Routes>
        </UserProvider>
      </Router>
  );
};

export default App;