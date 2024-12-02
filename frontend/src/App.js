import './App.css';
import Login from './pages/Login/login.jsx'
import Landing from './pages/Landing/landing.jsx';
import Admin from './pages/admin/admin.jsx'
import Home from './pages/Home/home.jsx'
import Signup from './pages/Signup/signup.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
