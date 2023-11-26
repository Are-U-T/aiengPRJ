package com.project.eng_back.Controller;

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
//        System.out.println("cird : " + crid);
        return chattingService.getGptContentList(crid);
    }
}
