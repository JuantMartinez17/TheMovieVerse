import './App.css';
import Landing from './pages/Landing/landing'
import Login from './pages/Login/login.jsx'
import Home from './pages/Home/home.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
