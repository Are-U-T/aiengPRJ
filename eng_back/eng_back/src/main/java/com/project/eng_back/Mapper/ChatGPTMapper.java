package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.Choice;
import com.project.eng_back.Dto.QuestionRequestDto;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChatGPTMapper {

    @Insert("INSERT INTO CHAT (CRID, UNUM, CONTENT, SPEAKER) VALUES (#{crid, jdbcType=VARCHAR}, #{uid, jdbcType=VARCHAR}, #{text, jdbcType=VARCHAR},  #{speaker, jdbcType=VARCHAR})")
    int save(Choice choice);

    @Insert("INSERT INTO CHAT ( CRID, UNUM, CONTENT, SPEAKER) VALUES (#{crid, jdbcType=VARCHAR}, #{unum, jdbcType=VARCHAR}, #{question, jdbcType=VARCHAR},  #{speaker, jdbcType=VARCHAR})")
    int save2(QuestionRequestDto question);

    @Select("SELECT CONTENT, SPEAKER FROM CHAT WHERE CRID = #{crid} AND CRID IN (SELECT CRID FROM CHAT_ROOM WHERE CRID = #{crid} AND SPEAKER IN ('Teacher', 'User'))")
    List<Map<String, String>> getGptContentList(@Param("crid") String crid);

    @Select("SELECT CONTENT, SPEAKER FROM CHAT WHERE CRID = #{crid} AND CRID IN (SELECT CRID FROM CHAT_ROOM WHERE CRID = #{crid} AND SPEAKER IN (#{speaker}))")
    List<Map<String, String>> getGptContentList2(@Param("crid") String crid, @Param("speaker") String speaker);

    @Select("SELECT GPTROLE, USERROLE, SITUATION FROM CHAT_ROOM WHERE CRID = #{crid}")
    QuestionRequestDto getGptContentList3(@Param("crid") String crid);

}