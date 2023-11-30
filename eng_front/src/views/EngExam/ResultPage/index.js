import { useLocation } from 'react-router-dom';
import LV1 from './images/LV1.png';
import LV2 from './images/LV2.png';
import LV3 from './images/LV3.png';
import LV4 from './images/LV4.png';
import LV5 from './images/LV5.png';
import LV6 from './images/LV6.png';


const ResultPage = () => {
    const location = useLocation();
    const score = location.state ? location.state.score : null;

    return (
        <div style={{ backgroundColor: 'white', height: '100vh',  width: '1024px',margin: 'auto', flexDirection: 'column', justifyContent: 'center'}}>
            {/*<h2>Your Score: {score} / 100</h2>*/}
            {score >= 90 ? (
                <img src={LV6} style={{ maxWidth: '100%',  width: 'auto', height: 'auto' }}/>
            ) : score >= 80 ? (
                <img src={LV5} style={{ maxWidth: '100%',  width: 'auto', height: 'auto' }}/>
            ) : score >= 60 ? (
                <img src={LV4} style={{ maxWidth: '100%',  width: 'auto', height: 'auto' }}/>
            ) : score >= 40 ? (
                <img src={LV3} style={{ maxWidth: '100%',  width: 'auto', height: 'auto' }}/>
            ) : score >= 20 ? (
                <img src={LV2} style={{ maxWidth: '100%',  width: 'auto', height: 'auto' }}/>
            ) : (
                <img src={LV1} style={{ maxWidth: '100%',  width: 'auto', height: 'auto' }}/>
            )}
        </div>


    );
};

export default ResultPage;

