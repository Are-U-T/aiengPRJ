import React from 'react';
import {useLocation} from "react-router-dom";

export default function Script() {

    const location = useLocation();
    const crid = location.state?.crid; // 채팅방 생성시에 전달 받은 crid 전달 받아서 서버에 넘겨줌

    console.log("crid", crid);

    return (
        <>
            <div>스크립트임</div>
        </>
    )
}