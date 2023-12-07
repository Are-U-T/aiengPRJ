package com.project.eng_back.Controller;

import com.project.eng_back.Dto.Choice;
import com.project.eng_back.Service.ChattingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chatting")
public class ChattingController {

    @Autowired
    private ChattingService chattingService;

    @PostMapping("/content")
    public List<Map<String, String>> getContentList(@RequestBody Map<String, String> request) {
        String crid = request.get("crid");
        return chattingService.getGptContentList(crid);
    }

    @PostMapping("/grammar")
    public List<Map<String, String>> getContentList2(@RequestBody Map<String, String> request) {
        String crid = request.get("crid");
        String speaker = request.get("speaker");
        String unum = request.get("unum");
        return chattingService.getGptContentList2(crid, speaker);
    }

    @PostMapping("/script")
    public List<Map<String, String>> getScript1(@RequestBody Map<String, String> request) {
        String crid = request.get("crid");

        System.out.println("(script) crid: " + crid);

        List<Map<String, String>> originalList = chattingService.getScript(crid);

        return convertTimestampsToString(originalList);
    }

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

    @PostMapping("/script2")
    public List<Map<String, String>> getScript2(@RequestBody Map<String, String> request) {
        String crid = request.get("crid");

        System.out.println("(script) crid: " + crid);

        chattingService.getScript2(crid);

        return chattingService.getScript2(crid);
    }

    @PostMapping("/deleteRoom")
    public int deleteRoom(@RequestBody Map<String, String> request) {
        String crid = request.get("crid");

        System.out.println("(deleteRoom) crid: " + crid);

        chattingService.deleteResult(crid);

        return chattingService.deleteResult(crid);
    }

//    @PostMapping("/scriptDto")
//    public TalkingRoomDto getContentListDto(@RequestBody Map<String, String> request) {
//        String crid = request.get("crid");
//
//        System.out.println("(script) crid: " + crid);
//
//        TalkingRoomDto talkingRoomDto = chattingService.getScriptDto(crid);
//        String regDate = String.valueOf(talkingRoomDto.getRegdate());
//
//        talkingRoomDto.setRegdateS(regDate);
//
//        return talkingRoomDto;
//    }
}
