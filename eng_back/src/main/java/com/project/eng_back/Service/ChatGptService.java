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

import java.util.List;
import java.util.Map;

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

    public void saveToDatabase2(QuestionRequestDto question) {
        chatGPTMapper.save2(question);
    }

    public List<Map<String, String>> getGptContentList(String crid) {
        chatGPTMapper.getGptContentList(crid);
        return chatGPTMapper.getGptContentList(crid);
    }

    public List<Map<String, String>> getGptContentList2(String crid, String speaker) {
        chatGPTMapper.getGptContentList2(crid, speaker);
        return chatGPTMapper.getGptContentList2(crid, speaker);
    }

    public QuestionRequestDto getGptContentList3(String crid) {
        chatGPTMapper.getGptContentList3(crid);
        return chatGPTMapper.getGptContentList3(crid);
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

    // 초기 상황 세팅
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

    // 대화 진행
    public ChatGptResponseDto askQuestion(QuestionRequestDto questionRequestDto, StringBuilder conversationHistory) {

        String prompt = "My question is " + questionRequestDto.getQuestion() + ". And when answering, answer without your roles. " +
                "And don't forget our role situation. And our conversation history is '" + conversationHistory + "'."
                + " Don't forget that your role is " + questionRequestDto.getGPTRole() + ". And my role is " +
                questionRequestDto.getUserRole() + ". And answer naturally ";

//        String prompt = "Remember our situation and your role and communicate naturally.";

        // GPT에게 고려된 프롬프트로 요청 보내고 응답 받기
        ChatGptRequestDto chatGptRequestDto = ChatGptRequestDto.builder()
                .model(ChatGptConfig.MODEL)
                .prompt(prompt)
                .maxTokens(ChatGptConfig.MAX_TOKEN)
                .temperature(ChatGptConfig.TEMPERATURE)
                .topP(ChatGptConfig.TOP_P)
                .build();

        logger.info("Sent prompt to GPT: {}, askQuestion", chatGptRequestDto.getPrompt());

        return this.getResponse(this.buildHttpEntity(chatGptRequestDto));
    }

    // gpt 한테 문법 체크 받기
    public ChatGptResponseDto grading(String question) {

        String prompt = "\n" +
                "Please correct any grammar mistakes in the '" + question + "', " +
                "or guess what I said if it is incorrect from our previous conversation."
                + "There is no need to distinguish between lowercase and lowercase letters.";

//        String prompt = "Remember our situation and your role and communicate naturally.";

        // GPT에게 고려된 프롬프트로 요청 보내고 응답 받기
        ChatGptRequestDto chatGptRequestDto = ChatGptRequestDto.builder()
                .model(ChatGptConfig.MODEL)
                .prompt(prompt)
                .maxTokens(ChatGptConfig.MAX_TOKEN)
                .temperature(ChatGptConfig.TEMPERATURE)
                .topP(ChatGptConfig.TOP_P)
                .build();
        logger.info("Sent prompt to GPT, grading: {}", chatGptRequestDto.getPrompt());

        return this.getResponse(this.buildHttpEntity(chatGptRequestDto));
    }

    public ChatGptResponseDto recommendedQuestion(QuestionRequestDto questionRequestDto) {

        String prompt = questionRequestDto.getQuestion();

//        String prompt = "Remember our situation and your role and communicate naturally.";

        // GPT에게 고려된 fh 요청 보내고 응답 받기
        ChatGptRequestDto chatGptRequestDto = ChatGptRequestDto.builder()
                .model(ChatGptConfig.MODEL)
                .prompt(prompt)
                .maxTokens(ChatGptConfig.MAX_TOKEN)
                .temperature(ChatGptConfig.TEMPERATURE)
                .topP(ChatGptConfig.TOP_P)
                .build();
        logger.info("Sent prompt to GPT, recommendedQuestion: {}", chatGptRequestDto.getPrompt());

        return this.getResponse(this.buildHttpEntity(chatGptRequestDto));
    }

    public ChatGptResponseDto alternativeExpression(String question) {

        String prompt = "\n" +
                "What you caan say instead of '" + question + "', " +
                "Give me three examples.";

//        String prompt = "Remember our situation and your role and communicate naturally.";

        // GPT에게 고려된 프롬프트로 요청 보내고 응답 받기
        ChatGptRequestDto chatGptRequestDto = ChatGptRequestDto.builder()
                .model(ChatGptConfig.MODEL)
                .prompt(prompt)
                .maxTokens(ChatGptConfig.MAX_TOKEN)
                .temperature(ChatGptConfig.TEMPERATURE)
                .topP(ChatGptConfig.TOP_P)
                .build();
        logger.info("Sent prompt to GPT, grading: {}", chatGptRequestDto.getPrompt());

        return this.getResponse(this.buildHttpEntity(chatGptRequestDto));
    }
}