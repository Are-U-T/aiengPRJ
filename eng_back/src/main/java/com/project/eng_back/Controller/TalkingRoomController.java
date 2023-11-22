package com.project.eng_back.Controller;

//import java.util.Base64;
//import java.util.UUID;

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

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);
    public Logger LOGGER = LoggerFactory.getLogger(TalkingRoomController.class);

    @Autowired
    private TalkingRoomService talkingRoomService;

    @Autowired
    private HttpSession session;

    @PostMapping("/newTalkingRoom")
//    public String createTalkRoom(@RequestParam String crid, @RequestParam String GPTRole, @RequestParam String userRole, @RequestParam String situation) {
    public String createTalkRoom(@RequestBody TalkingRoomDto talkingRoomDto) {

        System.out.println(talkingRoomDto.getCrid());
//        String crid = "";
//        String crid = UUID.randomUUID().toString().replaceAll("-", "");

//        String encodedCrid = Base64.getEncoder().encodeToString(crid.getBytes());
//        String crid = "안녕하세요";

        logger.info("***** *****");
//        logger.info("데이터: {} {} {}", crid + "\t" + GPTRole + "\t", userRole + "\t", situation);
        logger.info("***** *****\n");

        logger.info("***** *****");
//        logger.info("Create Room ID: {}", crid);
        logger.info("***** *****\n");

        session.setAttribute("crid", talkingRoomDto.getCrid());
        session.setAttribute("gptRole", talkingRoomDto.getGPTRole());
        session.setAttribute("userRole", talkingRoomDto.getUserRole());
        session.setAttribute("situation", talkingRoomDto.getSituation());

//        String b = (String) session.getAttribute("gptRole");
//        String c = (String) session.getAttribute("userRole");
//        String d = (String) session.getAttribute("situation");
//        String a = (String) session.getAttribute("crid");

        logger.info("1");
        try {
            talkingRoomService.createTalkingRoom(talkingRoomDto);
            logger.info("2");
        } catch (Exception e) {
            logger.info("***** *****");
            logger.info("에러 메시지: " + e.getMessage());
            logger.info("에러 원인: " + e.getCause());
//            logger.info("세션에 저장된 데이터: {} {} {} {}", a + "\t", b + "\t", c + "\t", d);
//            logger.info("세션에 저장된 데이터 타입: {} {} {} {}",
//                    a + "\t" + a.getClass().getSimpleName() + "\t",
//                    b + "\t"  + b.getClass().getSimpleName() + "\t",
//                    c + "\t"  + c.getClass().getSimpleName() + "\t",
//                    d + "\t"  + d.getClass().getSimpleName()
//            );
            logger.info("***** *****\n");

            logger.info("***** *****");
            LOGGER.error("An exception occurred", e);
            logger.info("***** *****\n");
            logger.info("3");
        }

        logger.info("***** *****");
        logger.info("세션에 데이터 저장");
//        logger.info("세션에 저장된 데이터: {} {} {} {}", a + "\t", b + "\t", c + "\t", d);
        logger.info("***** *****\n");

        return talkingRoomDto.getSituation();
    }
}