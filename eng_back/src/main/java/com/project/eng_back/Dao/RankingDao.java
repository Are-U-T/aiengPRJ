package com.project.eng_back.Dao;

import com.project.eng_back.Dto.UserScoreDTO;

import java.util.List;

public interface RankingDao {
    void insertUserScore(UserScoreDTO userScoreDTO);
    List<UserScoreDTO> getUserScoresWithRank();
    List<UserScoreDTO> getUserScoresWithRankT();
    List<UserScoreDTO> getUserScoresWithRankD();

}