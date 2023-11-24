package com.project.eng_back.Controller;

import com.project.eng_back.Dto.UserDTO;
import com.project.eng_back.Service.SendMailService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequiredArgsConstructor
public class SendMailController {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    public SendMailService sendMailService;

//    @PostMapping("/mail")
//    public String SendMail(@RequestBody ) {
//        logger.info("***** 컨트롤러 *****");
//        logger.info("mail: {}", mail);
//        logger.info("***** 컨트롤러 *****");
//
//        int number = sendMailService.SendMail(mail);
//
//        String num = "" + number;
//
//        return num;
//    }


    @PostMapping("/mail")
    public String SendMail(@RequestBody String email) {
        logger.info("***** 컨트롤러 *****");
        logger.info("mail: {}", email);
        logger.info("***** 컨트롤러 *****");
        System.out.println(email);

        int number = sendMailService.SendMail(email);

        String num = "" + number;

        return num;
    }
}