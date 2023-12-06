package com.project.eng_back.Controller;

import com.project.eng_back.Dto.VocaDto;
import com.project.eng_back.Service.VocaServiceImp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/voca")
public class VocaController {

    public Logger logger = LoggerFactory.getLogger(VocaController.class);

    @Autowired
    private VocaServiceImp vocaService;

    public static String correct[];

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

    @PostMapping("/test")
    public List<Map<String, String>> vocaTest(@RequestBody Map<String, String> request) {

        String unum = request.get("userNum");

        logger.info("***** /voca/test *****");
        logger.info("unum: {}", unum);

        List<Map<String, String>> resultList = vocaService.vocaTest(unum);

        correct = resultList.stream()
                .map(map -> map.get("RESULTWORD"))
                .toArray(String[]::new);

        logger.info("correct: {}", (Object) correct);

        return resultList;
    }

    @PostMapping("/send")
    public ArrayList<Integer> vocaSend(@RequestBody Map<String, Object> request) {
        String unum = (String) request.get("userNum");

        @SuppressWarnings("unchecked")
        List<String> vocaData = (List<String>) request.get("vocaData");

        logger.info("***** /voca/send *****");
        logger.info("unum: {}", unum);
        logger.info("getVoca: {}", vocaData);
        logger.info("correct: {}", (Object) correct);

        List<Boolean> correctList = new ArrayList<>();
        for (int i = 0; i < correct.length; i++) {
            correctList.add(vocaData.get(i).equals(correct[i]));
        }

        Map<Integer, Boolean> result = new HashMap<>();
        for (int i = 0; i < correctList.size(); i++) {
            result.put(i, correctList.get(i));
        }

        logger.info("result: {}", result);

        int correctCount = 0;
        int wrongCount = 0;

        for (Boolean correct : correctList) {
            if (correct) {
                correctCount++;
            } else {
                wrongCount++;
            }
        }

        logger.info("correctCount: {}, wrongCount: {}", correctCount, wrongCount);

        ArrayList<Integer> cnt = new ArrayList();

        cnt.add(correctCount);
        cnt.add(wrongCount);

        logger.info("cnt: {}", cnt);

        return cnt;
    }
}