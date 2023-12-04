package com.project.eng_back.Controller;

import com.project.eng_back.Dto.VocaDto;
import com.project.eng_back.Service.NaverPapagoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "httpL//localhost:3000")
@RestController
@RequestMapping("/api")
public class PapagoController {

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    private VocaController vocaController;

    @Autowired
    NaverPapagoService naverPapagoService;

    @PostMapping("/papago")
    public String papagoAPI(@RequestBody String search) {

        logger.info("***** *****");
        logger.info("papago 사용 전 text: {}", search);

        naverPapagoService.getTransSentence(search);
        logger.info("***** *****");
        logger.info("papago: {}", naverPapagoService.getTransSentence(search));

        return naverPapagoService.getTransSentence(search);
    }
}