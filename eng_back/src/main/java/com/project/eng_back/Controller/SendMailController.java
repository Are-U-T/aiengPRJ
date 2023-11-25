package com.project.eng_back.Controller;

import com.project.eng_back.Dto.MailDto;
import com.project.eng_back.Dto.UserDTO;
import com.project.eng_back.Service.SendMailService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

    private static String email, number;

    private final UserDTO userDto = new UserDTO();

    private static MailDto mailDto = new MailDto();

    @Autowired
    private SendMailService sendMailService;

    @ResponseBody
    @PostMapping("/mail")
    public int Mail(@RequestBody UserDTO uDto) {

        email = uDto.getEmail();
        userDto.setEmail(uDto.getEmail());

        logger.info("***** 컨트롤러 *****");
        logger.info("(cilent) email: {}", email);
        logger.info("(server) email: {}", userDto.getEmail());

        int number = sendMailService.SendMail(userDto.getEmail());

        return number;
    }

    @PostMapping("/confirm")
    public String checkNum(@RequestBody MailDto mDto) {
        number = mDto.getNumber();
        mailDto.setNumber(mDto.getNumber());

        String confirm = mailDto.getConfirm();

        logger.info("***** /confirm *****");
        logger.info("(cilent) num: {}", mailDto.getNumber());
        logger.info("(server) num: {}", mailDto.getConfirm());

        if (number.equals(confirm)) {
            return "success";
        } else {
            return "fail";
        }
    }
}