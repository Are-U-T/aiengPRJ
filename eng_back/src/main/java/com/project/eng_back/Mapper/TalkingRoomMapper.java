package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.TalkingRoomDto;
import org.apache.ibatis.annotations.*;

@Mapper
public interface TalkingRoomMapper {

    @Insert("insert into CHAT_ROOM2 (crid, role, situation) values (#{crid}, #{role}, #{situation})")
    public int insert(TalkingRoomDto talkingRoomDto);
}