package com.project.eng_back.Controller;

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
@RestController
@RequestMapping("/chat-gpt")
public class ChatGptController {

    private final ChatGptService chatGptService;

    private final QuickstartSample quickstartSample;

    private boolean isFirstQuestion = true; // 초기 질문 여부를 체크하기 위한 변수

    public ChatGptController(ChatGptService chatGptService, QuickstartSample quickstartSample) {
        this.chatGptService = chatGptService;
        this.quickstartSample = quickstartSample;
    }

    @PostMapping("/question")
    public ResponseEntity<String> initiateConversation(@RequestBody QuestionRequestDto initiationRequestDto) {
        try {

            if(isFirstQuestion){
                // 임의의 역할, 사용자 역할, 상황을 사용하여 초기 질문 생성
                String initialQuestion = "To increase English conversation, we're going to take on roles and converse in English." +
                        "You're my boyfriend, and I'm your girlfriend. " +
                        "We're in a situation where we're planning a trip for our 1st anniversary." +
                        "You just have to play the role of the boyfriend." +
                        "So, starting now, as your girlfriend, " +
                        "I'll be asking and answering questions, and you, as the boyfriend, can start by asking a question in English.";

//            // 프론트엔드에서 받은 역할과 주제를 이용하여 초기 질문 생성
//            String initialQuestion = "너는 " + initiationRequestDto.getGPTRole() + "이고, 나의 역할은 " + initiationRequestDto.getUserRole()
//                    + "(이)야. 그리고 우리의 상황은 " + initiationRequestDto.getSituation()
//                    + "(이)야. 5분 이상 대화를 해야 하니 너의 역할에 집중해서 대화를 진행해줘. 그럼 시작해줘";

                // GPT에 초기 질문 보내기
                ChatGptResponseDto gptResponseDto = chatGptService.askQuestion(new QuestionRequestDto(initialQuestion));

                // GPT 답변 중에서 첫 번째 Choice를 가져오거나 처리하는 로직을 추가할 수 있습니다.
                Choice gptResponseChoice = extractChoiceFromResponse(gptResponseDto, initialQuestion);

                if(gptResponseChoice == null){
                    // GPT에서 답변 다시 얻기
                    gptResponseDto = chatGptService.askQuestion(initiationRequestDto);
                    gptResponseChoice = extractChoiceFromResponse(gptResponseDto, initialQuestion);
                }

                // 음성 파일로 gpt 답 내보내기
                quickstartSample.run(gptResponseChoice);

                // 초기 질문과 GPT의 답변을 데이터베이스에 저장
                chatGptService.saveToDatabase2(new QuestionRequestDto(initialQuestion, initiationRequestDto.getGPTRole(),initiationRequestDto.getUserRole(), initiationRequestDto.getSituation()));
                chatGptService.saveToDatabase(gptResponseChoice);

                // 초기 질문 보내기 완료함
                isFirstQuestion = false;

                return new ResponseEntity<>("Initiation question and GPT response saved successfully.", HttpStatus.OK);
            }

            // GPT에서 답변 얻기
            ChatGptResponseDto gptResponseDto = chatGptService.askQuestion(initiationRequestDto);

            // GPT 답변 중에서 첫 번째 Choice를 가져오거나 처리하는 로직을 추가할 수 있습니다.
            Choice gptResponseChoice = extractChoiceFromResponse(gptResponseDto, initiationRequestDto.getQuestion());

            if(gptResponseChoice == null){
                // GPT에서 답변 다시 얻기
                gptResponseDto = chatGptService.askQuestion(initiationRequestDto);
                gptResponseChoice = extractChoiceFromResponse(gptResponseDto, initiationRequestDto.getQuestion());
            }

            // 음성 파일로 gpt 답 내보내기
            quickstartSample.run(gptResponseChoice);

            // 유저의 question과 역할을 데이터베이스에 저장
            chatGptService.saveToDatabase2(initiationRequestDto);

            // GPT 답변을 데이터베이스에 저장
            chatGptService.saveToDatabase(gptResponseChoice);

            return new ResponseEntity<>("Question and GPT response saved successfully.", HttpStatus.OK);
        } catch (Exception e) {
            // 에러가 발생하면 적절하게 처리
            return new ResponseEntity<>("Error processing the initiation question: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Choice extractChoiceFromResponse(ChatGptResponseDto responseDto, String question) {
        // 여기에서 적절한 로직으로 responseDto에서 Choice를 추출하여 반환하는 코드를 작성하세요.
        // 예시로, 단순히 첫 번째 Choice를 반환하는 코드를 작성했습니다.
        if (responseDto != null && responseDto.getChoices() != null && !responseDto.getChoices().isEmpty()) {
            return responseDto.getChoices().get(0);
        } else {
            // 적절한 처리를 추가하세요 (예: 예외 던지기 또는 기본값 반환)
            return null;
        }
    }
}
