package com.project.eng_back.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TalkingRoomDto {

    @JsonProperty("crid")
    private String crid;
    @JsonProperty("GPTRole")
    private String GPTRole;
    @JsonProperty("userRole")
    private String userRole;
    @JsonProperty("situation")
    private String situation;

    public void setCrid(String crid) {
        this.crid = crid;
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

}