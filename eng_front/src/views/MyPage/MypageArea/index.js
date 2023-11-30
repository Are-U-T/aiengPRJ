import React from "react";
import './Mypage.css';

export default function MypageArea() {

    return (
        <>
            <div>
                <div className="MypageCenter MypageFlex" style={{marginTop: '150px'}}/>

                <div className="MypageContainer" style={{marginRight: '20px'}}>
                    <div className="grayline"><h5 className="justify-content" style={{float: "left"}}>박서윤</h5><p
                        className="justify-content">님</p>
                    </div>
                    <div className="grayline">
                        <h5 style={{float: "left"}}>이메일</h5>
                    </div>


                </div>

                <div className="MypageContainer" style={{width: '500px'}}>

                </div>
            </div>
        </>
    )

}