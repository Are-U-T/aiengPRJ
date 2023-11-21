package com.project.eng_back.Dao;

import com.project.eng_back.Controller.TalkingRoomController;
import com.project.eng_back.Dto.TalkingRoomDto;
import com.project.eng_back.Mapper.TalkingRoomMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class TalkingRoomDaoImp implements TalkingRoomDao {

    @Autowired
    private TalkingRoomMapper talkingRoomMapper;

    public void createTalkingRoom(String crid, String role, String situation) {
        TalkingRoomDto talkingRoomDto = new TalkingRoomDto();
        talkingRoomDto.setCrid(crid);
        talkingRoomDto.setRole(role);
        talkingRoomDto.setSituation(situation);

        talkingRoomMapper.insert(talkingRoomDto);
    }

    @Override
    public int insert(TalkingRoomDto talkingRoomDto) {
        return talkingRoomMapper.insert(talkingRoomDto);
    }
}