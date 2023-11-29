package com.project.eng_back.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TalkingRoomDto {

    @JsonProperty("crid")
    private String crid;
    private String unum;
    private LocalDateTime regdate;
//    private String lv;
    private String time;
    private int score;
    @JsonProperty("gptRole")
    private String GPTRole;
    @JsonProperty("userRole")
    private String userRole;
    @JsonProperty("situation")
    private String situation;
    private int country;

    public void setCrid(String crid) {
        this.crid = crid;
    }

//    public void setLv(String lv) {
//        this.lv = lv;
//    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setGPTRole(String GPTRole) {
        this.GPTRole = GPTRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public void setSituation(String situation) {
        this.situation = situation;
    }

    public void setCountry(int country){ this.country = country; }
}