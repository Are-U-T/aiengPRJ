import React, {useState, useEffect} from "react";
import './Script.css';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Script() {

    const location = useLocation();
    const crid = location.state?.crid;
    console.log("crid", crid);

    const [getScript, setGetScript] = useState([]);
    const [getScript2, setGetScript2] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        script();
        script2();
        // scriptDto();
    }, []); // 두 번째 인자로 빈 배열을 전달하여 한 번만 실행되도록 함

    const script = async () => {
        try {
            const response = await axios.post('http://localhost/chatting/script', {crid});
            console.log('응답:', response.data);
            setGetScript(response.data);
        } catch (error) {
            console.error('error: ', error);
        }
    };

    const script2 = async () => {
        try {
            const response = await axios.post('http://localhost/chatting/script2', {crid});
            console.log('응답:', response.data);
            setGetScript2(response.data);
        } catch (error) {
            console.error('ScriptPage error: ', error);
        }
    };

    const goToBack = () => {
        navigate('/mypage');
    }

    function formatDate(dataTimeString) {
        const getDate = new Date(dataTimeString);
        const formattedDate = `${getDate.getFullYear()}/${(getDate.getMonth() + 1).toString().padStart(2, '0')}/${getDate.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    }

    const [showPopup, setShowPopup] = useState(false);
    const [alternativeExpressions, setAlternativeExpressions] = useState([]);

    const handleClick = async (title) => {

        try {
            const textToConvert = title;
            console.log(textToConvert);

            const response = await axios.post('http://localhost/api/audio/playAudio', null, {
                params: {
                    text: textToConvert,
                },
                responseType: 'arraybuffer',
            });

            if (response.status === 200) {
                const audioBlob = new Blob([response.data], {type: 'audio/mp3'});
                const url = URL.createObjectURL(audioBlob);
                const audioElement = new Audio(url);
                audioElement.play();
                // setShowPopup(true);
            } else {
                console.error('error:', response.status);
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

    const handleClick1 = async (title) => {
        try {
            const textToConvert = title;
            console.log(textToConvert);

            const response = await axios.post('http://localhost/api/audio/alternativeExpressionOutput', null, {
                params: {
                    text: textToConvert,
                },
                responseType: 'text',
            });

            if (response.status === 200) {
                const alternativeExpression = response.data.split('\n').filter(Boolean);
                setAlternativeExpressions(alternativeExpression);

                setShowPopup(true);
            } else {
                console.error('error:', response.status);
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

    return (
        <>
            <div className="start"></div>
            <div className="script-container-main-popup">
                <div className="script-container-main">
                    <div className="title">
                        <p className="date">
                            <button className='scriptBackBtn' onClick={goToBack}>이전</button>
                            {getScript.map((title, index) => (
                                <p className="date" key={index}>
                                    {formatDate(title.REGDATE)}
                                </p>
                            ))}
                        </p>
                    </div>
                    <div className="scriptContainer">
                        <div className="container-sub1">
                            <p className="title-1">
                                {/* level */}
                                {getScript.map((title, index) => (
                                    <div key={index}>
                                        level:{"\u00A0\u00A0"}{title.LV}
                                    </div>
                                ))}
                                {/* user */}
                                {getScript.map((title, index) => (
                                    <div key={index}>
                                        나:{"\u00A0\u00A0"}{title.USERROLE}
                                    </div>
                                ))}
                                {/*<p className="scriptP">나:</p>*/}
                                {/*{getScript && (*/}
                                {/*    <>*/}
                                {/*        <p>{getScript.USERROLE}</p>*/}
                                {/*    </>*/}
                                {/*)}*/}
                            </p>
                            <div className="title-1">
                                {/* situation */}
                                {getScript.map((title, index) => (
                                    <div key={index}>
                                        상황:{"\u00A0\u00A0"}{title.SITUATION}
                                    </div>
                                ))}
                                {/* teacher */}
                                {getScript.map((title, index) => (
                                    <div key={index}>
                                        상대방:{"\u00A0\u00A0"}{title.GPTROLE}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="container-sub2 scroll-container">
                            {getScript2.map((title, index) => (
                                <div key={index}>
                                    {title.SPEAKER === 'Teacher' ? (
                                        <>
                                            <div className="scriptContent">
                                                <p className="sayGPT">{title.SPEAKER}</p>
                                                <p className="scriptGPT" onClick={() => handleClick(title.CONTENT)}>
                                                    {title.CONTENT}</p>
                                            </div>
                                        </>
                                    ) : title.SPEAKER === 'User' ? (
                                        <>
                                            <div className="scriptContent">
                                                <p className="sayUser">{title.SPEAKER}</p>
                                                <p className="script" onClick={() => handleClick1(title.CONTENT)}>
                                                    {title.CONTENT}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="scriptContent">
                                                <p className="scriptCorrect">{title.CONTENT}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="script-container-popup">
                    {showPopup && (
                        <div className="popup">
                            {alternativeExpressions.map((expression, index) => (
                                <p key={index} className="scriptRecommend">{expression}</p>
                            ))}
                            <button id="scriptBtn" onClick={() => setShowPopup(false)}>Close</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}