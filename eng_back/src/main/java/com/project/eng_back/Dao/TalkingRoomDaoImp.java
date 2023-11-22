package com.project.eng_back.Dao;

import com.project.eng_back.Controller.TalkingRoomController;
import com.project.eng_back.Dto.TalkingRoomDto;
import com.project.eng_back.Mapper.TalkingRoomMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@Repository
public class TalkingRoomDaoImp implements TalkingRoomDao {

    @Autowired
    private TalkingRoomMapper talkingRoomMapper;

    @Autowired
    private HttpSession session;


    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);
@Override
    public void createTalkingRoom(TalkingRoomDto talkingRoomDto) {
        logger.info("8");
        talkingRoomDto = new TalkingRoomDto();
        logger.info("9");
        talkingRoomMapper.insert(talkingRoomDto);
//        logger.info("insert 데이터: {} {} {} {}", crid + "\t", GPTRole + "\t", userRole + "\t", situation);
        logger.info("10");
    }


    @Override
    public int insert(TalkingRoomDto talkingRoomDto) {
        return talkingRoomMapper.insert(talkingRoomDto);
    }
}