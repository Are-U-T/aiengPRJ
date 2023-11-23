import React from 'react';
import Navigation2 from "../Navigation2";
import logo from './images/logo.png';

const ProjectIntro = () => (
    <>
        <Navigation2 />
        <div style={{textAlign: 'center', marginTop: '10px', padding: '20px'}}>
            <img src={logo} alt="로고" style={{width: '200px', marginBottom: '5px'}}/>
            <h1>AI 영어 회화 학습 사이트에 오신 것을 환영합니다</h1>
            <p style={{fontSize: '18px', marginTop : '40px'}}>
                <strong>로고의 의미:</strong> 저희 팀의 메인 로고인 'T'는 "너 T야?"를 상징하며,
                '선생님(teacher)'을 의미합니다. 이는 최고 수준의 영어 학습 지도를 제공하겠다는 저희의
                약속을 나타냅니다.
            </p>
            <p style={{fontSize: '18px' , marginTop : '10px'}}>
                <strong>대상 사용자:</strong> 현재 영어 실력에 관계없이 영어를 배우고자 하는 모든 분들을
                대상으로 합니다.
            </p>
            <p style={{fontSize: '18px'}}>
                <strong>저희의 목표:</strong> 이 사이트의 목표는 사용자가 더 효과적으로 영어를 배우고,
                대면 회화에 비해 스트레스를 덜 받으면서 전통적인 과외보다 경제적인 방법을 제공하는 것입니다.
                <br/>AI의 힘을 활용하여 학습 경험을 개인화합니다.
            </p>
            <p style={{fontSize: '22px', fontWeight: 'bold', color: '#007bff', marginBottom: '30px' , marginTop : '15px'}}>
                AI의 힘을 활용한 즐겁고 상호작용적인 방식으로 영어 마스터에 도전하세요!
            </p>
            <div style={{backgroundColor: 'skyblue', padding: '20px', borderRadius: '10px', color : "white"}}>
                <h2>사이트 특징</h2>
                <ul style={{fontWeight: 'bold', fontSize: '18px', textAlign: 'center', listStyleType: 'none', paddingLeft: '0'}}>
                    <li>🌟 맞춤형 학습 경로</li>
                    <li>🌟 실시간 피드백 및 평가</li>
                    <li>🌟 다양한 상호작용적 학습 자료</li>
                    <li>🌟 유연한 학습 스케줄</li>
                    <li>🌟 친근하고 지원적인 학습 커뮤니티</li>
                </ul>
            </div>
        </div>
    </>
);

export default ProjectIntro;
