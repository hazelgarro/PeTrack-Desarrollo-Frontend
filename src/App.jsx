import ButtonRegister from "./components/atoms/Button"
import CardsContainer from "./components/organisms/CardsContainer";
import SignUp from "./components/templates/SignUp/PageTemplate";



function App() {

  return (
<div>
  <Routes>
    <Route path="/" element={<SignUp />} />
  </Routes>
</div>
  )
}

export default App
