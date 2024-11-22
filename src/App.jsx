import './App.css';
import './index.css';

import Login from "./components/pages/Login";
import ResetPassword from "./components/pages/ResetPassword";
import SignUp from "./components/pages/SignUp";
import PetRegister from "./components/pages/PetRegister";
import PetProfile from "./components/pages/PetProfile";
import PetOwnerProfile from "./components/pages/PetOwnerProfile"
import LandingPage from "./components/pages/LandingPage";
import HomePage from './components/pages/HomePage';
import ShelterProfile from './components/pages/ShelterProfile';
import ShelterListPage from './components/pages/SheltersListPage';
import NotificationsPage from './components/pages/NotificationsPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SessionContextProvider } from './context/SessionContext';
import AccountRecovery from './components/pages/AccountRecovery';

function App() {
  return (
    <SessionContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AccountRecovery" element={<AccountRecovery />} />
          <Route path="/ResetPassword/:token?" element={<ResetPassword />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/PetRegister" element={<PetRegister />} />
          <Route path="/PetProfile/:id" element={<PetProfile />} />
          <Route path="/PetOwnerProfile/:id?" element={<PetOwnerProfile />} />
          <Route path="/ShelterProfile/:id?" element={<ShelterProfile />} />
          <Route path="/Homepage" element={<HomePage />} />
          <Route path="/ShelterListPage" element={<ShelterListPage />} />
          <Route path="/NotificationsPage" element={<NotificationsPage />} />
        </Routes>
      </Router >
    </SessionContextProvider>
  );
}

export default App;