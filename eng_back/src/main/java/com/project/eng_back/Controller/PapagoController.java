package com.project.eng_back.Controller;

import com.project.eng_back.Service.NaverPapagoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "httpL//localhost:3000")
@RestController
@RequestMapping("/api")
public class PapagoController {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    @Autowired
    NaverPapagoService naverPapagoService;

    @PostMapping("/papago")
    public String papagoAPI(@RequestBody Map<String, String> request) {

        String search = request.get("search");
        String sourceLang = request.get("sourceLang");
        String targetLang = request.get("targetLang");

        logger.info("***** *****");
        logger.info("papago 사용 전 text: {}", search);
        logger.info("(getWord) sourceLang: {}", sourceLang);
        logger.info("(getWord) targetLang: {}", targetLang);

        logger.info("***** *****");
        logger.info("papago 사용 후 response: {}", naverPapagoService.getTransSentence(search, sourceLang, targetLang));

        return naverPapagoService.getTransSentence(search, sourceLang, targetLang);
    }
}