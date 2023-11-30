import React from "react";
import './Script.css';

export default function Script() {

    return (
        <>
            <div className="start"></div>
            <div className="container-main">
                <div className="title">
                    <button id="btn">복습하기</button>
                    <p className="date">2023/11/29</p>
                </div>
                <div className="scriptContainer">
                    <div className="container-sub1">
                        <div className="title-1">
                            <p>Level2</p>
                            <p>나: 여자친구</p>
                        </div>
                        <div className="title-1">
                            <p>상황: 주말 데이트 계획 세우기</p>
                            <p>상대방: 남자친구</p>
                        </div>
                    </div>
                    <div className="container-sub2 scroll-container">
                        <div className="sayGPT">
                            <p className="say">Teacher</p>
                            <p className="scriptGPT">Hi, Nice to meet you</p>
                        </div>
                        <div className="sayUser">
                            <p className="say">Me</p>
                            <p className="script">Yeah! Nice to met you, too</p><br/>
                            <p className="script2">Yeah! Nice to met you, too</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}