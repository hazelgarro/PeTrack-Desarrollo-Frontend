import './App.css';
import './index.css';

import Login from "./components/pages/LogIn";
import SignUp from "./components/pages/RegisterData";
import PetProfile from "./components/templates/Profile";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/PetProfile" element={<PetProfile />} />
        </Routes>
      </Router>
      {/* <PetProfile></PetProfile> */}
    </>
  );
}

export default App