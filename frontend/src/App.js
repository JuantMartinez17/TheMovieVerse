import './App.css';
import Login from './pages/Login/login.jsx'
import Admin from './pages/admin/admin.jsx'
import Home from './pages/Home/home.jsx'
import Signup from './pages/Signup/signup.jsx';
import Movie from './pages/MovieDetail/movie.jsx';
import Profile from './pages/Profile/profile.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/movie/:id' element={<Movie/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
