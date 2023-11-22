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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class ChatGptService {

    private static final RestTemplate restTemplate = new RestTemplate();

    private final ChatGPTMapper chatGPTMapper;

    private final StringBuilder conversationHistory = new StringBuilder();

    private static final Logger logger = LoggerFactory.getLogger(ChatGptService.class);

    public ChatGptService(ChatGPTMapper chatGPTMapper) {
        this.chatGPTMapper = chatGPTMapper;
    }

    public void saveToDatabase(Choice choice) {
        chatGPTMapper.save(choice);
    }

    public String getGptContent() {
        return chatGPTMapper.getGptContent();
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

    public ChatGptResponseDto askQuestion(QuestionRequestDto requestDto, StringBuilder conversationHistory) {

        String prompt = "To increase English conversation, we're going to take on roles and converse in English. " +
                "You're my " + requestDto.getGPTRole() + " , and I'm your " + requestDto.getUserRole() +
                "We're in a situation where %s. " +
                "You just have to play the role of the" + requestDto.getSituation()
                + "Answer naturally as if you were talking to me.";

        // GPT에게 고려된 프롬프트로 요청 보내고 응답 받기
        ChatGptRequestDto chatGptRequestDto = ChatGptRequestDto.builder()
                .model(ChatGptConfig.MODEL)
                .prompt(prompt)
                .maxTokens(ChatGptConfig.MAX_TOKEN)
                .temperature(ChatGptConfig.TEMPERATURE)
                .topP(ChatGptConfig.TOP_P)
                .build();

        logger.info("Sent prompt to GPT: {}", chatGptRequestDto.getPrompt());

        System.out.println("이전 대화임: " + conversationHistory.toString());

        return this.getResponse(this.buildHttpEntity(chatGptRequestDto));
    }
}
