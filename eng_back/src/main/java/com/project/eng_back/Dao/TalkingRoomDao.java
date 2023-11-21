package com.project.eng_back.Dao;

import com.project.eng_back.Dto.TalkingRoomDto;

public interface TalkingRoomDao {

    public void createTalkingRoom(String crid, String role, String situation);

    int insert(TalkingRoomDto talkingRoomDto);
}