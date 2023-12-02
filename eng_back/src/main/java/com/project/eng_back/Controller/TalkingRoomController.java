package com.project.eng_back.Controller;

import java.security.Timestamp;
import java.util.*;

import com.project.eng_back.Dto.Choice;
import com.project.eng_back.Dto.QuestionRequestDto;
import com.project.eng_back.Dto.TalkingRoomDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.project.eng_back.Service.TalkingRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/talking")
public class TalkingRoomController {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    @Autowired
    private TalkingRoomService talkingRoomService;

    @Autowired
    private ChatGptController chatGptController;

    private TalkingRoomDto talkingRoomDto = new TalkingRoomDto();

    private QuestionRequestDto questionRequestDto = new QuestionRequestDto();

    QuestionRequestDto initiationRequestDto = new QuestionRequestDto();

    @PostMapping("/chattingList")
    public List<Map<String, String>> getUserChattingList(@RequestBody Map<String, String> request) {
        String userNum = request.get("userNum");
        List<Map<String, String>> originalList = talkingRoomService.getGptContentList(userNum);
        return convertTimestampsToString(originalList);
    }

    // Timestamp를 String으로 변환
    private List<Map<String, String>> convertTimestampsToString(List<Map<String, String>> originalList) {
        List<Map<String, String>> convertedList = new ArrayList<>();

        for (Map<String, String> originalMap : originalList) {
            Map<String, String> convertedMap = new HashMap<>();

            for (Map.Entry<String, String> entry : originalMap.entrySet()) {
                Object value = entry.getValue();
                if (value instanceof Timestamp) {
                    // Timestamp를 String으로 변환
                    value = value.toString();
                }
                convertedMap.put(entry.getKey(), value.toString());
            }

            convertedList.add(convertedMap);
        }

        return convertedList;
    }

    @PostMapping("/newTalkingRoom")
    public String createNewTalkingRoom(@RequestBody Map<String, String> data) {

        String situation = data.get("selectedItem");
        String gptRole = data.get("selectedAirole");
        String userRole = data.get("selectedMyrole");
        String country = data.get("selectedCountry");
        String lv = (data.get("selectedLv"));
        String unum = (data.get("userNum"));

        System.out.println("---------------------------------------");
        System.out.println(situation);
        System.out.println(gptRole);
        System.out.println(userRole);
        System.out.println(country);
        System.out.println(lv);
        System.out.println(unum);
        System.out.println("---------------------------------------");

        // 한국어에서 영어로 바꾸는 메서드
        questionRequestDto = translateToEnglish(situation,gptRole,userRole,country);

        String crid = UUID.randomUUID().toString().replaceAll("-", "");
        System.out.println("crid: " + crid);
        String encodedCrid = Base64.getEncoder().encodeToString(crid.getBytes());
        System.out.println("encodedCrid: " + encodedCrid);
        talkingRoomDto.setCrid(encodedCrid);
        talkingRoomDto.setLv(lv);
        talkingRoomDto.setUnum(unum);

        logger.info("crid 값 {} ", talkingRoomDto.getCrid());
        questionRequestDto.setCrid(encodedCrid);

        talkingRoomDto.setCrid(encodedCrid);
        talkingRoomDto.setGPTRole(questionRequestDto.getGPTRole());
        talkingRoomDto.setUserRole(questionRequestDto.getUserRole());
        talkingRoomDto.setSituation(questionRequestDto.getSituation());
        talkingRoomDto.setCountry(country);
        talkingRoomService.insert(talkingRoomDto);

        initiationRequestDto.setCrid(encodedCrid);
        initiationRequestDto.setGPTRole(questionRequestDto.getGPTRole());
        initiationRequestDto.setUserRole(questionRequestDto.getUserRole());
        initiationRequestDto.setSituation(questionRequestDto.getSituation());
        initiationRequestDto.setCountry(questionRequestDto.getCountry());
        chatGptController.initiateConversation(initiationRequestDto, unum);

        return encodedCrid;
    }

    // 있는 상황들에 대해서만 . . . 변역
    public QuestionRequestDto translateToEnglish(String situation , String gptRole, String userRole, String country){
        int voice;

        if(situation.equals("주말 데이트 계획 세우기"))
        {
            situation = "Plan a weekend date";
            if(gptRole.equals("여자친구")){
                gptRole = "girfriend";
                userRole = "boyfriend";
                if(country.equals("영국")){
                    voice = 4;
                } else {
                    voice = 8;
                }

            } else{
                gptRole = "boyfriend";
                userRole = "girfriend";
                if(country.equals("영국")){
                    voice = 3;
                } else {
                    voice = 7;
                }
            }
        } else if(situation.equals("일본 여행 2박 3일 일정 정하기")){
            situation="Decide on a 3-day, 2-night trip to Japan";
            if(gptRole.equals("엄마")){
                gptRole = "mom";
                userRole = "daughter";
                if(country.equals("영국")){
                    voice = 2;
                } else {
                    voice = 6;
                }
            } else{
                gptRole = "daughter";
                userRole = "mom";
                if(country.equals("영국")){
                    voice = 4;
                } else {
                    voice = 8;
                }
            }
        } else {
            situation="Recommend favorite movies to each other";
            if(gptRole.equals("남자")){
                gptRole = "man";
                userRole = "woman";
                if(country.equals("영국")){
                    voice = 1;
                } else {
                    voice = 5;
                }
            } else{
                gptRole = "woman";
                userRole = "man";
                if(country.equals("영국")){
                    voice = 2;
                } else {
                    voice = 5;
                }
            }

        }

        questionRequestDto.setSituation(situation);
        questionRequestDto.setGPTRole(gptRole);
        questionRequestDto.setUserRole(userRole);
        questionRequestDto.setCountry(voice);

        return questionRequestDto;
    }
}