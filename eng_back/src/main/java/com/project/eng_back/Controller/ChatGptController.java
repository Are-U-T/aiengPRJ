package com.project.eng_back.Controller;

import com.project.eng_back.Dto.ChatGptResponseDto;
import com.project.eng_back.Dto.Choice;
import com.project.eng_back.Dto.QuestionRequestDto;
import com.project.eng_back.Service.ChatGptService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat-gpt")
public class ChatGptController {

    private final ChatGptService chatGptService;

    public ChatGptController(ChatGptService chatGptService) {
        this.chatGptService = chatGptService;
    }

    @PostMapping("/question")
    public void sendQuestion(@RequestBody QuestionRequestDto requestDto) {
        // GPT에서 답변 얻기
        ChatGptResponseDto gptResponseDto = chatGptService.askQuestion(requestDto);

        // GPT 답변 중에서 첫 번째 Choice를 가져오거나 처리하는 로직을 추가할 수 있습니다.
        Choice gptResponseChoice = extractChoiceFromResponse(gptResponseDto);

        // 유저의 question을 데이터베이스에 저장
        chatGptService.saveToDatabase2(requestDto);

        // GPT 답변을 데이터베이스에 저장
        chatGptService.saveToDatabase(gptResponseChoice);
    }

    private Choice extractChoiceFromResponse(ChatGptResponseDto responseDto) {
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
