package com.project.eng_back.Service;

import com.project.eng_back.Dao.RankingDao;
import com.project.eng_back.Dto.UserDTO;
import com.project.eng_back.Dto.UserScoreDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RankingServiceImpl implements RankingService{

    @Autowired
    RankingDao rankingDao;
    @Override
    public void insertUserScore(UserScoreDTO userScoreDTO) {
        rankingDao.insertUserScore(userScoreDTO);
    }

    @Override
    public List<UserScoreDTO> getUserScoresWithRank() {
        return rankingDao.getUserScoresWithRank();
    }

    @Override
    public List<UserScoreDTO> getUserScoresWithRankT() {
        return rankingDao.getUserScoresWithRankT();
    }
    @Override
    public List<UserScoreDTO> getUserScoresWithRankD() {
        return rankingDao.getUserScoresWithRankD();
    }

    @Override
    public List<UserScoreDTO> getFriendsRankD(String userId) {
        return rankingDao.getFriendsRankD(userId);
    }
    @Override
    public List<UserScoreDTO> getFriendsRankM(String userId) {
        return rankingDao.getFriendsRankM(userId);
    }
    @Override
    public List<UserScoreDTO> getFriendsRankT(String userId) {
        return rankingDao.getFriendsRankT(userId);
    }

    public int areFriends(String user1Id, String user2Id) {
        return rankingDao.areFriends(user1Id, user2Id);
    }

    @Override
    public void addFriendship(String user1Id, String user2Id) {
        rankingDao.addFriendship(user1Id, user2Id);
    }
    @Override
    public void deleteFriendship(String user1Id, String user2Id) {
        rankingDao.deleteFriendship(user1Id, user2Id);
    }

    @Override
    public UserDTO searchFriend(String friend) { return rankingDao.searchFriend(friend); }

    @Override
    public List<Map<String, String>> friendList(String unum) { return rankingDao.friendList(unum); }
}