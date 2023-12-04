package com.project.eng_back.Service;

import com.project.eng_back.Dto.VocaDto;
import com.project.eng_back.Mapper.VocaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class VocaServiceImp implements VocaService {

    @Autowired
    private VocaMapper vocaMapper;

    @Override
    public int save(VocaDto vocaDto) {
        return vocaMapper.save(vocaDto);
    }

    @Override
    public int delete(String word, String unum) {
        return vocaMapper.delete(word, unum);
    }

    @Override
    public List<Map<String, String>> getWord(String crid) {
        return vocaMapper.getWord(crid);
    }

    @Override
    public List<Map<String, String>> getVocaList(String unum) {
        return vocaMapper.getVocaList(unum);
    }
}