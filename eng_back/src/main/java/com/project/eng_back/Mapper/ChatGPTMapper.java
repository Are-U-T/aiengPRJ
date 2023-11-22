package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.Choice;
import com.project.eng_back.Dto.QuestionRequestDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface ChatGPTMapper {

    @Insert("INSERT INTO CHAT_TEST (CRID, SEQUENCE, CONTENT, SPEAKER) VALUES (#{crid}, chat_sequence.NEXTVAL, #{text}, 0)")
    @Options(useGeneratedKeys = true, keyProperty = "sequence", keyColumn = "SEQUENCE")
    int save(Choice choice);

    @Insert("INSERT INTO CHAT_TEST (CRID, SEQUENCE, CONTENT, SPEAKER) VALUES (#{crid}, chat_sequence.NEXTVAL, #{question}, 1)")
    @Options(useGeneratedKeys = true, keyProperty = "sequence", keyColumn = "SEQUENCE")
    int save2(QuestionRequestDto question);

    @Select("SELECT CONTENT FROM CHAT_TEST WHERE SPEAKER = 0")
    public String getGptContent();
}