package com.project.eng_back.Controller;

import com.google.gson.Gson;
import com.project.eng_back.Dto.ChatGptResponseDto;
import com.project.eng_back.Dto.Choice;
import com.project.eng_back.Dto.QuestionRequestDto;
import com.project.eng_back.Service.ChatGptService;
import com.project.eng_back.TTS.QuickstartSample;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/chat-gpt")
public class ChatGptController {

    private final ChatGptService chatGptService;
    private final QuickstartSample quickstartSample;

    private boolean isFirstQuestion = true;

    public ChatGptController(ChatGptService chatGptService, QuickstartSample quickstartSample) {
        this.chatGptService = chatGptService;
        this.quickstartSample = quickstartSample;
    }

    @PostMapping("/question")
    public ResponseEntity<String> initiateConversation(@RequestBody QuestionRequestDto initiationRequestDto) {
        try {
            String userRole = initiationRequestDto.getUserRole();
            String gptRole = initiationRequestDto.getGPTRole();
            String situation = initiationRequestDto.getSituation();
            System.out.println("1");

            if (isFirstQuestion) {
                String initialQuestion = String.format(
                        "To increase English conversation, we're going to take on roles and converse in English. " +
                                "You're my %s, and I'm your %s. " +
                                "We're in a situation where %s. " +
                                "You just have to play the role of the %s. " +
                                "So, starting now, as your %s, " +
                                "I'll be asking and answering questions, and you, as the %s, can start by asking a question in English."
                                + "And don't give roles when answering.",
                        gptRole, userRole, situation, gptRole, userRole, gptRole);

                System.out.println("2");
                ChatGptResponseDto gptResponseDto = chatGptService.askQuestion(new QuestionRequestDto(initialQuestion));
                System.out.println("3");
//                sendRoleAndSituationToChatGptPy(userRole, gptRole, situation);
                System.out.println("4");
                Choice gptResponseChoice = extractChoiceFromResponse(gptResponseDto, initialQuestion);
                System.out.println("5");
                if (gptResponseChoice == null) {
                    gptResponseDto = chatGptService.askQuestion(initiationRequestDto);
                    gptResponseChoice = extractChoiceFromResponse(gptResponseDto, initialQuestion);
                }

                quickstartSample.run(gptResponseChoice);
                System.out.println("6");
                chatGptService.saveToDatabase2(new QuestionRequestDto(initialQuestion, initiationRequestDto.getGPTRole(), initiationRequestDto.getUserRole(), initiationRequestDto.getSituation()));
                chatGptService.saveToDatabase(gptResponseChoice);
                System.out.println("7");
                isFirstQuestion = false;

                return new ResponseEntity<>("Initiation question and GPT response saved successfully.", HttpStatus.OK);
            }

//            sendRoleAndSituationToChatGptPy(userRole, gptRole, situation);

            ChatGptResponseDto gptResponseDto = chatGptService.askQuestion(initiationRequestDto);

            Choice gptResponseChoice = extractChoiceFromResponse(gptResponseDto, initiationRequestDto.getQuestion());

            if (gptResponseChoice == null) {
                gptResponseDto = chatGptService.askQuestion(initiationRequestDto);
                gptResponseChoice = extractChoiceFromResponse(gptResponseDto, initiationRequestDto.getQuestion());
            }

            quickstartSample.run(gptResponseChoice);

            chatGptService.saveToDatabase2(initiationRequestDto);
            chatGptService.saveToDatabase(gptResponseChoice);

            return new ResponseEntity<>("Question and GPT response saved successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing the initiation question: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Choice extractChoiceFromResponse(ChatGptResponseDto responseDto, String question) {
        if (responseDto != null && responseDto.getChoices() != null && !responseDto.getChoices().isEmpty()) {
            return responseDto.getChoices().get(0);
        } else {
            return null;
        }
    }

    private void sendRoleAndSituationToChatGptPy(String userRole, String gptRole, String situation) {
        String chatGptPyUrl = "http://10.20.100.136:8889/update-model";
        System.out.println("p1");
        HttpClient httpClient = HttpClient.newHttpClient();
        System.out.println("p2");

        try {
            // 데이터를 JSON 형식으로 변환
            String jsonBody = buildJsonBody(userRole, gptRole, situation);

            // HTTP 요청 구성
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(chatGptPyUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            System.out.println("p3");

            // HTTP 요청 보내기
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("p4");
            System.out.println("Response from ChatGPTPY.py: " + response.body());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    // 데이터를 JSON 형식으로 변환하는 메서드
    private String buildJsonBody(String userRole, String gptRole, String situation) {
        Map<String, String> data = new HashMap<>();
        data.put("userRole", userRole);
        data.put("gptRole", gptRole);
        data.put("situation", situation);

        // JSON 문자열 생성
        return new Gson().toJson(data);
    }
}
