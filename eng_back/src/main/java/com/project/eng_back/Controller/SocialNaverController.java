//package com.project.eng_back.Controller;
//
//import com.project.eng_back.Service.SocialLoginService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@Controller
//@RequestMapping("/api")
//@RequiredArgsConstructor
//public class SocialNaverController {
//
//    private final SocialLoginService socialLoginService;
//
//    @GetMapping("/naver")
//    public String SocialNaver(Model model) {
//        model.addAttribute("naverURL", socialLoginService.getNaverLogin());
//
//        return "index";
//    }
//}