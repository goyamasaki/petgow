import "./App.css";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home"; 
import Policy from "./pages/Policy";
import Profile from "./pages/Profile";
import AddInput2 from "./pages/AddInput2";
import Search from "./pages/Search";



function App() {

    return (
        <div className="App">
          <h1>Pet Gow（in <span>Fire</span>Base)</h1> 
          <hr/>
     
          <BrowserRouter>
        <Routes>
          {/* 遷移させたい画面を記述する */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addinput2" element={<AddInput2 />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          {/* <Route exact path="/login" component={Login} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* 遷移させたい画面を記述する */}
         
        </Routes>
        </BrowserRouter><br/>
        <BrowserRouter>
        {/* ここのコメントアウトを解除するとデータが見れる */}
        {/* <Feed /> */}
        {/* <Home /> */}
       </BrowserRouter>
        <hr/>
        
        </div>
   
  );
  }
  
export default App;
