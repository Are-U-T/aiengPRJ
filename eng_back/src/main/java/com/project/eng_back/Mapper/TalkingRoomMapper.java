package com.project.eng_back.Mapper;

import java.util.*;
import com.project.eng_back.Dto.TalkingRoomDto;
import org.apache.ibatis.annotations.*;

@Mapper
public interface TalkingRoomMapper {

    @Select("SELECT * FROM CHAT_ROOM")
    public List<TalkingRoomDto> findAll();

    @Insert("insert into CHAT2 (crid) values (#{crid})")
    public int insert(TalkingRoomDto talkingRoomDto);
}