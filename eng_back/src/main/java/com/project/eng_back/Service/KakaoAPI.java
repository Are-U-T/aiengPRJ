package com.project.eng_back.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.project.eng_back.Controller.TalkingRoomController;
import com.project.eng_back.Controller.UserController;
import com.project.eng_back.Dto.GoogleUserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@RestController
public class KakaoAPI {

    @Autowired
    private UserController userController;

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    private UserService uService;

    private HttpSession session;

    public String getAccessToken(String code) {
        System.out.println("0");
        String accessToken = "";
        String refreshToken = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=f961fd909cac0eaf2b2be07f9ccfdf38");
            sb.append("&redirect_url=http://localhost:3000");
            sb.append("&code=" + code);

            bw.write(sb.toString());
            bw.flush();

            int responseCode = conn.getResponseCode();
            System.out.println("response code = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body = " + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            accessToken = element.getAsJsonObject().get("access_token").getAsString();
            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();

            br.close();
            bw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return accessToken;
    }

    public HashMap<String, Object> getUserInfo(String accessToken) {


        System.out.println("1");
        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String reqUrl = "https://kapi.kakao.com/v2/user/me";

        try {
            URL url = new URL(reqUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode" + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body =" + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakaoAccount = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            System.out.println("2");
            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakaoAccount.getAsJsonObject().get("email").getAsString();
            logger.info("name: {}", nickname);
            logger.info("mail: {}", email);


//            userInfo.put("nickname", nickname);
//            userInfo.put("email", email);
            System.out.println("3");

            GoogleUserDTO googleUserDTO = new GoogleUserDTO();

            googleUserDTO.setName(nickname);
            googleUserDTO.setEmail(email);
//            googleUserDTO.setPw("kakaoPW");
//            googleUserDTO.setGender(1);

            System.out.println(googleUserDTO);


//            UserController userController = new UserController();
            userController.googleSave(googleUserDTO, session);

//            UserDTO uDto = new UserDTO();

//            uDto.setName(googleUserDTO.getName());
//            uDto.setEmail(googleUserDTO.getEmail());
//            uDto.setPw(googleUserDTO.getPw());
//            uDto.setGender(googleUserDTO.getGender());
//
//            logger.info("nickname: {}", googleUserDTO.getName());
//            logger.info("email: {}", googleUserDTO.getEmail());
//            logger.info("kakaoPW: {}", googleUserDTO.getPw());
//            logger.info("Gender: {}", googleUserDTO.getGender());
//
//            uService.save(uDto);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return userInfo;
    }

    public void kakaoLogout(String accessToken) {
        String reqURL = "https://kapi.kakao.com/v1/user/logout";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println(result);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}