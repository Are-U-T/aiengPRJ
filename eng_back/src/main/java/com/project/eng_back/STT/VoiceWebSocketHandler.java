package com.project.eng_back.STT;

// VoiceWebSocketHandler.java

import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

public class VoiceWebSocketHandler extends BinaryWebSocketHandler {

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 连接建立后的处理
        System.out.println("WebSocket connection established: " + session.getId());
    }

    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws Exception {
        byte[] voiceData = message.getPayload().array();
        System.out.println("Received voice data with length: " + voiceData.length);

        // 在这里可以将语音数据进行处理，存储，或者进一步传递给其他地方

        // 按照你的需求进行处理，例如可以调用STT（语音转文本）服务
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 连接关闭后的处理
        System.out.println("WebSocket connection closed: " + session.getId());
    }
}

