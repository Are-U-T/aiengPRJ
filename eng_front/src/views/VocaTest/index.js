import React from "react";
import Navigation from "../Navigation";
import VocaTestPage from "./VocaTestPage";
import Footer from './Footer/index';

export default function VocaTest() {

    return (
        <>
            <div style={{backgroundColor: 'white'}}>
                <Navigation/>
                <VocaTestPage/>
            </div>
            <Footer/>
        </>
    )
}