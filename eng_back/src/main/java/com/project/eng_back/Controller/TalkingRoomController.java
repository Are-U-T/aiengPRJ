package com.project.eng_back.Controller;

import java.util.Base64;
import java.util.Map;
import java.util.UUID;

import com.project.eng_back.Dto.Choice;
import com.project.eng_back.Dto.QuestionRequestDto;
import com.project.eng_back.Dto.TalkingRoomDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.project.eng_back.Service.TalkingRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/talking")
public class TalkingRoomController {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    @Autowired
    private TalkingRoomService talkingRoomService;

    @Autowired
    private ChatGptController chatGptController;

    private TalkingRoomDto talkingRoomDto = new TalkingRoomDto();

    private QuestionRequestDto questionRequestDto = new QuestionRequestDto();

    QuestionRequestDto initiationRequestDto = new QuestionRequestDto();

    @PostMapping("/newTalkingRoom")
    public String createNewTalkingRoom(@RequestBody Map<String, String> data) {
        String situation = data.get("selectedItem");
        String gptRole = data.get("selectedAirole");
        String userRole = data.get("selectedMyrole");

        String crid = UUID.randomUUID().toString().replaceAll("-", "");
        System.out.println("crid: " + crid);
        String encodedCrid = Base64.getEncoder().encodeToString(crid.getBytes());
        System.out.println("encodedCrid: " + encodedCrid);
        talkingRoomDto.setCrid(encodedCrid); // crid 설정
        logger.info("crid 값 {} ", talkingRoomDto.getCrid());
        questionRequestDto.setCrid(encodedCrid); // crid 설정

        logger.info("***** TalkingRoomController *****");
        logger.info("crid: {}", crid);
        logger.info("gptRole: {}", gptRole);
        logger.info("userRole: {}", userRole);
        logger.info("situation: {}", situation);
        logger.info("***** TalkingRoomController *****");

        initiationRequestDto.setCrid(encodedCrid);
        initiationRequestDto.setGPTRole(gptRole);
        initiationRequestDto.setUserRole(userRole);
        initiationRequestDto.setSituation(situation);
        chatGptController.initiateConversation(initiationRequestDto);

        talkingRoomDto.setCrid(encodedCrid);
        talkingRoomDto.setGPTRole(gptRole);
        talkingRoomDto.setUserRole(userRole);
        talkingRoomDto.setSituation(situation);
        talkingRoomService.insert(talkingRoomDto);

        return encodedCrid;
    }
}