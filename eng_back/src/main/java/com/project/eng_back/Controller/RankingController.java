package com.project.eng_back.Controller;

import com.project.eng_back.Dto.UserScoreDTO;
import com.project.eng_back.Service.RankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/ranking")
public class RankingController {

    @Autowired
    RankingService rankingService;

    @PostMapping("/insert")
    public void insertUserScore(@RequestBody UserScoreDTO userScoreDTO) {
        rankingService.insertUserScore(userScoreDTO);
    }

    @GetMapping("/monthly-rank")
    public List<UserScoreDTO> getMonthlyRank() {
        return rankingService.getUserScoresWithRank();
    }

    @GetMapping("/all-rank")
    public List<UserScoreDTO> getAllRank() {
        return rankingService.getUserScoresWithRankT();
    }

    @GetMapping("/day-rank")
    public List<UserScoreDTO> getDaylyRank() {
        return rankingService.getUserScoresWithRankD();
    }
}