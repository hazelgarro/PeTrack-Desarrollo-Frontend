import React from 'react';
import './App.css';
import './index.css';

import ButtonRegister from "./components/atoms/Button"
import CardsContainer from "./components/organisms/CardsContainer";
import SignUp from "./components/templates/SignUp/PageTemplate";



function App() {

  return (
/*<div>
  <Routes>
    <Route path="/signup" element={<SignUp />} />
  </Routes>
</div>*/
<div className="App">
  <SignUp />
</div>  

  )
}

export default App
