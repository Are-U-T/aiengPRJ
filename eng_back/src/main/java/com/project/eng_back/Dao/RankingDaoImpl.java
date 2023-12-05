package com.project.eng_back.Dao;

import com.project.eng_back.Dto.UserDTO;
import com.project.eng_back.Dto.UserScoreDTO;
import com.project.eng_back.Mapper.RankingMapper;
import com.project.eng_back.Mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RankingDaoImpl implements RankingDao{

    @Autowired
    RankingMapper rankingMapper;
    @Override
    public void insertUserScore(UserScoreDTO userScoreDTO) {
        rankingMapper.insertUserScore(userScoreDTO);
    }

    @Override
    public List<UserScoreDTO> getUserScoresWithRank() {
        return rankingMapper.getMonthlyTopTotalScores();
    }

    @Override
    public List<UserScoreDTO> getUserScoresWithRankT() {
        return rankingMapper.getTotalScoresAndRanks();
    }

    @Override
    public List<UserScoreDTO> getUserScoresWithRankD() {
        return rankingMapper.getDailyScoresAndRanks();
    }

    @Override
    public int areFriends(String user1Id, String user2Id) {
        return rankingMapper.areFriends(user1Id, user2Id);
    }

    @Override
    public void addFriendship(String user1Id, String user2Id) {
        rankingMapper.addFriendship(user1Id,user2Id);
    }

    @Override
    public void deleteFriendship(String user1Id, String user2Id) {
        rankingMapper.deleteFriendship(user1Id, user2Id);
    }

    @Override
    public UserDTO searchFriend(String friend) {
        return rankingMapper.searchFriend(friend);
    }

    @Override
    public List<Map<String, String>> friendList(String unum) { return rankingMapper.friendList(unum); }
}