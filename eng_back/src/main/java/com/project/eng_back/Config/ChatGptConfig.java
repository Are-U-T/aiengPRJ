package com.project.eng_back.Config;

public class ChatGptConfig {
    public static final String AUTHORIZATION = "Authorization";
    public static final String BEARER = "Bearer ";
    public static final String API_KEY = "깃허브에 key 값 올리면 자꾸 유출된다고 key 값 삭제하니까 이렇게 올릴게요";
    public static final String MODEL = "text-davinci-003";
    public static final Integer MAX_TOKEN = 300;
    public static final Double TEMPERATURE = 0.0;
    public static final Double TOP_P = 1.0;
    public static final String MEDIA_TYPE = "application/json; charset=UTF-8";
    public static final String URL = "https://api.openai.com/v1/completions";
}