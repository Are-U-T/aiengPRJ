package com.project.eng_back.Dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class VocaDto {

    private String crid;

    private String unum;

    private String word;

    private String resultWord;

    public void setCrid(String crid) {
        this.crid = crid;
    }

    public void setUnum(String unum) {
        this.unum = unum;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public void setResultWord(String resultWord) {
        this.resultWord = resultWord;
    }
}