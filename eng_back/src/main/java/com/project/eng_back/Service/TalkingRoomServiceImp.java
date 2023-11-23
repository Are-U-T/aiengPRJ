package com.project.eng_back.Service;

import com.project.eng_back.Dao.TalkingRoomDao;
import com.project.eng_back.Dto.TalkingRoomDto;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class TalkingRoomServiceImp implements TalkingRoomService {

    @Autowired
    private TalkingRoomDao talkingRoomDao;

    @Override
    public int insert(TalkingRoomDto talkingRoomDto) {
        return talkingRoomDao.insert(talkingRoomDto);
    }
}