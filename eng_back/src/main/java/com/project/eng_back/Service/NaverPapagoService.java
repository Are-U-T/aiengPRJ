package com.project.eng_back.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.eng_back.Controller.TalkingRoomController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.*;
import java.util.HashMap;
import java.util.Map;

@Service
public class NaverPapagoService {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    public String getTransSentence(String search, String sourceLang, String targetLang) {

        String textContent;
        String clientId = "";
        String clientSecret = "";

        String apiURL = "https://openapi.naver.com/v1/papago/n2mt";

        try {
            textContent = URLEncoder.encode(search, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("papago API 인코딩 에러" + e);
        }

        Map<String, String> requestHeader = new HashMap<>();
        requestHeader.put("X-Naver-Client-Id", clientId);
        requestHeader.put("X-Naver-Client-Secret", clientSecret);

        String resonseBody = post(apiURL, requestHeader, textContent, sourceLang, targetLang);

        logger.info("responseBody = {}", resonseBody);

        return convertToData(resonseBody);
    }

    private String convertToData(String responseBody) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);

            // 'message' 노드 아래 'result' 노드에서 'translatedText' 값을 추출
            JsonNode resultNode = jsonNode.get("message").get("result");
            String translatedText = resultNode.get("translatedText").asText();

            translatedText = translatedText.replace("\"", "").replace(".", "");

            return translatedText;
        } catch (Exception e) {
            throw new RuntimeException("API 응답 데이터를 처리하는데 실패했습니다.", e);
        }
    }

    private String post(String apiUrl, Map<String, String> requestHeaders, String text, String sourceLang, String targetLang) {

        HttpURLConnection con = connect(apiUrl);

        // String postParams = "source=ko&target=en&text=" + text;
        String postParams = "source=" + sourceLang + "&target=" + targetLang + "&text=" + text;

        try {
            con.setRequestMethod("POST");
            for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            con.setDoOutput(true);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.write(postParams.getBytes());
                wr.flush();
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
                return readBody(con.getInputStream());
            } else {
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }
}