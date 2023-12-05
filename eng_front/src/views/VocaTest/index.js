import React from "react";
import Navigation from "../Navigation";
import VocaTestPage from "./VocaTestPage";

export default function VocaTest() {

    return (
        <>
            <div style={{backgroundColor: 'white'}}>
                <Navigation/>
                <VocaTestPage/>
            </div>
        </>
    )
}