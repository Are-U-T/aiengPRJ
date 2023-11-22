package com.project.eng_back.Dao;

import com.project.eng_back.Controller.TalkingRoomController;
import com.project.eng_back.Dto.TalkingRoomDto;
import com.project.eng_back.Mapper.TalkingRoomMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpSession;

@Repository
public class TalkingRoomDaoImp implements TalkingRoomDao {

    @Autowired
    private TalkingRoomMapper talkingRoomMapper;

    @Autowired
    private HttpSession session;


    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    @Override
    public int insert(TalkingRoomDto talkingRoomDto) {
        return talkingRoomMapper.insert(talkingRoomDto);
    }
}