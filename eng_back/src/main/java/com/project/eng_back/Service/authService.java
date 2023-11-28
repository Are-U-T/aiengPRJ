//package com.project.eng_back.Service;
//
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//public class authService {
//
//    @Transactional
//    public KakaoTokenDto getKakaoAccessToken(String code) {
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        // Http Response Body 객체 생성
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("grant_type", "authorization_code"); //카카오 공식문서 기준 authorization_code 로 고정
//        params.add("client_id", KAKAO_CLIENT_ID); // 카카오 Dev 앱 REST API 키
//        params.add("redirect_uri", KAKAO_REDIRECT_URI); // 카카오 Dev redirect uri
//        params.add("code", code); // 프론트에서 인가 코드 요청시 받은 인가 코드값
//        params.add("client_secret", KAKAO_CLIENT_SECRET); // 카카오 Dev 카카오 로그인 Client Secret
//
//        // 헤더와 바디 합치기 위해 Http Entity 객체 생성
//        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);
//
//        // 카카오로부터 Access token 받아오기
//        RestTemplate rt = new RestTemplate();
//        ResponseEntity<String> accessTokenResponse = rt.exchange(
//                KAKAO_TOKEN_URI, // "https://kauth.kakao.com/oauth/token"
//                HttpMethod.POST,
//                kakaoTokenRequest,
//                String.class
//        );
//
//        // JSON Parsing (-> KakaoTokenDto)
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        KakaoTokenDto kakaoTokenDto = null;
//        try {
//            kakaoTokenDto = objectMapper.readValue(accessTokenResponse.getBody(), KakaoTokenDto.class);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        return kakaoTokenDto;
//    }
//
//    public Account getKakaoInfo(String kakaoAccessToken) {
//        RestTemplate rt = new RestTemplate();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "Bearer " + kakaoAccessToken);
//        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);
//
//        // POST 방식으로 API 서버에 요청 후 response 받아옴
//        ResponseEntity<String> accountInfoResponse = rt.exchange(
//                KAKAO_USER_INFO_URI, // "https://kapi.kakao.com/v2/user/me"
//                HttpMethod.POST,
//                accountInfoRequest,
//                String.class
//        );
//
//        // JSON Parsing (-> kakaoAccountDto)
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        KakaoAccountDto kakaoAccountDto = null;
//        try {
//            kakaoAccountDto = objectMapper.readValue(accountInfoResponse.getBody(), KakaoAccountDto.class);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        // 회원가입 처리하기
//        Long kakaoId = kakaoAccountDto.getId();
//        Account existOwner = accountRepository.findById(kakaoId).orElse(null);
//        // 처음 로그인이 아닌 경우
//        if (existOwner != null) {
//            return Account.builder()
//                    .id(kakaoAccountDto.getId())
//                    .email(kakaoAccountDto.getKakao_account().getEmail())
//                    .kakaoName(kakaoAccountDto.getKakao_account().getProfile().getNickname())
//                    .build();
//        }
//        // 처음 로그인 하는 경우
//        else {
//            return Account.builder()
//                    .id(kakaoAccountDto.getId())
//                    .email(kakaoAccountDto.getKakao_account().getEmail())
//                    .kakaoName(kakaoAccountDto.getKakao_account().getProfile().getNickname())
//                    .build();
//        }
//    }
//}
