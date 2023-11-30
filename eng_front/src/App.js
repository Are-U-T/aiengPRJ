import {Routes, Route} from "react-router-dom";
import MainHome from "./views/MainHome";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Introduction from "./views/Introduction";
import 'bootstrap/dist/css/bootstrap.min.css';
import Developer from "./views/Developer";
import HeroLeft09 from "./views/Start/HeroLeft09";
import LevelTest from "./views/LevelTest";
import Speech from "./views/Speech";
import Speaking from "./views/Speaking";
import Keyword from "./views/Keyword";
import Mypage from "./views/MyPage";
import EngExam from "./views/EngExam";
import ResultPage from "./views/EngExam/ResultPage";
import Script from "./views/Script"

function App() {
    return (
        <Routes>
            <Route path="/" element={<HeroLeft09/>}/>
            <Route path="/main" element={<MainHome/>}/>
            <Route path="/login" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/introduction" element={<Introduction/>}/>
            <Route path="/developer" element={<Developer/>}/>
            <Route path="/leveltest" element={<LevelTest/>}/>
            <Route path="/speech" element={<Speech/>}/>
            <Route path="/keyword" element={<Keyword/>}/>
            <Route path="/speaking" element={<Speaking/>}/>
            <Route path="/mypage" element={<Mypage/>}/>
            <Route path="/engExam" element={<EngExam/>}/>
            <Route path="/resultpage" element={<ResultPage/>}/>
            <Route path="/script" element={<Script/>}/>
        </Routes>
    );
}

export default App;