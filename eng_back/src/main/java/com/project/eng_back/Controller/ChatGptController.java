package com.project.eng_back.Controller;

import com.google.gson.Gson;
import com.project.eng_back.Dto.ChatGptResponseDto;
import com.project.eng_back.Dto.Choice;
import com.project.eng_back.Dto.QuestionRequestDto;
import com.project.eng_back.Service.ChatGptService;
import com.project.eng_back.TTS.QuickstartSample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chat-gpt")
public class ChatGptController {

    private final ChatGptService chatGptService;
    private final QuickstartSample quickstartSample;

    private final QuestionRequestDto questionRequestDto;

    private final Choice choice;

    private boolean isFirstQuestion = true;

    // 대화 기록을 저장할 변수
    private StringBuilder conversationHistory = new StringBuilder();

    @Autowired
    public ChatGptController(ChatGptService chatGptService, QuickstartSample quickstartSample, QuestionRequestDto questionRequestDto, Choice choice) {
        this.chatGptService = chatGptService;
        this.quickstartSample = quickstartSample;
        this.questionRequestDto = questionRequestDto;
        this.choice = choice;
    }

    public boolean initiateConversation(QuestionRequestDto initiationRequestDto){

        String userRole = initiationRequestDto.getUserRole();
        String gptRole = initiationRequestDto.getGPTRole();
        String situation = initiationRequestDto.getSituation();
        questionRequestDto.setCrid(initiationRequestDto.getCrid());
        choice.setCrid(initiationRequestDto.getCrid());

        System.out.println("----------------------------------------------------------------");
        System.out.println("questionRequestDto.getCrid(): " + questionRequestDto.getCrid());
        System.out.println("----------------------------------------------------------------");

        System.out.println("----------------------------------------------------------------");
        System.out.println("initiationRequestDto.getCrid: " + initiationRequestDto.getCrid());
        System.out.println("choice.getCrid: " + choice.getCrid());
        System.out.println("----------------------------------------------------------------");

        System.out.println("userRole: " + userRole);
        System.out.println("gptRole: " + gptRole);
        System.out.println("situation: " + situation);
        String initialQuestion = String.format(
                "To increase English conversation, we're going to take on roles and converse in English. " +
                        "You're my %s, and I'm your %s. " +
                        "We're in a situation where %s. " +
                        "You just have to play the role of the %s. " +
                        "So, starting now, as your %s, " +
                        "I'll be asking and answering questions, and you, as the %s, can start by asking a question in English."
                        + "Answer naturally as if you were talking to me."
                        + "And when answering, answer without your roles. ",
                gptRole, userRole, situation, gptRole, userRole, gptRole);

        ChatGptResponseDto gptResponseDto = chatGptService.setSituation(new QuestionRequestDto(initialQuestion));

        Choice gptResponseChoice = extractChoiceFromResponse(gptResponseDto, initialQuestion);
        gptResponseChoice.setCrid(initiationRequestDto.getCrid());

        if (gptResponseChoice == null) {
            gptResponseDto = chatGptService.setSituation(initiationRequestDto);
            gptResponseChoice = extractChoiceFromResponse(gptResponseDto, initialQuestion);
        }

        quickstartSample.run(gptResponseChoice);
        chatGptService.saveToDatabase2(new QuestionRequestDto(initiationRequestDto.getCrid(),initialQuestion, initiationRequestDto.getGPTRole(), initiationRequestDto.getUserRole(), initiationRequestDto.getSituation()));
        chatGptService.saveToDatabase(gptResponseChoice);
        isFirstQuestion = false;

        return isFirstQuestion;
    }

    public byte[] conversation(String question) {

        System.out.println("question : " + question);
        try {

//            if (isFirstQuestion) {
//                initiateConversation(initiationRequestDto);
//                return new ResponseEntity<>("Initiation question and GPT response saved successfully.", HttpStatus.OK);
//            }

//            sendRoleAndSituationToChatGptPy(userRole, gptRole, situation);

            ChatGptResponseDto gptResponseDto = chatGptService.askQuestion(question);

//            ChatGptResponseDto gptResponseDto = sendRoleAndSituationToChatGptPy(userRole, gptRole, situation, conversationHistory);

//            System.out.println("py 코드에서 리턴 받은 것임: " + sendRoleAndSituationToChatGptPy(userRole, gptRole, situation, conversationHistory));
            Choice gptResponseChoice = extractChoiceFromResponse(gptResponseDto, question);

            if (gptResponseChoice == null) {
                gptResponseDto = chatGptService.askQuestion(question);
                gptResponseChoice = extractChoiceFromResponse(gptResponseDto, question);
            }

            byte[] audioBytes = quickstartSample.run(gptResponseChoice).getBody();

            // Add log to check if the audio data is generated and returned correctly
            System.out.println("Received audio file. Size: " + audioBytes.length + " bytes");

            questionRequestDto.setQuestion(question);
//            chatGptService.saveToDatabase2(questionRequestDto);
//            chatGptService.saveToDatabase(gptResponseChoice);

            // 대화 기록 업데이트
            conversationHistory.append(question).append("\n");
            conversationHistory.append(gptResponseChoice.getText()).append("\n");

//            return new ResponseEntity<>("Question and GPT response saved successfully.", HttpStatus.OK);

            return audioBytes;
        } catch (Exception e) {
            System.out.println("에러!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            e.printStackTrace();
//            return new ResponseEntity<>("Error processing the initiation question: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            return new byte[0];
        }
    }

    private Choice extractChoiceFromResponse(ChatGptResponseDto responseDto, String question) {
        if (responseDto != null && responseDto.getChoices() != null && !responseDto.getChoices().isEmpty()) {
            return responseDto.getChoices().get(0);
        } else {
            return null;
        }
    }

    // 아래부터는 파이썬에 open ai 에 요청 보내는 코드들임 ,, 근데 실패함 ㅋ
    private ChatGptResponseDto sendRoleAndSituationToChatGptPy(String userRole, String gptRole, String situation, StringBuilder conversationHistory) {
        String chatGptPyUrl = "http://10.20.100.136:8889/update-model";
        HttpClient httpClient = HttpClient.newHttpClient();

        try {
            // 데이터를 JSON 형식으로 변환
            String jsonBody = buildJsonBody(userRole, gptRole, situation,conversationHistory );

            // HTTP 요청 구성
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(chatGptPyUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            // HTTP 요청 보내기
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            // 응답을 ChatGptResponseDto 객체로 반환
            Gson gson = new Gson();
            return gson.fromJson(response.body(), ChatGptResponseDto.class);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return null;  // 오류 발생 시 null 반환
        }
    }

    // 데이터를 JSON 형식으로 변환하는 메서드
    private String buildJsonBody(String userRole, String gptRole, String situation, StringBuilder conversationHistory) {
        Map<String, String> data = new HashMap<>();
        data.put("user_role", userRole);
        data.put("gpt_role", gptRole);
        data.put("situation", situation);
        data.put("conversationHistory", conversationHistory.toString());

        // JSON 문자열 생성
        return new Gson().toJson(data);
    }
}
