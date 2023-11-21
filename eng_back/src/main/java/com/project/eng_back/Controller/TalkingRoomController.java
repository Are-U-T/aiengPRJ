package com.project.eng_back.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.project.eng_back.Service.TalkingRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/talking")
public class TalkingRoomController {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    @Autowired
    private TalkingRoomService talkingRoomService;

    @PostMapping("/newTalkingRoom")
    public String createTalkRoom() {

        String crid = UUID.randomUUID().toString().replaceAll("-", "");;
        logger.info("Create Room ID: {}", crid);

//        talkingRoomService.createTalkingRoom(crid);

        return crid;
    }
}