package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.TalkingRoomDto;
import org.apache.ibatis.annotations.*;

@Mapper
public interface TalkingRoomMapper {

    @Insert("INSERT INTO CHAT_ROOM2 (CRID, GPTROlE, USERROlE, SITUATION, COUNTRY, LV) values (#{crid, jdbcType=VARCHAR}, #{GPTRole, jdbcType=VARCHAR}, #{userRole, jdbcType=VARCHAR}, #{situation, jdbcType=VARCHAR}, #{country, jdbcType=VARCHAR}, #{lv})")
    int insert(TalkingRoomDto talkingRoomDto);

//    @Insert("INSERT INTO CHAT_ROOM (CRID, UNUM, GPTROlE, USERROlE, SITUATION, COUNTRY) values (#{crid, jdbcType=VARCHAR}, #{unum}, #{GPTRole, jdbcType=VARCHAR}, #{userRole, jdbcType=VARCHAR}, #{situation, jdbcType=VARCHAR}, #{country, jdbcType=VARCHAR})")
//    int insert(TalkingRoomDto talkingRoomDto);
}