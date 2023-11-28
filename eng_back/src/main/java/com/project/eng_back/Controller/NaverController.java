package com.project.eng_back.Controller;

import com.project.eng_back.Dto.NaverLoginRequest;
import com.project.eng_back.Dto.NaverUserInfoDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("oauth/naver")
public class NaverController {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    @Autowired
    private HttpServletRequest request;

    @Value("${naver.client.id")
    private String naverClientId;

    @Value("${naver.client.secret}")
    private String naverClientSecret;

    @PostMapping("/callback")
    public ResponseEntity<String> naverLogin(@RequestBody NaverLoginRequest naverLoginRequest) {

        String authorizationHeader = request.getHeader("Authorization");
        String accessToken = authorizationHeader.substring(7); // "Bearer " 이후의 토큰 추출

        // Naver API로부터 사용자 정보를 얻기 위한 URL
        String naverApiUrl = "https://openapi.naver.com/v1/nid/me";
        logger.info("access_token: {}", naverLoginRequest.getAccessToken());

        // 네이버 API에 요청하기 위한 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + naverLoginRequest.getAccessToken());

        // HTTP 요청을 보내고 응답 받기
        ResponseEntity<NaverUserInfoDto> responseEntity = new RestTemplate().exchange(
                naverApiUrl,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                NaverUserInfoDto.class
        );

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            // 사용자 정보를 성공적으로 받았을 경우
            NaverUserInfoDto userInfo = responseEntity.getBody();

            String userId = userInfo.getId();
            String userEmail = userInfo.getEmail();
            String userName = userInfo.getName();

            logger.info("userId: {}", userId);
            logger.info("userEmail: {}", userEmail);
            logger.info("userName: {}", userName);

            return ResponseEntity.ok("Successfully logged in with Naver.");
        } else {
            return ResponseEntity.status(responseEntity.getStatusCode()).body("Failed to log in with Naver.");
        }
    }
}
