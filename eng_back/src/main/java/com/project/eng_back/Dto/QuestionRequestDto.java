package com.project.eng_back.Dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@Getter
public class QuestionRequestDto implements Serializable {

    private String crid;

    private String unum;

    private String question;

    private int sequence;

    @JsonProperty("gptRole")
    private String GPTRole;

    @JsonProperty("userRole")
    private String UserRole;

    private String situation;

    private String speaker;

    private int country;

    private String uid;

    private String lv;

    public QuestionRequestDto() {
    }

    @JsonCreator
    public QuestionRequestDto(@JsonProperty("question") String question) {
        this.question = question;
    }

    public QuestionRequestDto(String crid , String unum, String question, String GPTRole, String UserRole, String situation, String speaker, int country, String uid, String lv) {
        this.crid = crid;
        this.unum = unum;
        this.question = question;
        this.GPTRole = GPTRole;
        this.UserRole = UserRole;
        this.situation = situation;
        this.speaker = speaker;
        this.country = country;
        this.uid = uid;
        this.lv = lv;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public void setUnum(String unum) {this.unum = unum; }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setGPTRole(String GPTRole) {
        this.GPTRole = GPTRole;
    }

    public void setUserRole(String UserRole) {
        this.UserRole = UserRole;
    }

    public void setSituation(String situation) {
        this.situation = situation;
    }

    public void setCrid(String crid){ this.crid = crid; }

    public void setSpeaker(String speaker) { this.speaker = speaker; }

    public void setCountry(int country) { this.country = country; }

    public void setUid(String uid) { this.uid = uid; }

    public void setLv(String lv) { this.lv = lv; }
}