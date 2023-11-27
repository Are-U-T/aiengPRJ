package com.project.eng_back.Dto;

import lombok.Data;

@Data
public class GoogleUserDTO {
    private String name;
    private String email;
    private String pw;
    private int gender;

    public GoogleUserDTO() {
        this.pw = "GoogleUser";
        this.gender = 1;
    }
}