package com.project.eng_back.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDTO {

    private String num;
    private String name;
    private String email;
    private String pw;
    private int gender;
    private int lv;
    private int del;
    private LocalDateTime regDate;
}
