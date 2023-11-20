import React, {useEffect, useState} from "react";
import Navigation from "../Navigation";
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