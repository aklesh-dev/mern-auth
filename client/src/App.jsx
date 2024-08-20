import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SingIn from './pages/SingIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sing-in" element={<SingIn />} />
      <Route path="/sing-up" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
      
    </>
  )
}

export default App
