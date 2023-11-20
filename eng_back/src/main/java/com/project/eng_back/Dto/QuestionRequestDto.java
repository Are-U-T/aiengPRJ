package com.project.eng_back.Dto;

import lombok.Getter;

import java.io.Serializable;

@Getter
public class QuestionRequestDto implements Serializable {
    private String question;

    private int sequence;

    private String role;

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setRole(String role) { this.role = role; }
}
