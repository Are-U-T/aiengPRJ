import React, {useState, useEffect} from "react";
import './Script.css';
import {useLocation} from "react-router-dom";
import axios from "axios";

export default function Script() {

    const location = useLocation();
    const crid = location.state?.crid;
    console.log("crid", crid);

    const [getScript, setGetScript] = useState([]);
    const [getScript2, setGetScript2] = useState([]);

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
            console.error('그냥 다 에러!!!!!!!!!!!!!!!!!!!!:', error);
        }
    };

    const script2 = async () => {
        try {
            const response = await axios.post('http://localhost/chatting/script2', {crid});
            console.log('응답:', response.data);
            setGetScript2(response.data);
        } catch (error) {
            console.error('그냥 다 에러!!!!!!!!!!!!!!!!!!!!:', error);
        }
    };

    // const scriptDto = async () => {
    //     try {
    //         const response = await axios.post('http://localhost/chatting/scriptDto', {crid});
    //         console.log('응답:', response.data);
    //         setGetScript(response.data);
    //     } catch (error) {
    //         console.error('그냥 다 에러!!!!!!!!!!!!!!!!!!!!:', error);
    //     }
    // };

    return (
        <>
            <div className="start"></div>
            <div className="container-main">
                <div className="title">
                    <button id="btn">복습하기</button>
                    <p className="date">
                        {getScript.map((title, index) => (
                            <p className="date" key={index}>
                                {title.REGDATE}
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

                        <div className="sayGPT">
                            {getScript2.map((title, index) => (
                                <div key={index}>
                                    <div key={index}>
                                        {index % 3 === 1 ? (
                                            <>
                                                <p className="sayUser">{title.SPEAKER}</p>
                                                <p className="script2">{title.CONTENT}</p>
                                            </>
                                        ) : index % 3 === 2 ? (
                                            <>
                                                <p className="sayUser">{title.SPEAKER}</p>
                                                <p className="script">{title.CONTENT}</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="say">{title.SPEAKER}</p>
                                                <p className="scriptGPT">{title.CONTENT}</p>
                                            </>
                                        )}
                                    </div>

                                </div>
                            ))}
                            <br/>
                            {/*<p className="script2">Yeah! Nice to met you, too</p>*/}
                        </div>


                        {/*<div className="sayGPT">*/}
                        {/*    <p className="say">*/}
                        {/*        {getScript2.map((title, index) => (*/}
                        {/*            <p key={index}>*/}
                        {/*                {title.SPEAKER}*/}
                        {/*            </p>*/}
                        {/*        ))}*/}
                        {/*    </p>*/}
                        {/*    <p className="scriptGPT">*/}
                        {/*        {getScript2.map((title, index) => (*/}
                        {/*            <p key={index}>*/}
                        {/*                {title.CONTENT}*/}
                        {/*            </p>*/}
                        {/*        ))}*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        {/*<div className="sayUser">*/}
                        {/*    <p className="say">*/}
                        {/*        {getScript2.map((title, index) => (*/}
                        {/*            <p key={index}>*/}
                        {/*                {title.SPEAKER}*/}
                        {/*            </p>*/}
                        {/*        ))}*/}
                        {/*    </p>*/}
                        {/*    <p className="script">*/}
                        {/*        {getScript2.map((title, index) => (*/}
                        {/*            <p key={index}>*/}
                        {/*                {title.CONTENT}*/}
                        {/*            </p>*/}
                        {/*        ))}</p><br/>*/}
                        {/*    <p className="script2">Yeah! Nice to met you, too</p>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    )
}