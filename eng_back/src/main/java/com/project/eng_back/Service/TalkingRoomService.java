package com.project.eng_back.Service;

import com.project.eng_back.Dto.TalkingRoomDto;

import java.util.*;

public interface TalkingRoomService {

//    public List<TalkingRoomDto> findAll();

    public int insert(TalkingRoomDto talkingRoomDto);

    public void createTalkingRoom(String crid);
}