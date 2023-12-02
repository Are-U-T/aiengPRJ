package com.project.eng_back.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
//import java.time.LocalDateTime;

@Data
@Getter
public class TalkingRoomDto {

    @JsonProperty("crid")
    private String crid;

    private String unum;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    private LocalDate regdate;

    private String lv;

    private String time;

    @JsonProperty("gptRole")
    private String GPTRole;

    @JsonProperty("userRole")
    private String userRole;

    @JsonProperty("situation")
    private String situation;

    private String country;

    public void setCrid(String crid) {
        this.crid = crid;
    }

    public void setLv(String lv) {
        this.lv = lv;
    }

    public void setTime(String time) {
        this.time = time;
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

    public void setCountry(String country) {
        this.country = country;
    }

    public void setUnum(String unum) {
        this.unum = unum;
    }
}