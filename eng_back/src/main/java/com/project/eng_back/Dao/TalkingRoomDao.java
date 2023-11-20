package com.project.eng_back.Dao;

import java.util.*;
import com.project.eng_back.Dto.TalkingRoomDto;

public interface TalkingRoomDao {

    public List<TalkingRoomDto> findAll();

    public int insert(TalkingRoomDto talkingRoomDto);
}