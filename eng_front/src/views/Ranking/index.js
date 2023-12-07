import Navigation from "../Navigation";
import RankingArea from "./RankingArea";
import React from "react";
import Footer from "../Speech/Footer";

export default function MyPage(){

    return (
        <>
            <div style={{backgroundColor : 'white'}}>
                <Navigation/>
                <RankingArea/>
                <Footer/>
            </div>
        </>
    )
}