import React, {useState, useEffect} from 'react';
import '../../../App.css';
import './VocaArea.css';
import axios from "axios";
import Modal from "../../Speech/Modal";
import loginImg from "../../Speech/images/loginImg.png";
import {useNavigate} from "react-router-dom";

export default function VocaArea() {

    const [vocaList, setVocaList] = useState([]);
    const userNum = sessionStorage.getItem('userNum');
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPage, setNextPage] = useState(2);
    const [modal, setModal] = useState(true);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (userNum == null) {
            // 모달 창 띄워서 로그인 하세요 하고 확인 누르면 로그인 창으로 보내기
            setLoginModalOpen(true);
        }
        setModal(true)
        vocaLoading();
    }, [userNum]);

    const closeModalAndNavigate = () => {
        setLoginModalOpen(false);
        navigate('/login');
    };

    const vocaLoading = async () => {
        try {
            const response = await axios.post('http://localhost/voca/list', {userNum});
            console.log('단어장:', response.data); // 응답 로깅
            setVocaList(response.data);
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    const chunkArray = (array, size) => {
        return Array.from({length: Math.ceil(array.length / size)}, (v, i) =>
            array.slice(i * size, i * size + size)
        );
    };

    const handlePrevPage = () => {
        if (currentPage > 2) {
            setCurrentPage(currentPage - 2);
            setNextPage(nextPage - 2);
        }
    };

    const deleteVoca = async (word) => {
        try {
            const response = await axios.post('http://localhost/voca/delete', {word, userNum});
            console.log('삭제 성공');
            vocaLoading();
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    const handleNextPage = () => {
        const totalPages = chunkedVocaList.length;

        if (currentPage <= chunkedVocaList.length / 2) {
            setCurrentPage(currentPage + 2);
            setNextPage(nextPage + 2);
        }
    };

    const chunkedVocaList = chunkArray(vocaList, 10);

    return (
        <div className='App'>
            <div className="VocaCenter">
                {/*왼쪽 페이지 div*/}
                <div className="VocaContainerL" style={{marginTop: '150px'}}>
                    {chunkedVocaList[currentPage - 1] && (
                        <div className="voca">
                            <div><p>{currentPage}p</p></div>
                            {chunkedVocaList[currentPage - 1].map((voca, index) => (
                                <div key={index}>
                                    <div className="vocaList">
                                        <p>{voca.WORD} : {voca.RESULTWORD}
                                            <button className="vocaXBtn" onClick={() => deleteVoca(voca.RESULTWORD)}>X
                                            </button>
                                        </p>
                                    </div>
                                    <div className="grayline"/>
                                </div>
                            ))}
                        </div>
                    )}
                    <button className="vocaBtn" onClick={handlePrevPage}>←</button>
                </div>

                {/*책 중심*/}
                <div className="VocaCenter2"></div>

                {/*오른쪽 페이지 div*/}
                <div className="VocaContainerR" style={{marginTop: '150px'}}>
                    {chunkedVocaList[nextPage - 1] && (
                        <div className="voca">
                            <div className="vocaPageR"><p>{nextPage}p</p></div>
                            {chunkedVocaList[nextPage - 1].map((voca, index) => (
                                <div key={index}>
                                    <div className="vocaList">
                                        <p>{voca.WORD} : {voca.RESULTWORD}
                                            <button className="vocaXBtn" onClick={() => deleteVoca(voca.WORD)}>X
                                            </button>
                                        </p>
                                    </div>
                                    <div className="grayline"/>
                                </div>
                            ))}
                        </div>
                    )}
                    {chunkedVocaList[nextPage - 1] && (
                        <div className="vocaPageR">
                            <button className="vocaBtn" onClick={handleNextPage}>→</button>
                        </div>
                    )}
                </div>
            </div>

            {modal && (
                <div className="vocaModalBackground">
                    <div className="vocaModal">
                        <div className="voca-modal-instructions">
                            <h3>단어장 사용 설명서</h3>
                            <p><b>STEP 1</b> 대화 중 <b>검색했던 단어</b>들이 저장된 단어장입니다</p>
                            <p><b>STEP 2</b> 공부가 끝난 단어는 <b>삭제 버튼</b>을 눌러서 지우세요</p>
                            <button className="vocaModalBtn" onClick={() => setModal(false)}>닫기</button>
                        </div>
                    </div>
                </div>
            )}

            <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>

                <div className="vocaModalCenter">
                    <img src={loginImg} alt='로그인 이미지' className="speechLoginImg"/>
                    <h4>로그인 후 이용해 주세요</h4>
                    <button onClick={closeModalAndNavigate} className="modal-custom-button">
                        닫기
                    </button>
                </div>
            </Modal>
        </div>
    );
}