import React, {useState, useEffect} from 'react';
import './RankingArea.css';
import '../../../App.css'
import king from './images/kingImg.webp';

export default function RankingArea() {

    return (
        <div className='App'>
            <div style={{marginTop: '150px'}}/>
            <div className='rankingCenter'>

                <h2>지난 달 명예의 전당</h2>
                <div className="ranking-flex-container">
                    <img className="ranking-king" src={king} alt="..."/>
                    <h4>0 0 0 님</h4>
                    <h6>100 점</h6>
                    <img className="ranking-king" src={king} alt="..."/>
                </div>


                <div className='rankingContainer'>
                    <div className='ranking-flex-container2'>
                        <h4 className='ranking-85'>박서윤</h4>
                        <h4>90점</h4>
                    </div>
                    <div className="ranking-grayline"/>
                </div>
            </div>
        </div>
    )
}