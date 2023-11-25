package com.project.eng_back.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MailDto {
    @JsonProperty("num1")
    private String number;

    private String Confirm;

    private String email;

    public void setNumber(String number) {
        this.number = number;
    }

    public void setConfirm(String confirm) {
        this.Confirm = confirm;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}