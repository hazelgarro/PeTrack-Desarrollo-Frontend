import './App.css';
import './index.css';
<<<<<<< Updated upstream
// import PasswordInput from './components/molecules/PasswordInput';
import PetProfile from "./components/templates/Profile";
import CardsContainer from "./components/organisms/cardsContainer"

import pet_picture from "./assets/img/pet_picture.webp";
=======
import SelectInput from './components/atoms/TextInput';
>>>>>>> Stashed changes


const options = [
  { value: "optionf", label: "Option f" },
  { value: "optiona", label: "Option a" },
  { value: "optionw", label: "Option w" },
];
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
<<<<<<< Updated upstream
    <>
      {/* <PetPhotoQr typeCard="pet" link="#" imgSrc={pet_picture} imgAlt="Pet image"></PetPhotoQr> */}
      <PetProfile></PetProfile>
    </>
=======
  <>
  <SelectInput placeholder="Tipo de usuario" size="extra-large" options={options}></SelectInput>
  </>
>>>>>>> Stashed changes
  );
}

export default App