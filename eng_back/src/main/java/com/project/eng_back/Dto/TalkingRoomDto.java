package com.project.eng_back.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TalkingRoomDto {

    private String crid;
    private String unum;
    private LocalDateTime regdate;
    private String subject;
    private int lv;
    private String time;
    private int score;

    public void setCrid(String crid) {
        this.crid = crid;
    }

    public void setUnum(String unum) {
        this.unum = unum;
    }

    public void setRegdate(LocalDateTime regdate) {
        this.regdate = regdate;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setLv(int lv) {
        this.lv = lv;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setScore(int score) {
        this.score = score;
    }
}