//package com.project.eng_back.Controller;
//
//import com.project.eng_back.Dto.MsgEntity;
//import com.project.eng_back.Dto.NaverDto;
//import com.project.eng_back.Service.SocialLoginService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import javax.servlet.http.HttpServletRequest;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("oauth/naver")
//public class NaverController {
//    private final SocialLoginService socialLoginService;
//
//    @GetMapping("/callback")
//    public ResponseEntity<MsgEntity> callback(HttpServletRequest request) throws Exception {
//        NaverDto naverInfo = socialLoginService.getNaverInfo(request.getParameter("code"));
//
//        return ResponseEntity.ok().body(new MsgEntity("Sucess", naverInfo));
//    }
//}
