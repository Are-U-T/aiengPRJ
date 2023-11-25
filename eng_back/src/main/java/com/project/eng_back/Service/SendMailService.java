//package com.project.eng_back.Service;
//
//import com.project.eng_back.Controller.SendMailController;
//import com.project.eng_back.Controller.TalkingRoomController;
//import com.project.eng_back.Dto.MailDto;
//import lombok.RequiredArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//import javax.mail.MessagingException;
//import javax.mail.Session;
//import javax.mail.internet.MimeMessage;
//import java.util.Properties;
//
//@Service
//@RequiredArgsConstructor // 생성자에 필요한 의존성 자동 주입
//public class SendMailService {
//
//    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);
//
//    private final JavaMailSender javaMailSender; // 이메일 발송 객체
//
//    private final String senderEmail = "devtestmail.9900@gmail.com";
//
//    private int number;
//
//    private SendMailController sendMailController;
//
//    private static MailDto mailDto = new MailDto();
//
////    public int createNumber() {
////
////        number = (int) (Math.random() * (90000)) + 100000; // 100,000 ~ 99,999
////
////        String confirm = String.valueOf(number);
////        mailDto.setConfirm(confirm);
////
////        logger.info("***** 서비스 *****");
////        logger.info("server num(service): {}", confirm);
////
////        return number;
////    }
//
//    public MimeMessage CreateMail(String mail) {
//
//        int number = sendMailController.createNumber();
//        System.out.println(number);
////        int number = createNumber();
//
//        MimeMessage message = javaMailSender.createMimeMessage(); // 이메일 객체 생성
//
//        try {
//            // 발신자, 수신자, 타이틀
//            message.setFrom(senderEmail);
//            message.setRecipients(MimeMessage.RecipientType.TO, mail);
//            message.setSubject("이메일 인증");
//
//            String body = "";
//            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
//            body += "<h1>" + number + "</h1>";
//            body += "<h3>" + "감사합니다." + "</h3>";
//            message.setText(body, "UTF-8", "html");
//
//            Properties props = new Properties();
//            props.setProperty("mail.smtp.socketFactory.fallback", "false");
//            props.setProperty("mail.smtp.socketFactory.port", "587");
//            props.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
//            props.setProperty("mail.smtp.connectiontimeout", "0");
//            props.setProperty("mail.smtp.timeout", "0");
//            props.setProperty("mail.smtp.writetimeout", "0");
//            props.setProperty("mail.smtp.readtimeout", "0");
//
//            Session session = Session.getInstance(props, new javax.mail.Authenticator() {
//                // 인증 정보 설정 (필요에 따라)
//            });
////            session.setDebug(true); // 디버그 로그 활성화
//
//        } catch (MessagingException e) {
//            logger.error("이메일 생성 중 오류 발생: {}", e.getMessage());
//
//        }
//        return message; // 이메일 객체 반환
//    }
//
//    // 이메일 발송
//    public int SendMail(String email) {
//        logger.info("service: {}", email);
//
//        MimeMessage message = CreateMail(email); // 이메일 생성
//
//        javaMailSender.send(message); // 이메일 발송
//
//        return number; // 인증 번호 반환
//    }
//}