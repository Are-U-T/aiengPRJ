package com.project.eng_back.Dao;

import com.project.eng_back.Dto.UserScoreDTO;
import com.project.eng_back.Mapper.RankingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

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
}