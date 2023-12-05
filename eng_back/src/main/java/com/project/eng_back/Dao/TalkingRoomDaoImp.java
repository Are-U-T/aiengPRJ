package com.project.eng_back.Dao;

import com.project.eng_back.Dto.TalkingRoomDto;
import com.project.eng_back.Mapper.TalkingRoomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TalkingRoomDaoImp implements TalkingRoomDao {

    @Autowired
    private TalkingRoomMapper talkingRoomMapper;

    @Override
    public int insert(TalkingRoomDto talkingRoomDto) {
        return talkingRoomMapper.insert(talkingRoomDto);
    }
}