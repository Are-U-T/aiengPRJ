package com.project.eng_back.Controller;

import com.project.eng_back.Dto.Choice;
import com.project.eng_back.Service.ChattingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
//        System.out.println("speaker: " + speaker);
        return chattingService.getGptContentList2(crid, speaker);
    }
}
