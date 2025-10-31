
import './App.css';
import Login from './Components/UserDetails/Login/Login';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './constants/ProtectedRoute';
import About from './Components/About/About';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route  path="/login" element={<Login/>} />
          <Route path='/about' element={<About/>} />

          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<Home/>}/>
          </Route>
          
        </Routes>

      </Router>
     
    </div>
  );
}

export default App;
