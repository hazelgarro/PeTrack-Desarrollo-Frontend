import './App.css';
import './index.css';

import Login from "./components/pages/Login";
import SignUp from "./components/pages/Register";
import PetProfile from "./components/pages/Profile";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/PetProfile" element={<PetProfile />} />
      </Routes>
    </Router>
  );
}

export default App;