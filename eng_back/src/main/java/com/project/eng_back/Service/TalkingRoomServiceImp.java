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

    public String getSessionValue(String key) {
        return (String) session.getAttribute(key);
    }
}