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

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    public void createTalkingRoom(String crid) {
//        talkingRoomMapper.insert(crid);
        logger.info("createTalkingRoom(): {}", crid);

        TalkingRoomDto talkingRoomDto = new TalkingRoomDto();
        talkingRoomDto.setCrid(crid);

        talkingRoomMapper.insert(talkingRoomDto);
    }

    @Override
    public int insert(TalkingRoomDto talkingRoomDto) {
        return talkingRoomMapper.insert(talkingRoomDto);
    }
}
