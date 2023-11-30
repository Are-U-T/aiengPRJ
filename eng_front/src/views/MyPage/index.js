import Navigation from "../Navigation";
import MypageArea from "./MypageArea";
import React from "react";

export default function MyPage(){

    return (
        <>
            <div style={{backgroundColor : 'white'}}>
                <Navigation/>
                <MypageArea/>
            </div>
        </>
    )
}