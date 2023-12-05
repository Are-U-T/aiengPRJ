package com.project.eng_back.Service;

import com.project.eng_back.Dao.RankingDao;
import com.project.eng_back.Dto.UserScoreDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}