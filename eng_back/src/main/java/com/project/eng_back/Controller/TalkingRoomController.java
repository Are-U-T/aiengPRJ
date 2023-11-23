package com.project.eng_back.Controller;

import java.util.Base64;
import java.util.UUID;

import com.project.eng_back.Dto.QuestionRequestDto;
import com.project.eng_back.Dto.TalkingRoomDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.project.eng_back.Service.TalkingRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/talking")
public class TalkingRoomController {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    @Autowired
    private TalkingRoomService talkingRoomService;

    @Autowired
    private ChatGptController chatGptController;

    QuestionRequestDto initiationRequestDto = new QuestionRequestDto();

    @PostMapping("/newTalkingRoom")
    public int createTalkRoom(@RequestBody TalkingRoomDto talkingRoomDto) {

        String crid = UUID.randomUUID().toString().replaceAll("-", "");

        String encodedCrid = Base64.getEncoder().encodeToString(crid.getBytes());

        talkingRoomDto.setCrid(encodedCrid);

        logger.info("***** TalkingRoomController *****");
        logger.info("crid: {}", crid);
        logger.info("gptRole: {}", talkingRoomDto.getGPTRole());
        logger.info("userRole: {}", talkingRoomDto.getUserRole());
        logger.info("situation: {}", talkingRoomDto.getSituation());
        logger.info("***** TalkingRoomController *****");

        initiationRequestDto.setCrid(talkingRoomDto.getCrid());
        initiationRequestDto.setGPTRole(talkingRoomDto.getGPTRole());
        initiationRequestDto.setUserRole(talkingRoomDto.getUserRole());
        initiationRequestDto.setSituation(talkingRoomDto.getSituation());
        chatGptController.initiateConversation(initiationRequestDto);

        return talkingRoomService.insert(talkingRoomDto);
    }
}