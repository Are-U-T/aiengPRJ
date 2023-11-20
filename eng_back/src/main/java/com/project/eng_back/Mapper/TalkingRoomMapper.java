package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.TalkRoomDto;
import org.apache.ibatis.annotations.*;

@Mapper
public interface TalkingRoomMapper {

    @Select("SELECT * FROM CHAT_ROOM")
    public List<TalkingRoomDto> findAll();

    @Insert("insert into USER_T (crid, unum, regdate, subject, lv, time, score) values (#{crid}, #{unum},#{regdate},#{subject},#{lv}, #{time}, #{score})")
    public int insert(TalkRoomDto talkRoomDto);
}