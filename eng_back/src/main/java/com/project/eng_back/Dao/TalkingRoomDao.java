package com.project.eng_back.Dao;

import com.project.eng_back.Dto.TalkingRoomDto;

public interface TalkingRoomDao {

    public void createTalkingRoom(TalkingRoomDto talkingRoomDto);

    int insert(TalkingRoomDto talkingRoomDto);

}