import React, { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';

const Recorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(new MicRecorder({ bitRate: 128 }));

    const startRecording = () => {
        recorder.start().then(() => {
            setIsRecording(true);
        }).catch((e) => console.error(e));
    };

    const stopRecording = async () => {
        try {
            const [buffer, blob] = await recorder.stop().getMp3();

            const formData = new FormData();
            formData.append('audio', blob, 'recording.mp3');

            // 发送音频数据到后台
            const response = await axios.post('http://localhost:8888/api/audio/upload', formData);
            console.log('Audio sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending audio:', error);
        }

        setIsRecording(false);
    };

    return (
        <div>
            <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
            <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
        </div>
    );
};

export default Recorder;



