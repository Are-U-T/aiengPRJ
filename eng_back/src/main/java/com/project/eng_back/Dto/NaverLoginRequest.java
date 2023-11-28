package com.project.eng_back.Dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class NaverLoginRequest {

    private String accessToken;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}