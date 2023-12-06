package com.project.eng_back.Service;

import com.project.eng_back.Dto.VocaDto;

import java.util.List;
import java.util.Map;

public interface VocaService {

    int save(VocaDto vocaDto);

    int delete(String word,String unum);

    List<Map<String, String>> getWord(String crid);

    List<Map<String, String>> getVocaList(String crid);

    List<Map<String, String>> vocaTest(String unum);
}