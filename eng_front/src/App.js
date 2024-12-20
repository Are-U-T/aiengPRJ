import {Routes, Route} from "react-router-dom";
import MainHome from "./views/MainHome";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Developer from "./views/Developer";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroLeft09 from "./views/Start/HeroLeft09";
import Change from "./views/InformationChange";
import LevelTest from "./views/EngExam";
import Speech from "./views/Speech";
import Speaking from "./views/Speaking";
import Mypage from "./views/MyPage";
import Voca from "./views/Voca"
import ResultPage from "./views/EngExam/ResultPage";
import Script from "./views/Script";
import Ranking from "./views/Ranking"
import './App.css';
import VocaTest from "./views/VocaTest";

function App() {
    return (
        <div className='App'>
        <Routes>
            <Route path="/" element={<HeroLeft09/>}/>
            <Route path="/main" element={<MainHome/>}/>
            <Route path="/login" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/developer" element={<Developer/>}/>
            <Route path="/Change" element={<Change/>}/>
            <Route path="/leveltest" element={<LevelTest/>}/>
            <Route path="/speech" element={<Speech/>}/>
            <Route path="/speaking" element={<Speaking/>}/>
            <Route path="/mypage" element={<Mypage/>}/>
            <Route path="/resultpage" element={<ResultPage/>}/>
            <Route path="/script" element={<Script/>}/>
            <Route path="/voca" element={<Voca/>}/>
            <Route path="/ranking" element={<Ranking/>}/>
            <Route path="/vocaTest" element={<VocaTest/>}/>
        </Routes>
        </div>
    );
}

export default App;