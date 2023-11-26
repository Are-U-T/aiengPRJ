package com.project.eng_back.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChattingDto {

    private String content;

    private int speaker;

    public ChattingDto(String content, int speaker)
    {
        this.content = content;
        this.speaker = speaker;
    }

    public void setSpeaker(int speaker) {
        this.speaker = speaker;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
