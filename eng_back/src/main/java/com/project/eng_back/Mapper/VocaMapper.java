package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.VocaDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VocaMapper {

    @Insert("insert into VOCA (CRID, UNUM, WORD) values (#{crid}, #{unum},#{word})")
    int save(VocaDto vocaDto);
}