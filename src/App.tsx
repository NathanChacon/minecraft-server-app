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
import { ChatProvider } from './context/ChatContext';
import ChatSideBar from './components/ChatSidebar';
import Servers from './pages/Servers';
import Subscriptions from './pages/Subscriptions';
import ServerForm from './pages/ServerForm';

const App: React.FC = () => {
  return (
      <Router>
        <UserProvider>
          <ChatProvider>
          <Nav />
          <ChatSideBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<AuthGuardian><PlayersList /></AuthGuardian>} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/edit-profile" element={<AuthGuardian><EditProfile /></AuthGuardian>} />
            <Route path="/help" element={<Help />} />
            <Route path="/servers" element={<Servers/>} />
            <Route path="/subscriptions" element={<Subscriptions/>} />
            <Route path="/server" element={<AuthGuardian><ServerForm/></AuthGuardian>} />
          </Routes>
          </ChatProvider>

        </UserProvider>
      </Router>
  );
};

export default App;