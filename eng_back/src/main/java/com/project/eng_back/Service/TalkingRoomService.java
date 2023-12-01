package com.project.eng_back.Service;

import com.project.eng_back.Dto.TalkingRoomDto;
import com.project.eng_back.Mapper.TalkingRoomMapper;

import java.util.List;
import java.util.Map;

public interface TalkingRoomService {

    int insert(TalkingRoomDto talkingRoomDto);

    List<Map<String, String>> getGptContentList(String unum);
}