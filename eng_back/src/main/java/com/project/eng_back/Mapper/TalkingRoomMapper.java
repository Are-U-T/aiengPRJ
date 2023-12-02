package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.TalkingRoomDto;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface TalkingRoomMapper {

    @Insert("INSERT INTO CHAT_ROOM (CRID, UNUM, SITUATION, LV, GPTROlE, USERROlE, COUNTRY) values (#{crid, jdbcType=VARCHAR}, #{unum, jdbcType=VARCHAR}, #{situation, jdbcType=VARCHAR}, #{lv, jdbcType=VARCHAR}, #{GPTRole, jdbcType=VARCHAR}, #{userRole, jdbcType=VARCHAR} , #{country, jdbcType=VARCHAR})")
    int insert(TalkingRoomDto talkingRoomDto);

    @Select("SELECT CRID, SITUATION, REGDATE, LV, GPTROLE, USERROLE, COUNTRY FROM CHAT_ROOM WHERE UNUM = #{unum} ")
    List<Map<String, String>> getChattingList(@Param("unum") String unum);
}