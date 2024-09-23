import './App.css';
import './index.css';
/*import Route from "./components/templates/Test";*/
import  Login  from "./components/templates/LogIn";
import SignUp  from "./components/templates/RegisterData";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
     <Router>
        <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App