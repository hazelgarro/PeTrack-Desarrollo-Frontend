import './App.css';
import './index.css';

import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import PetRegister from "./components/pages/PetRegister";
import PetProfile from "./components/pages/PetProfile";
import PetOwnerProfile from "./components/pages/PetOwnerProfile"
import LandingPage from "./components/pages/LandingPage";
import HomePage from './components/pages/HomePage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SessionContextProvider } from './context/SessionContext';

function App() {
  return (
    <SessionContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/PetRegister" element={<PetRegister />} />
          <Route path="/PetProfile/:id" element={<PetProfile />} />
          <Route path="/PetOwnerProfile/:id?" element={<PetOwnerProfile />} />
          <Route path="/Homepage" element={<HomePage />} />
        </Routes>
      </Router >
    </SessionContextProvider >
  );
}

export default App;