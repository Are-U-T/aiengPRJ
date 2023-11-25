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

    public ChatGptResponseDto setSituation(QuestionRequestDto questionRequestDto) {

        String prompt = questionRequestDto.getQuestion();

//        String prompt = "Remember our situation and your role and communicate naturally.";

        // GPT에게 고려된 프롬프트로 요청 보내고 응답 받기
        ChatGptRequestDto chatGptRequestDto = ChatGptRequestDto.builder()
                .model(ChatGptConfig.MODEL)
                .prompt(prompt)
                .maxTokens(ChatGptConfig.MAX_TOKEN)
                .temperature(ChatGptConfig.TEMPERATURE)
                .topP(ChatGptConfig.TOP_P)
                .build();
        logger.info("Sent prompt to GPT, setSituation: {}", chatGptRequestDto.getPrompt());

        return this.getResponse(this.buildHttpEntity(chatGptRequestDto));
    }

    public ChatGptResponseDto askQuestion(QuestionRequestDto questionRequestDto, StringBuilder conversationHistory) {

        String prompt = "My question is " + questionRequestDto.getQuestion() + "And when answering, answer without your roles. " +
                "And don't forget our role situation. And our conversation history is '"+ conversationHistory + "'."
                + "Don't forget that your role is " + questionRequestDto.getGPTRole() + "And my role is "+
                questionRequestDto.getUserRole();

//        String prompt = "Remember our situation and your role and communicate naturally.";

        // GPT에게 고려된 프롬프트로 요청 보내고 응답 받기
        ChatGptRequestDto chatGptRequestDto = ChatGptRequestDto.builder()
                .model(ChatGptConfig.MODEL)
                .prompt(prompt)
                .maxTokens(ChatGptConfig.MAX_TOKEN)
                .temperature(ChatGptConfig.TEMPERATURE)
                .topP(ChatGptConfig.TOP_P)
                .build();

        logger.info("Sent prompt to GPT: {}", chatGptRequestDto.getPrompt());

        return this.getResponse(this.buildHttpEntity(chatGptRequestDto));
    }
}
