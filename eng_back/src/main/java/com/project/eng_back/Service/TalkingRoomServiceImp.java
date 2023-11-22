package com.project.eng_back.Service;

import com.project.eng_back.Controller.TalkingRoomController;
import com.project.eng_back.Dao.TalkingRoomDao;
import com.project.eng_back.Dto.TalkingRoomDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpSession;

@Service
public class TalkingRoomServiceImp implements TalkingRoomService {

    @Autowired
    private TalkingRoomDao talkingRoomDao;

    @Autowired
    private HttpSession session;

    public Logger logger = LoggerFactory.getLogger(TalkingRoomController.class);

    @Override
    public int insert(TalkingRoomDto talkingRoomDto) {
        return talkingRoomDao.insert(talkingRoomDto);
    }

//    @Override
//    public void createTalkingRoom(String crid, String GPTRole, String userRole, String situation) {
//        logger.info("4");
//        TalkingRoomDto talkingRoomDto = new TalkingRoomDto();
//
//        logger.info("5");
//        String b = (String) session.getAttribute("gptRole");
//        String c = (String) session.getAttribute("userRole");
//        String a = (String) session.getAttribute("crid");
//        String d = (String) session.getAttribute("situation");
//
//        logger.info("***** *****");
//        logger.info("세션에서 가져온 데이터: {} {} {} {}", a + "\t", b + "\t", c + "\t", d);
//        logger.info("***** *****\n");
//
//        talkingRoomDto.setCrid(a);
//        talkingRoomDto.setGPTRole(b);
//        talkingRoomDto.setUserRole(c);
//        talkingRoomDto.setSituation(d);
//        logger.info("6");
//
//        logger.info("***** *****");
//        logger.info("set으로 저장한 데이터: {} {} {} {}", a + "\t", b + "\t", c + "\t", d);
//        logger.info("***** *****\n");
//
////      encodedCrid = "'" + encodedCrid + "'";
//
//        talkingRoomDao.createTalkingRoom(a, b, c, d);
//        logger.info("7");
//    }
    @Override
    public void createTalkingRoom(TalkingRoomDto talkingRoomDto) {
        talkingRoomDao.createTalkingRoom(talkingRoomDto);
    };

    public String getSessionValue(String key) {
        return (String) session.getAttribute(key);
    }
}