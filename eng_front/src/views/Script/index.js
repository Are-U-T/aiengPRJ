import React from "react";
import Navigation from "../Navigation";
import ScriptPage from "./ScriptPage";
import '../../App.css';

export default function Script() {

    return (
        <div className='App'>
            <div style={{backgroundColor: 'white'}}>
                <Navigation/>
                <ScriptPage/>
            </div>
        </div>
    )
}