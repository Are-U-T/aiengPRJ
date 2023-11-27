//package com.project.eng_back.Service;
//
//import com.project.eng_back.Dto.NaverDto;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//import org.json.JSONParser;
//import org.json.JSONObject;
//
//@Service
//public class SocialLoginService {
//    @Value("${naver.client.id}")
//    private String NAVER_CLIENT_ID;
//
//    @Value("${naver.client.secret}")
//    private String NAVER_CLIENT_SECRET;
//
//    @Value("${naver.redirect.url}")
//    private String NAVER_REDIRECT_URL;
//
//    private final static String NAVER_AUTH_URI = "https://nid.naver.com"; // oauth 인증 엔드포인트
//    private final static String NAVER_API_URI = "https://openapi.naver.com";
//
//    public String getNaverLogin() {
//        return NAVER_AUTH_URI + "/oauth2.0/authorize"
//                + "?client_id="
//                + NAVER_CLIENT_ID
//                + "&redirect_uri=" + NAVER_REDIRECT_URL
//                + "&response_type=code";
//    }
//
//    public NaverDto getNaverInfo(String code) throws Exception {
//        if (code == null) throw new Exception("Failed get authorization code");
//
//        String accessToken = "";
//        String refreshToken = "";
//
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.add("Content-type", "application/x-www-form-urlencoded");
//
//            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//            params.add("grant_type"   , "authorization_code");
//            params.add("client_id"    , NAVER_CLIENT_ID);
//            params.add("client_secret", NAVER_CLIENT_SECRET);
//            params.add("code"         , code);
//            params.add("redirect_uri" , NAVER_REDIRECT_URL);
//
//            RestTemplate restTemplate = new RestTemplate();
//            HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, headers);
//
//            ResponseEntity<String> response = restTemplate.exchange(
//                    NAVER_AUTH_URI + "/oauth2.0/token",
//                    HttpMethod.POST,
//                    httpEntity,
//                    String.class
//            );
//
//            JSONParser jsonParser = new JSONParser();
//            JSONObject jsonObj = (JSONObject) jsonParser.parse(response.getBody());
//
//            accessToken  = (String) jsonObj.get("access_token");
//            refreshToken = (String) jsonObj.get("refresh_token");
//        } catch (Exception e) {
//            throw new Exception("API call failed");
//        }
//
//        return getUserInfoWithToken(accessToken);
//    }
//
//    private NaverDto getUserInfoWithToken(String accessToken) throws Exception {
//        //HttpHeader 생성
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "Bearer " + accessToken);
//        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        //HttpHeader 담기
//        RestTemplate rt = new RestTemplate();
//        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(headers);
//        ResponseEntity<String> response = rt.exchange(
//                NAVER_API_URI + "/v1/nid/me",
//                HttpMethod.POST,
//                httpEntity,
//                String.class
//        );
//
//        //Response 데이터 파싱
//        JSONParser jsonParser = new JSONParser();
//        JSONObject jsonObj = (JSONObject) jsonParser.parse(response.getBody());
//        JSONObject account = (JSONObject) jsonObj.get("response");
//
//        String id = String.valueOf(account.get("id"));
//        String email = String.valueOf(account.get("email"));
//        String name = String.valueOf(account.get("name"));
//
//        return NaverDto.builder()
//                .id(id)
//                .email(email)
//                .name(name).build();
//
//        RestTemplate restTemplate = new RestTemplate();
//        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, headers);
//
//        ResponseEntity<String> response = restTemplate.exchange(
//                NAVER_AUTH_URI + "/oauth2.0/token",
//                HttpMethod.POST,
//                httpEntity,
//                String.class
//        );
//
//        JSONParser jsonParser = new JSONParser();
//        JSONObject jsonObj = (JSONObject) jsonParser.parse(response.getBody());
//
//        accessToken  = (String) jsonObj.get("access_token");
//        refreshToken = (String) jsonObj.get("refresh_token");
//    }
//}