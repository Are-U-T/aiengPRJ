package com.project.eng_back.Controller;

import com.project.eng_back.Service.KakaoAPI;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.HashMap;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth/callback")
public class KakaoController {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    KakaoAPI kakaoAPI = new KakaoAPI();

    @RequestMapping("/kakao")
    public ModelAndView login(@RequestParam("code") String code, HttpSession session) {
        ModelAndView mav = new ModelAndView();

        logger.info("code: {}", code);

        // 1. 인증코드 요청 전달
        String access_token = kakaoAPI.getAccessToken(code);

        // 2. 인증코드로 토큰 전달
        HashMap<String, Object> userInfo = kakaoAPI.getUserInfo(access_token);

        System.out.println("login info : " + userInfo.toString());

        if(userInfo.get("email") != null) {
            session.setAttribute("userId", userInfo.get("email"));
            session.setAttribute("accessToken", access_token);
        }

        mav.addObject("userId", userInfo.get("email"));
        mav.setViewName("index");
        return mav;
    }
}