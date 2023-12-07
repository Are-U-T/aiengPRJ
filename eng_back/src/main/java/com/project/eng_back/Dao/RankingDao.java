package com.project.eng_back.Dao;

import com.project.eng_back.Dto.UserDTO;
import com.project.eng_back.Dto.UserScoreDTO;

import java.util.List;
import java.util.Map;

public interface RankingDao {
    void insertUserScore(UserScoreDTO userScoreDTO);
    List<UserScoreDTO> getUserScoresWithRank();
    List<UserScoreDTO> getUserScoresWithRankT();
    List<UserScoreDTO> getUserScoresWithRankD();

    List<UserScoreDTO> getFriendsRankD(String userId);
    List<UserScoreDTO> getFriendsRankM(String userId);
    List<UserScoreDTO> getFriendsRankT(String userId);

    int areFriends(String user1Id, String user2Id);
    void addFriendship(String user1Id, String user2Id);
    void deleteFriendship(String user1Id, String user2Id);
    UserDTO searchFriend(String friend);

    List<Map<String, String>> friendList(String unum);
}