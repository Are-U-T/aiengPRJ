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
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chat-gpt")
public class ChatGptController {

    private final ChatGptService chatGptService;
    private final QuickstartSample quickstartSample;

    private final QuestionRequestDto questionRequestDto = new QuestionRequestDto();

    private final Choice choice;

    private boolean first = true;

    private String recommended;
    private List<String> recommendedList = new ArrayList<>();

    // 대화 기록을 저장할 변수
    private StringBuilder conversationHistory = new StringBuilder();

    HttpSession session;

    @Autowired
    public ChatGptController(ChatGptService chatGptService, QuickstartSample quickstartSample, Choice choice) {
        this.chatGptService = chatGptService;
        this.quickstartSample = quickstartSample;
        this.choice = choice;
    }

    @PostMapping("/recommend")
    public List<Map<String, String>> getRecommendQuestion(@RequestBody Map<String, String> request) {
        String crid = request.get("crid");
        String speaker = request.get("speaker");
        String userNum = request.get("userNum");
        System.out.println("!!!!!!!!!!!!!!!!" + crid + "!!!!!!!!!!!!!!!!" + speaker + "!!!!!!!!!!!!!!!!" + userNum);
        recommendQuestion(crid, speaker, userNum);
        return chatGptService.getGptContentList2(crid, speaker);
    }

    public void recommendQuestion(String crid, String speaker, String userNum) {

        QuestionRequestDto questionRequestDto = chatGptService.getGptContentList3(crid);

        if (first) {
            // gpt 한테 질문 1개 추천 받기
            recommended = String.format(
                    "You're my %s, and I'm your %s. " +
                            "We're in a situation is '%s'. " +
                            "Recommend one questions that fit the role and situation."
                            + "And answer without the number.",
                    questionRequestDto.getGPTRole(), questionRequestDto.getUserRole(), questionRequestDto.getSituation());
            first = false;
        } else {
            // 이미 추천 받은 질문 제외하고 다른 질문 받기
            recommended = String.format("You're my %s, and I'm your %s. " +
                            "We're in a situation is '%s'. " +
                            "Apart from previous questions such as "+ recommendedList.toString() +
                            ", please recommend other one questions."
                            + "And answer without the number.",
                    questionRequestDto.getGPTRole(), questionRequestDto.getUserRole(), questionRequestDto.getSituation());
        }

        questionRequestDto.setQuestion(recommended);
        ChatGptResponseDto recommendedQuestion = chatGptService.recommendedQuestion(questionRequestDto);
        Choice recommend = extractChoiceFromResponse(recommendedQuestion, recommended);
        recommend.setCrid(crid);
        recommend.setSpeaker(speaker);
        recommend.setUid(userNum);
        chatGptService.saveToDatabase(recommend);
        recommendedList.add(recommend.getText());
        System.out.println("recommend list: " + recommendedList.toString());
        System.out.println("recommend.getText(): " + recommend.getText());
    }

    // 초기 대화 세팅
    public byte[] initiateConversation(QuestionRequestDto initiationRequestDto, String unum) {

        questionRequestDto.setUnum(unum);
        String userRole = initiationRequestDto.getUserRole();
        String gptRole = initiationRequestDto.getGPTRole();
        String situation = initiationRequestDto.getSituation();
        String level = initiationRequestDto.getLv();
        questionRequestDto.setCrid(initiationRequestDto.getCrid());
        choice.setCrid(initiationRequestDto.getCrid());

        String initialQuestion = String.format(
                "To increase English conversation, we're going to take on roles and converse in English. " +
                        "You're my %s, and I'm your %s. " +
                        "We're in a situation is '%s'. " +
                        "And when answering, answer without your roles. " +
                        "You just have to play the role of the %s. " +
                        "And when conversing, please only use ‘%s’",
                gptRole, userRole, situation, gptRole, userRole, level);

        ChatGptResponseDto gptResponseDto = chatGptService.setSituation(new QuestionRequestDto(initialQuestion));

        Choice gptResponseChoice = extractChoiceFromResponse(gptResponseDto, initialQuestion);
        gptResponseChoice.setCrid(initiationRequestDto.getCrid());

        if (gptResponseChoice == null) {
            gptResponseDto = chatGptService.setSituation(initiationRequestDto);
            gptResponseChoice = extractChoiceFromResponse(gptResponseDto, initialQuestion);
        }

        byte[] audioBytes = quickstartSample.run(gptResponseChoice, initiationRequestDto.getCountry()).getBody();
        // Add log to check if the audio data is generated and returned correctly
//        System.out.println("GPT audio file. Size: " + audioBytes.length + " bytes");

        gptResponseChoice.setSpeaker("Teacher");

//        quickstartSample.run(gptResponseChoice);

        questionRequestDto.setGPTRole(initiationRequestDto.getGPTRole());
        questionRequestDto.setUserRole(initiationRequestDto.getUserRole());
        questionRequestDto.setSituation(initiationRequestDto.getSituation());
        questionRequestDto.setCountry(initiationRequestDto.getCountry());
        questionRequestDto.setLv(initiationRequestDto.getLv());

        return audioBytes;
    }

