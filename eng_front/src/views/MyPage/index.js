import Navigation from "../Navigation";
import MypageArea from "./MypageArea";
import React from "react";
import '../../App.css';

export default function MyPage(){

    return (
        <div className='App'>
            <div style={{backgroundColor : 'white'}}>
                <Navigation/>
                <MypageArea/>
            </div>
        </div>
    )
}