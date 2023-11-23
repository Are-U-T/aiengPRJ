package com.project.eng_back.Dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@Getter
public class QuestionRequestDto implements Serializable {

    private String question;

    private int sequence;

    @JsonProperty("gptRole")
    private String GPTRole;

    @JsonProperty("userRole")
    private String UserRole;

    private String situation;

    public QuestionRequestDto() {
    }

    @JsonCreator
    public QuestionRequestDto(@JsonProperty("question") String question) {
        this.question = question;
    }

    public QuestionRequestDto(String question, String GPTRole, String UserRole, String situation) {
        this.question = question;
        this.GPTRole = GPTRole;
        this.UserRole = UserRole;
        this.situation = situation;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

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
}
