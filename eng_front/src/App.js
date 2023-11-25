import { Routes, Route } from "react-router-dom";
import MainHome from "./views/MainHome";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Introduction from "./views/Introduction";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroLeft09 from "./views/Start/HeroLeft09";
import Change from "./views/InformationChange";
import LevelTest from "./views/LevelTest";
import Speech from "./views/Speech";
import Speaking from "./views/Speaking";
import Keyword from "./views/Keyword";
import STT from "./views/STT";

function App() {
  return (
     <Routes>
         <Route path="/" element={<HeroLeft09/>}/>
         <Route path="/main" element={<MainHome/>}/>
         <Route path="/login" element={<SignIn/>}/>
         <Route path="/signup" element={<SignUp/>}/>
         <Route path="/introduction" element={<Introduction/>}/>
         <Route path="/Change" element={<Change/>}/>
         <Route path="/leveltest" element={<LevelTest/>}/>
         <Route path="/speech" element={<Speech/>}/>
         <Route path="/keyword" element={<Keyword/>}/>
         <Route path="/speaking" element={<Speaking/>}/>
         <Route path="/stt" element={<STT/>}/>
    </Routes>
  );
}

export default App;
