package com.project.eng_back.Service;

import com.project.eng_back.Dto.VocaDto;

import java.util.List;
import java.util.Map;

public interface VocaService {

    int save(VocaDto vocaDto);

    List<Map<String, String>> getWord(String crid);

    List<Map<String, String>> getVocaList(String crid);

    int delete(String word,String unum);
}
