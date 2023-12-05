package com.project.eng_back.Controller;

import com.project.eng_back.Dto.VocaDto;
import com.project.eng_back.Service.VocaServiceImp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/voca")
public class VocaController {

    public Logger logger = LoggerFactory.getLogger(VocaController.class);

    @Autowired
    private VocaServiceImp vocaService;

    @PostMapping("/insert")
    public int save(@RequestBody VocaDto vocaDto) {
        return vocaService.save(vocaDto);
    }

    @PostMapping("/delete")
    public int delete(@RequestBody Map<String, String> request) {
        String word = request.get("word");
        String unum = request.get("userNum");

        return vocaService.delete(word, unum);
    }

    @PostMapping("/getWord")
    public List<Map<String, String>> getWord(@RequestBody Map<String, String> request) {
        String crid = request.get("crid");

        logger.info("***** *****");
        logger.info("(getWord) crid: {}", crid);

        return vocaService.getWord(crid);
    }

    @PostMapping("/list")
    public List<Map<String, String>> getVocaList(@RequestBody Map<String, String> request) {
        String unum = request.get("userNum");
        logger.info("(getWord) unum: {}", unum);

        return vocaService.getVocaList(unum);
    }
}