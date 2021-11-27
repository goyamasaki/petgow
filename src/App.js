import "./App.css";
import Feed from "./Components/Feed";
// import Login from "./Components/Login";
import { BrowserRouter,Routes,BrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home"; 
import Policy from "./pages/Policy";


function App() {

  return (
        <div className="App">
          <h1>データ表示（in <span>Fire</span>Base)</h1> 
     
        <hr/>
        <Feed />
        <hr/>
        <BrowserRouter>
        <Routes>
          {/* 遷移させたい画面を記述する */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* 遷移させたい画面を記述する */}
         
        </Routes>
        </BrowserRouter><br/>
        </div>
   
  );
  }
  
export default App;
