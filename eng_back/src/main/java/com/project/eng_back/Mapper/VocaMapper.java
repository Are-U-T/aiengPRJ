package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.VocaDto;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface VocaMapper {

    @Insert("insert into VOCA (CRID, UNUM, WORD, RESULTWORD) values (#{crid}, #{unum},#{word}, #{resultWord})")
    int save(VocaDto vocaDto);

    @Select("SELECT RESULTWORD FROM VOCA WHERE CRID = #{crid}")
    List<Map<String, String>> getWord(@Param("crid") String crid);

    @Select("SELECT WORD, RESULTWORD FROM VOCA WHERE UNUM = #{unum}")
    List<Map<String, String>> getVocaList(@Param("unum") String unum);

    @Delete("DELETE FROM VOCA WHERE RESULTWORD = #{word} AND UNUM = #{unum}")
    int delete(@Param("word") String word, @Param("unum") String unum);
}
