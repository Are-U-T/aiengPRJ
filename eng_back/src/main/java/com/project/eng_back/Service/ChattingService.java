package com.project.eng_back.Service;

import com.project.eng_back.Dto.Choice;
import com.project.eng_back.Dto.TalkingRoomDto;
import com.project.eng_back.Mapper.ChatGPTMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ChattingService {

    private final ChatGPTMapper chatGPTMapper;

    public ChattingService(ChatGPTMapper chatGPTMapper) {
        this.chatGPTMapper = chatGPTMapper;
    }

    public List<Map<String, String>> getGptContentList(String crid) {
        return chatGPTMapper.getGptContentList(crid);
    }

    public List<Map<String, String>> getGptContentList2(String crid, String speaker) {
        return chatGPTMapper.getGptContentList2(crid, speaker);
    }

    public List<Map<String, String>> getScript(String crid) {
        return chatGPTMapper.getScript(crid);
    }

//    public TalkingRoomDto getScriptDto(String crid) {
//        return chatGPTMapper.getScriptDto(crid);
//    }

    public List<Map<String, String>> getScript2(String crid) {
        return chatGPTMapper.getScript2(crid);
    }
}