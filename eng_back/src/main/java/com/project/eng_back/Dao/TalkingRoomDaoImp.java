package com.project.eng_back.Dao;

import com.project.eng_back.Dto.TalkingRoomDto;
import com.project.eng_back.Mapper.TalkingRoomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class TalkingRoomDaoImp implements TalkingRoomDao {

    @Autowired
    private TalkingRoomMapper talkingRoomMapper;

//    @Override
//    public List<TalkingRoomDto> findAll() {
//        return talkingRoomMapper.findAll();
//    }

//    @Override
//    public void insert(TalkingRoomDto talkingRoomDto) {
//        talkingRoomMapper.insert(talkingRoomDto);
//    }

    public void createTalkingRoom(String crid) {

    }

    @Override
    public int insert(TalkingRoomDto talkingRoomDto) {
        return talkingRoomMapper.insert(talkingRoomDto);
    }
}
