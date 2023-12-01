package com.project.eng_back.Service;

import com.project.eng_back.Dao.TalkingRoomDao;
import com.project.eng_back.Dto.TalkingRoomDto;
import com.project.eng_back.Mapper.TalkingRoomMapper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

@Service
public class TalkingRoomServiceImp implements TalkingRoomService {

    @Autowired
    private TalkingRoomDao talkingRoomDao;

    @Autowired
    private TalkingRoomMapper talkingRoomMapper;

    @Override
    public int insert(TalkingRoomDto talkingRoomDto) {
        return talkingRoomDao.insert(talkingRoomDto);
    }

    @Override
    public List<Map<String, String>> getGptContentList(String unum){
        return talkingRoomMapper.getChattingList(unum);
    }
}