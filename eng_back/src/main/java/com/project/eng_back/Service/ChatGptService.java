package com.project.eng_back.Service;

import com.project.eng_back.Config.ChatGptConfig;
import com.project.eng_back.Dto.ChatGptRequestDto;
import com.project.eng_back.Dto.ChatGptResponseDto;
import com.project.eng_back.Dto.Choice;
import com.project.eng_back.Dto.QuestionRequestDto;
import com.project.eng_back.Mapper.ChatGPTMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatGptService {

    private static RestTemplate restTemplate = new RestTemplate();
    private String conversationHistory = "";

    private final ChatGPTMapper chatGPTMapper;

    public ChatGptService(ChatGPTMapper chatGPTMapper) {
        this.chatGPTMapper = chatGPTMapper;
    }

    public void saveToDatabase(Choice choice) {
        chatGPTMapper.save(choice);
    }

    public void saveToDatabase2(QuestionRequestDto question) {
        chatGPTMapper.save2(question);
    }

    public HttpEntity<ChatGptRequestDto> buildHttpEntity(ChatGptRequestDto requestDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(ChatGptConfig.MEDIA_TYPE));
        headers.add(ChatGptConfig.AUTHORIZATION, ChatGptConfig.BEARER + ChatGptConfig.API_KEY);
        return new HttpEntity<>(requestDto, headers);
    }

    public ChatGptResponseDto getResponse(HttpEntity<ChatGptRequestDto> chatGptRequestDtoHttpEntity) {
        ResponseEntity<ChatGptResponseDto> responseEntity = restTemplate.postForEntity(
                ChatGptConfig.URL,
                chatGptRequestDtoHttpEntity,
                ChatGptResponseDto.class);

        return responseEntity.getBody();
    }

    public ChatGptResponseDto askQuestion(QuestionRequestDto requestDto) {
        // 대화 히스토리에 현재 사용자 입력 추가
        conversationHistory += "\nUser: " + requestDto.getQuestion();

        // 이전 대화 히스토리를 고려한 프롬프트 생성
        String contextualPrompt = "User: " + requestDto.getQuestion() + "\n" +
                "Context: " + conversationHistory;

        // GPT에게 고려된 프롬프트로 요청 보내고 응답 받기
        ChatGptRequestDto chatGptRequestDto = ChatGptRequestDto.builder()
                .model(ChatGptConfig.MODEL)
                .prompt(contextualPrompt)
                .maxTokens(ChatGptConfig.MAX_TOKEN)
                .temperature(ChatGptConfig.TEMPERATURE)
                .topP(ChatGptConfig.TOP_P)
                .build();

        return this.getResponse(this.buildHttpEntity(chatGptRequestDto));
    }
}