package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.VocaDto;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface VocaMapper {

    @Insert("INSERT INTO VOCA (CRID, UNUM, WORD, RESULTWORD) " +
            "SELECT #{crid}, #{unum}, #{word}, #{resultWord} " +
            "FROM dual " +
            "WHERE NOT EXISTS (" +
            "    SELECT 1 " +
            "    FROM VOCA " +
            "    WHERE CRID = #{crid} AND UNUM = #{unum} AND RESULTWORD = #{resultWord}" +
            ")")
    int save(VocaDto vocaDto);

    @Delete("DELETE FROM VOCA WHERE RESULTWORD = #{word} AND UNUM = #{unum}")
    int delete(@Param("word") String word, @Param("unum") String unum);

    @Select("SELECT RESULTWORD FROM VOCA WHERE CRID = #{crid}")
    List<Map<String, String>> getWord(@Param("crid") String crid);

    @Select("SELECT WORD, RESULTWORD FROM VOCA WHERE UNUM = #{unum}")
    List<Map<String, String>> getVocaList(@Param("unum") String unum);

    @Select("SELECT WORD, RESULTWORD FROM (SELECT * FROM VOCA ORDER BY DBMS_RANDOM.RANDOM) WHERE UNUM = #{unum} AND ROWNUM <= 30")
    List<Map<String, String>> vocaTest(@Param("unum") String unum);
}