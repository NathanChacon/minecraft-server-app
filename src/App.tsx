import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

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
import CreateServer from './pages/CreateServer';
import UserServer from './pages/UserServer';
import EditServer from './pages/EditServer';

function PageTracking() {
  const location = useLocation();
  
  useEffect(() => {
    if (typeof window.gtag === 'function') {
        window.gtag('config', 'AW-16791423174', {
            page_path: location.pathname,
        });
    }
}, [location]);

 return null

}

const App: React.FC = () => {
 

  return (
      <Router>
        <PageTracking />
        <UserProvider>
          
          <ChatProvider>
          <Nav />
          <ChatSideBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<PlayersList />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/edit-profile" element={<AuthGuardian><EditProfile /></AuthGuardian>} />
            <Route path="/help" element={<Help />} />
            <Route path="/servers" element={<Servers/>} />
            <Route path="/subscriptions" element={<Subscriptions/>} />
            <Route path="/create-server" element={<AuthGuardian><CreateServer/></AuthGuardian>} />
            <Route path="/edit-server/:serverId" element={<AuthGuardian><EditServer/></AuthGuardian>} />
            <Route path="/my-server" element={<AuthGuardian><UserServer/></AuthGuardian>} />
          </Routes>
          </ChatProvider>

        </UserProvider>
      </Router>
  );
};

export default App;