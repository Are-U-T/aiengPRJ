package com.project.eng_back.Service;

import com.project.eng_back.Dto.UserDTO;
import com.project.eng_back.Dto.UserScoreDTO;

import java.util.List;
import java.util.Map;

public interface RankingService {

    void insertUserScore(UserScoreDTO userScoreDTO);
    List<UserScoreDTO> getUserScoresWithRank();

    List<UserScoreDTO> getUserScoresWithRankT();

    List<UserScoreDTO> getUserScoresWithRankD();

    int areFriends(String user1Id, String user2Id);

    void addFriendship(String user1Id, String user2Id);

    void deleteFriendship(String user1Id, String user2Id);

    UserDTO searchFriend(String friend);

    List<Map<String, String>> friendList(String unum);

}