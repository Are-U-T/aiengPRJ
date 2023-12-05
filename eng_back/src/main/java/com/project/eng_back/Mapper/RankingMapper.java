package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.UserDTO;
import com.project.eng_back.Dto.UserScoreDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface RankingMapper {

    @Insert("INSERT INTO USER_SCORES (USER_NUM, SCORE) VALUES (#{user_num}, #{score})")
    void insertUserScore(UserScoreDTO userScoreDTO);

    @Select("SELECT " +
            "  USER_NUM, " +
            "  USER_NAME, " +
            "  TOTAL_SCORE, " +
            "  RANK " +
            "FROM (SELECT " +
            "        UT.NUM AS USER_NUM, " +
            "        UT.NAME AS USER_NAME, " +
            "        SUM(US.SCORE) AS TOTAL_SCORE, " +
            "        RANK() OVER (ORDER BY SUM(US.SCORE) DESC) AS RANK " +
            "      FROM " +
            "        \"LASTTEAM\".\"USER_SCORES\" US " +
            "      JOIN " +
            "        \"LASTTEAM\".\"USER_T\" UT ON US.USER_NUM = UT.NUM " +
            "      WHERE " +
            "        EXTRACT(MONTH FROM US.SCORE_DATE) = EXTRACT(MONTH FROM SYSDATE) " +
            "      GROUP BY " +
            "        UT.NUM, UT.NAME " +
            "      ORDER BY " +
            "        TOTAL_SCORE DESC) " +
            "WHERE ROWNUM <= 20")
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

    @Select("SELECT COUNT(*)" +
            "FROM Friendships " +
            "WHERE (USERID1 = #{user1Id} AND USERID2 = #{user2Id})")
    int areFriends(@Param("user1Id") String user1Id, @Param("user2Id") String user2Id);


    @Insert("INSERT INTO Friendships (USERID1, USERID2, FRIENDSHIP_DATE) " +
            "VALUES (#{user1Id}, #{user2Id}, CURRENT_TIMESTAMP)")
    void addFriendship(@Param("user1Id") String user1Id, @Param("user2Id") String user2Id);

    @Delete("DELETE FROM Friendships " +
            "WHERE (USERID1 = #{user1Id} AND USERID2 = #{user2Id}) " +
            "   OR (USERID1 = #{user2Id} AND USERID2 = #{user1Id})")
    void deleteFriendship(@Param("user1Id") String user1Id, @Param("user2Id") String user2Id);

    @Select("SELECT NUM, NAME, EMAIL FROM USER_T WHERE EMAIL = #{friend}")
    UserDTO searchFriend(@Param("friend") String friend);

    @Select("SELECT USERID2 FROM FRIENDSHIPS WHERE USERID1 = #{userNum}")
    List<Map<String, String>> friendList(@Param("userNum") String userNum);
}