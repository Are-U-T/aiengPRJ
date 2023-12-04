package com.project.eng_back.Service;

import com.project.eng_back.Dto.VocaDto;
import com.project.eng_back.Mapper.VocaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VocaServiceImp implements VocaService {

    @Autowired
    private VocaMapper vocaMapper;

    @Override
    public int save(VocaDto vocaDto) { return vocaMapper.save(vocaDto); }
}