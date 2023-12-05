package com.project.eng_back.Controller;

import com.project.eng_back.Dto.UserDTO;
import com.project.eng_back.Dto.UserScoreDTO;
import com.project.eng_back.Service.RankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/search-friend")
    public UserDTO searchFriend(@RequestParam String email) {
        return rankingService.searchFriend(email);
    }

    @PostMapping("/friend-add")
    public ResponseEntity<String> addFriendship(
            @RequestParam String user1Id,
            @RequestParam String user2Id
    ) {
        if (rankingService.areFriends(user1Id, user2Id)>0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Users are already friends");
        }else {
            rankingService.addFriendship(user1Id, user2Id);
            return ResponseEntity.ok("Friendship request sent successfully");}
    }

    @DeleteMapping("/friend-delete")
    public ResponseEntity<String> deleteFriendship(
            @RequestParam String user1Id,
            @RequestParam String user2Id
    ) {
        rankingService.deleteFriendship(user1Id, user2Id);
        return ResponseEntity.ok("Friendship deleted successfully");
    }

    @PostMapping("/friend-list")
    public List<Map<String, String>> friendList(@RequestBody Map<String, String> request) {
        String userNum = request.get("userNum");
        return rankingService.friendList(userNum);
    }
}