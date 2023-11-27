package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.Choice;
import com.project.eng_back.Dto.QuestionRequestDto;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChatGPTMapper {

    @Insert("INSERT INTO CHAT_TEST (CRID, CONTENT, SPEAKER) VALUES (#{crid, jdbcType=VARCHAR}, #{text, jdbcType=VARCHAR},  #{speaker, jdbcType=VARCHAR})")
    int save(Choice choice);

    @Insert("INSERT INTO CHAT_TEST ( CRID, CONTENT, SPEAKER) VALUES (#{crid, jdbcType=VARCHAR}, #{question, jdbcType=VARCHAR},  #{speaker, jdbcType=VARCHAR})")
    int save2(QuestionRequestDto question);

    @Select("SELECT CONTENT FROM CHAT_TEST WHERE SPEAKER = 0")
    public String getGptContent();

    @Select("SELECT CONTENT, SPEAKER FROM CHAT_TEST WHERE CRID = #{crid} AND CRID IN (SELECT CRID FROM CHAT_ROOM2 WHERE CRID = #{crid})")
    List<Map<String, String>> getGptContentList(@Param("crid") String crid);
}