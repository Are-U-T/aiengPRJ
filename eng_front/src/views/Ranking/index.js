import Navigation from "../Navigation";
import RankingArea from "./RankingArea";
import React from "react";

export default function MyPage(){

    return (
        <>
            <div style={{backgroundColor : 'white'}}>
                <Navigation/>
                <RankingArea/>
            </div>
        </>
    )
}