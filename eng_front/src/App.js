import { Routes, Route } from "react-router-dom";
import MainHome from "./views/MainHome";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Developer from "./Developer";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroLeft09 from "./views/Start/HeroLeft09";
import Change from "./views/InformationChange";
import LevelTest from "./views/LevelTest";
import Speech from "./views/Speech";
import Speaking from "./views/Speaking";
import Keyword from "./views/Keyword";
import './App.css'

function App() {
  return (
      <div className="App">
     <Routes>
         <Route path="/" element={<HeroLeft09/>}/>
         <Route path="/main" element={<MainHome/>}/>
         <Route path="/login" element={<SignIn/>}/>
         <Route path="/signup" element={<SignUp/>}/>
         <Route path="/developer" element={<Developer/>}/>
         <Route path="/Change" element={<Change/>}/>
         <Route path="/leveltest" element={<LevelTest/>}/>
         <Route path="/speech" element={<Speech/>}/>
         <Route path="/keyword" element={<Keyword/>}/>
         <Route path="/speaking" element={<Speaking/>}/>
         {/*<Route path="/resultpage" element={<ResultPage/>}/>*/}

    </Routes>
      </div>
  );
}

export default App;
