import './App.css';
import './index.css';

import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import PetRegister from "./components/pages/PetRegister";
import PetProfile from "./components/pages/PetProfile";
import PetOwnerProfile from "./components/pages/PetOwnerProfile"
import LandingPage from "./components/pages/LandingPage";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/PetRegister" element={<PetRegister />} />
        <Route path="/PetProfile" element={<PetProfile />} />
        <Route path="/PetOwnerProfile/:id" element={<PetOwnerProfile />} />
        <Route path="/Landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;