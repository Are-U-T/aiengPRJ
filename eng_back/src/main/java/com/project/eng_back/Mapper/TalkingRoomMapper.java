package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.TalkingRoomDto;
import org.apache.ibatis.annotations.*;

@Mapper
public interface TalkingRoomMapper {

    @Insert("INSERT INTO CHAT_ROOM2 (CRID, GPTROlE, userROlE, SITUATION) values (#{crid, jdbcType=VARCHAR}, #{GPTRole, jdbcType=VARCHAR}, #{userRole, jdbcType=VARCHAR}, #{situation, jdbcType=VARCHAR})")
    int insert(TalkingRoomDto talkingRoomDto);
}