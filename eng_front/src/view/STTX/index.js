import React from 'react';

const SpeechToTextUI = () => {
    const startRecording = async () => {
        try {
            await fetch('http://localhost/api/speech-to-text/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Start Recording Request Sent');
        } catch (error) {
            console.error('Error sending start recording request:', error);
        }
    };

    const stopRecording = async () => {
        try {
            await fetch('http://localhost/api/speech-to-text/stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Stop Recording Request Sent');
        } catch (error) {
            console.error('Error sending stop recording request:', error);
        }
    };

    return (
        <div>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
        </div>
    );
};

export default SpeechToTextUI;
