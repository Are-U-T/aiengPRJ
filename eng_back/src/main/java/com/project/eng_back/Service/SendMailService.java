package com.project.eng_back.Service;

import com.project.eng_back.Controller.TalkingRoomController;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor // 생성자에 필요한 의존성 자동 주입
public class SendMailService {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    private JavaMailSender javaMailSender; // 이메일 발송 객체
    private String senderEmail = "devtestmail.9900@gmail.com";
    private int number;

    public void createNumber() {
        number = (int) (Math.random() * (90000)) + 100000; // 100,000 ~ 99,999
    }

    public MimeMessage CreateMail(String mail) {
        createNumber();
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
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return message; // 이메일 객체 반환
    }

    // 이메일 발송
    public int SendMail(@RequestBody String email) {
        logger.info("***** 서비스 *****");
        logger.info("mail: {}", email);
        logger.info("***** 서비스 *****");

        createNumber(); // number 초기화

        MimeMessage message = CreateMail(email); // 이메일 생성

        javaMailSender.send(message); // 이메일 발송

        return number; // 인증 번호 반환
    }
}