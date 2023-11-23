package com.project.eng_back.Controller;

//import java.util.Base64;
//import java.util.UUID;

import com.project.eng_back.Dto.TalkingRoomDto;
import com.project.eng_back.Service.TalkingRoomService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/talking")
public class TalkingRoomController {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    @Autowired
    private TalkingRoomService talkingRoomService;

    @PostMapping("/newTalkingRoom")
    public int createTalkRoom(@RequestBody TalkingRoomDto talkingRoomDto) {
        return talkingRoomService.insert(talkingRoomDto);
    }
}