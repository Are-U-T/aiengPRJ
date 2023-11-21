package com.project.eng_back.Service;

import com.project.eng_back.Dto.TalkingRoomDto;

import java.util.*;

public interface TalkingRoomService {

    public void createTalkingRoom(String crid, String role, String situation);

    public int insert(TalkingRoomDto talkingRoomDto);
}