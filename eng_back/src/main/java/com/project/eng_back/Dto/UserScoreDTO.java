package com.project.eng_back.Dto;

import lombok.Data;

@Data
public class UserScoreDTO {
    private String user_num;
    private int score;
    private int rank;
    private int total_score;
    private String user_name;
}