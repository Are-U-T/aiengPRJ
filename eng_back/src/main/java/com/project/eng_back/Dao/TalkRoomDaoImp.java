package com.project.eng_back.Dao;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class TalkRoomDaoImp {

    @Autowired
    TalkingRoomMapper talkingRoomMapper;

    @Override
    public List<TalkingRoomDto> findAll() {
        return talkingRoomMapper.findAll();
    }

    @Override
    public int save(TalkingRoomDto talkingRoomDto) {
        return talkingRoomMapper.insert(TalkingRoomDto);
    }
}
