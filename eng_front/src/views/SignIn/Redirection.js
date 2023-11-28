import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Redirection = () => {
    const code = window.location.search;
    const navigate = useNavigate();

    useEffect(() => {
        console.log("http://localhost/oauth/callback/kakao");
        axios.post(`${"http://localhost/oauth/callback/kakao"}kakaoLogin${code}`).then((r) => {
            console.log(r.data);
            navigate('/main');
        });
    }, []);

    return <div>로그인 중입니다.</div>;
};

export default Redirection;