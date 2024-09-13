<<<<<<< Updated upstream
import React from 'react';
import './App.css';
import './index.css';

import ButtonRegister from "./components/atoms/Button"
import CardsContainer from "./components/organisms/CardsContainer";
import SignUp from "./components/templates/SignUp/PageTemplate";
=======

import NavBar from "./components/organisms/navBar";
>>>>>>> Stashed changes



function App() {

  return (
<<<<<<< Updated upstream
/*<div>
  <Routes>
    <Route path="/signup" element={<SignUp />} />
  </Routes>
</div>*/
<div className="App">
  <SignUp />
</div>  

=======
    <>
    <NavBar isAuthenticated={true} />
    
    </>
>>>>>>> Stashed changes
  )
}

export default App
