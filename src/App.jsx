import './App.css';
import './index.css';
import PasswordInput from './components/molecules/PasswordInput';

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
  <PasswordInput size="extra-large"></PasswordInput>
  </>
  );
}

export default App