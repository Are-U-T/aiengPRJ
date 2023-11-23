package com.project.eng_back.Controller;

import java.util.Base64;
import java.util.UUID;

import com.project.eng_back.Dto.TalkingRoomDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpSession;

import com.project.eng_back.Service.TalkingRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/talking")
public class TalkingRoomController {

    public Logger logger, LOGGER = LoggerFactory.getLogger(TalkingRoomController.class);

    @Autowired
    private TalkingRoomService talkingRoomService;

    @Autowired
    private HttpSession session;

    @PostMapping("/newTalkingRoom")
    public int createTalkRoom(@RequestBody TalkingRoomDto talkingRoomDto) {

        String crid = UUID.randomUUID().toString().replaceAll("-", "");

        String encodedCrid = Base64.getEncoder().encodeToString(crid.getBytes());
//        encodedCrid = "'" + encodedCrid + "'";

        session.setAttribute("crid", encodedCrid);
        session.setAttribute("gptRole", talkingRoomDto.getGPTRole());
        session.setAttribute("userRole", talkingRoomDto.getUserRole());
        session.setAttribute("situation", talkingRoomDto.getSituation());

        talkingRoomDto.setCrid((String) session.getAttribute("crid"));

        return talkingRoomService.insert(talkingRoomDto);
    }
}