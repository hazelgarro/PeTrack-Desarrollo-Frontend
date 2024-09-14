import './App.css';
import './index.css';
<<<<<<< Updated upstream
import FormFields from './components/templates/SignUp/PageTemplate';
=======
import NavBar from "./components/organisms/cardsContainer";
>>>>>>> Stashed changes

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
  <FormFields></FormFields>
  </>
=======
    <>
    <NavBar isAuthenticated="true"></NavBar>
    </>
>>>>>>> Stashed changes
  );
}

export default App