    // 대화방 설정 이후 대화 진행용
    public byte[] conversation(String question , String userNum) {

        try {

            if (question == null) {
                question = "The user's words were not entered correctly, so please repeat them.";
            }

            questionRequestDto.setQuestion(question);

            System.out.println("userNum : " + userNum);

//            sendRoleAndSituationToChatGptPy(userRole, gptRole, situation);

            ChatGptResponseDto gptResponseDto = chatGptService.askQuestion(questionRequestDto, conversationHistory);

//            ChatGptResponseDto gptResponseDto = sendRoleAndSituationToChatGptPy(userRole, gptRole, situation, conversationHistory);

//            System.out.println("py 코드에서 리턴 받은 것임: " + sendRoleAndSituationToChatGptPy(userRole, gptRole, situation, conversationHistory));
            Choice gptResponseChoice = extractChoiceFromResponse(gptResponseDto, question);
            gptResponseChoice.setCrid(questionRequestDto.getCrid());

            System.out.println("gptResponseChoice.getCrid: " + gptResponseChoice.getCrid());

            if (gptResponseChoice == null) {
                gptResponseDto = chatGptService.askQuestion(questionRequestDto, conversationHistory);
                gptResponseChoice = extractChoiceFromResponse(gptResponseDto, question);
            }

            byte[] audioBytes = quickstartSample.run(gptResponseChoice, questionRequestDto.getCountry()).getBody();

            // Add log to check if the audio data is generated and returned correctly
            System.out.println("Received audio file. Size: " + audioBytes.length + " bytes");

            System.out.println("1");

            Choice correctGrammar = new Choice();

            // uid set 해주기
            questionRequestDto.setUnum(userNum);
            gptResponseChoice.setUid(userNum);
            correctGrammar.setUid(userNum);

            questionRequestDto.setQuestion(question);
            questionRequestDto.setSpeaker("User");
            chatGptService.saveToDatabase2(questionRequestDto); // 유저 저장

            System.out.println("4");
            // GPT 한테 문법 체크 받은 거 저장
            correctGrammar = grading(question);
            correctGrammar.setCrid(questionRequestDto.getCrid());
            correctGrammar.setSpeaker("Corrected grammar");
            correctGrammar.setUid(userNum);

            chatGptService.saveToDatabase(correctGrammar); // 문법 체크 저장
            System.out.println("문법 저장");

            gptResponseChoice.setSpeaker("Teacher");
            chatGptService.saveToDatabase(gptResponseChoice); // 선생 저장

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

    // gpt 한테 유저의 말을 문법 검사 받기
    public Choice grading(String question) {

        ChatGptResponseDto gptResponseDto = chatGptService.grading(question);
        Choice answer = extractChoiceFromResponse(gptResponseDto, question);
        return answer;
    }

    // gpt 한테 return 받은 값에서 text 를 뽑는 메서드
    private Choice extractChoiceFromResponse(ChatGptResponseDto responseDto, String question) {
        if (responseDto != null && responseDto.getChoices() != null && !responseDto.getChoices().isEmpty()) {
            return responseDto.getChoices().get(0);
        } else {
            return null;
        }
    }

    // 아래부터는 파이썬에 open ai 에 요청 보내는 코드들임 ,, 근데 실패함 ㅋ
//    private ChatGptResponseDto sendRoleAndSituationToChatGptPy(String userRole, String gptRole, String situation, StringBuilder conversationHistory) {
//        String chatGptPyUrl = "http://10.20.100.136:8889/update-model";
//        HttpClient httpClient = HttpClient.newHttpClient();
//
//        try {
//            // 데이터를 JSON 형식으로 변환
//            String jsonBody = buildJsonBody(userRole, gptRole, situation, conversationHistory);
//
//            // HTTP 요청 구성
//            HttpRequest request = HttpRequest.newBuilder()
//                    .uri(URI.create(chatGptPyUrl))
//                    .header("Content-Type", "application/json")
//                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
//                    .build();
//
//            // HTTP 요청 보내기
//            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
//
//            // 응답을 ChatGptResponseDto 객체로 반환
//            Gson gson = new Gson();
//            return gson.fromJson(response.body(), ChatGptResponseDto.class);
//        } catch (IOException | InterruptedException e) {
//            e.printStackTrace();
//            return null;  // 오류 발생 시 null 반환
//        }
//    }
//
//    // 데이터를 JSON 형식으로 변환하는 메서드
//    private String buildJsonBody(String userRole, String gptRole, String situation, StringBuilder conversationHistory) {
//        Map<String, String> data = new HashMap<>();
//        data.put("user_role", userRole);
//        data.put("gpt_role", gptRole);
//        data.put("situation", situation);
//        data.put("conversationHistory", conversationHistory.toString());
//
//        // JSON 문자열 생성
//        return new Gson().toJson(data);
//    }
}