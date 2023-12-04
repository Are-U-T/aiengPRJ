package com.project.eng_back.Controller;

import com.project.eng_back.Dto.VocaDto;
import com.project.eng_back.Service.VocaServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/voca")
public class VocaController {

    @Autowired
    private VocaServiceImp vocaService;

    @PostMapping("/insert")
    public int save(@RequestBody VocaDto vocaDto){return vocaService.save(vocaDto);}
}