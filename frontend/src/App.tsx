import './App.css'
import SignUp from './pages/signup/Signup'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import VerifyEmail from './pages/verify-email/VerifyEmail';
import SuccessVerification from './pages/verify-email/success/SucessVerification';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-email/success" element={<SuccessVerification />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
