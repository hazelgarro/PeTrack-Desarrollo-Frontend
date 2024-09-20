import './App.css';
import './index.css';
// import PasswordInput from './components/molecules/PasswordInput';
import PetProfile from "./components/templates/Profile";
import CardsContainer from "./components/organisms/cardsContainer"

import pet_picture from "./assets/img/pet_picture.webp";

/*
<div>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Login />} />
  </Routes>
</div>
*/
function App() {
  return (
    <>
      {/* <PetPhotoQr typeCard="pet" link="#" imgSrc={pet_picture} imgAlt="Pet image"></PetPhotoQr> */}
      <PetProfile></PetProfile>
    </>
  );
}

export default App