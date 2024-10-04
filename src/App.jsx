import './App.css';
import './index.css';

import Login from "./components/pages/Login";
import SignUp from "./components/pages/Register";
import PetProfile from "./components/pages/Profile";
import PetOwnerProfile from "./components/pages/PetOwnerProfile"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/PetProfile" element={<PetProfile />} />
        <Route path="/PetOwnerProfile" element={<PetOwnerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;