package com.project.eng_back.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/talking")
public class TalkingRoomController {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    @Autowired
    private TalkingRoomService talkingRoomService;

    @PostMapping("/newTalkingRoom")
    public String createTalkRoom() {

        String roomID = "";

        roomID = UUID.randomUUID().toString();

        talkingRoomService.createTlakRoomID(roomID);

        logger.info("Create Room ID: {}" + roomID);

        return "redirect:/button";
    }

//    private void createTalkRoom(String roomID) {
//        logger.info("Create Room ID: {}" + roomID);
//        talkingRoomService.createTlakRoomID(roomID);
//    }
}