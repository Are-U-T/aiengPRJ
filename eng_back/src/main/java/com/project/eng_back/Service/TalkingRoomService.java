package com.project.eng_back.Service;

public interface TalkingRoomService {

    public List<TalkingRoomDto> findAll();

    public int insert(TalkingRoomDto talkingRoomDto);
}
