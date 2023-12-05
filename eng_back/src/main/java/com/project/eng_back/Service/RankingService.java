package com.project.eng_back.Service;

import com.project.eng_back.Dto.UserScoreDTO;

import java.util.List;

public interface RankingService {

    void insertUserScore(UserScoreDTO userScoreDTO);
    List<UserScoreDTO> getUserScoresWithRank();

    List<UserScoreDTO> getUserScoresWithRankT();

    List<UserScoreDTO> getUserScoresWithRankD();
}