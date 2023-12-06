import React, {useEffect, useState} from "react";
import Navigation from "../../../../../../../Desktop/옮기는용/Navigation";
import Footer from "./Footer"
import Mainarea from "./Mainarea";
import Header from "./Header";

export default function MainHome(){

    return (
        <>
            <Navigation/>
            <Header/>
            <Mainarea/>
            <Footer/>
        </>
    )
}