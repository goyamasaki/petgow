import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Profile from "./pages/Profile";
import AddInput2 from "./pages/AddInput2";
import Search from "./pages/Search";
//??
// import { AuthProvider } from './AuthContext';

function App() {

    return (
        <div className="App">
          <h1>Pet  <span>Go</span>w</h1> 
          <hr/>

          <BrowserRouter>
        <Routes>
          {/* 遷移させたい画面を記述する */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addinput2" element={<AddInput2 />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
    
         
        </Routes>
        </BrowserRouter><br/>
    
        <hr/>
        
        </div>
   
  );
  }
  
export default App;
