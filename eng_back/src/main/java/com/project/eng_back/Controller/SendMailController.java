package com.project.eng_back.Controller;

import com.project.eng_back.Dto.MailDto;
import com.project.eng_back.Dto.UserDTO;
//import com.project.eng_back.Service.SendMailService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class SendMailController {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    private static String email, number;

    private int number2;
    private final UserDTO userDto = new UserDTO();

    private static MailDto mailDto = new MailDto();

    private final JavaMailSender javaMailSender; // 이메일 발송 객체

    private final String senderEmail = "devtestmail.9900@gmail.com";

    public MimeMessage CreateMail(String mail) {

        MimeMessage message = javaMailSender.createMimeMessage(); // 이메일 객체 생성

        try {
            // 발신자, 수신자, 타이틀
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, mail);
            message.setSubject("이메일 인증");

            String body = "";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
            body += "<h1>" + number + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body, "UTF-8", "html");

            Properties props = new Properties();
            props.setProperty("mail.smtp.socketFactory.fallback", "false");
            props.setProperty("mail.smtp.socketFactory.port", "587");
            props.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            props.setProperty("mail.smtp.connectiontimeout", "0");
            props.setProperty("mail.smtp.timeout", "0");
            props.setProperty("mail.smtp.writetimeout", "0");
            props.setProperty("mail.smtp.readtimeout", "0");

            Session session = Session.getInstance(props, new javax.mail.Authenticator() {
                // 인증 정보 설정 (필요에 따라)
            });
//            session.setDebug(true); // 디버그 로그 활성화

        } catch (MessagingException e) {
            logger.error("이메일 생성 중 오류 발생: {}", e.getMessage());

        }
        return message; // 이메일 객체 반환
    }

    public String SendMail(String email) {

        number = createNumber();

        logger.info("service: {}", email);

        MimeMessage message = CreateMail(email); // 이메일 생성

        javaMailSender.send(message); // 이메일 발송

        return number; // 인증 번호 반환
    }


    @ResponseBody
    @PostMapping("/mail")
    public String Mail(@RequestBody UserDTO uDto) {

        email = uDto.getEmail();
        userDto.setEmail(uDto.getEmail());

        logger.info("***** 컨트롤러 *****");
        logger.info("(cilent) email: {}", email);
        logger.info("(server) email: {}", userDto.getEmail());

        String number = SendMail(userDto.getEmail());

        return number;
    }

    public String createNumber() {

        number2 = (int) (Math.random() * (90000)) + 100000; // 100,000 ~ 99,999

        String confirm = String.valueOf(number2);

        mailDto.setConfirm(confirm);

        logger.info("***** 서비스 *****");
        logger.info("server num(service): {}", confirm);

        return String.valueOf(number2);
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
            logger.info("success");
            return "success";
        } else {
            logger.info("false");
        }
        return "false";
    }
}