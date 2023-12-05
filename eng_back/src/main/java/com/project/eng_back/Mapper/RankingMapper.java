package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.UserScoreDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface RankingMapper {

    @Insert("INSERT INTO USER_SCORES (USER_NUM, SCORE) VALUES (#{user_num}, #{score})")
    void insertUserScore(UserScoreDTO userScoreDTO);

    @Select("SELECT " +
            "  UT.NUM AS USER_NUM, " +
            "  UT.NAME AS USER_NAME, " +
            "  SUM(US.SCORE) AS TOTAL_SCORE, " +
            "  RANK() OVER (ORDER BY SUM(US.SCORE) DESC) AS RANK " +
            "FROM " +
            "  \"LASTTEAM\".\"USER_SCORES\" US " +
            "JOIN " +
            "  \"LASTTEAM\".\"USER_T\" UT ON US.USER_NUM = UT.NUM " +
            "WHERE " +
            "  EXTRACT(MONTH FROM US.SCORE_DATE) = EXTRACT(MONTH FROM SYSDATE) " +
            "GROUP BY " +
            "  UT.NUM, UT.NAME")
    List<UserScoreDTO> getMonthlyTopTotalScores();

    @Select("SELECT " +
            "  UT.NUM AS USER_NUM, " +
            "  UT.NAME AS USER_NAME, " +
            "  SUM(US.SCORE) AS TOTAL_SCORE, " +
            "  RANK() OVER (ORDER BY SUM(US.SCORE) DESC) AS RANK " +
            "FROM " +
            "  \"LASTTEAM\".\"USER_SCORES\" US " +
            "JOIN " +
            "  \"LASTTEAM\".\"USER_T\" UT ON US.USER_NUM = UT.NUM " +
            "GROUP BY " +
            "  UT.NUM, UT.NAME")
    List<UserScoreDTO> getTotalScoresAndRanks();


    @Select("SELECT " +
            "  UT.NUM AS USER_NUM, " +
            "  UT.NAME AS USER_NAME, " +
            "  SUM(US.SCORE) AS TOTAL_SCORE, " +
            "  RANK() OVER (ORDER BY SUM(US.SCORE) DESC) AS RANK " +
            "FROM " +
            "  \"LASTTEAM\".\"USER_SCORES\" US " +
            "JOIN " +
            "  \"LASTTEAM\".\"USER_T\" UT ON US.USER_NUM = UT.NUM " +
            "WHERE " +
            "  TRUNC(US.SCORE_DATE) = TRUNC(SYSDATE) " +
            "GROUP BY " +
            "  UT.NUM, UT.NAME")
    List<UserScoreDTO> getDailyScoresAndRanks();
}