package com.project.eng_back.Service;

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
}
