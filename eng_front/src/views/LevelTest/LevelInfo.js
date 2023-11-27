// LevelInfo.js
import React from 'react';

function LevelInfo({ level }) {
    switch (level) {
        case 1:
            return <p>레벨 1에 대한 설명과 정보입니다.</p>;
        case 2:
            return <p>레벨 2에 대한 설명과 정보입니다.</p>;
        case 3:
            return <p>레벨 3에 대한 설명과 정보입니다.</p>;
        default:
            return null;
    }
}

export default LevelInfo;
