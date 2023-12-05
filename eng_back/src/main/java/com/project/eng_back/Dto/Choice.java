package com.project.eng_back.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Getter
@Component
public class Choice implements Serializable {

    private String text;
    private Integer index;
    @JsonProperty("finish_reason")
    private String finishReason;
    private String crid;

    private int sequence;
    private String speaker;

    private String uid;

    // 생성자
    public Choice() {

    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    @Builder
    public Choice(String text, Integer index, String finishReason, String crid, String speaker, String uid) {
        this.text = text;
        this.index = index;
        this.finishReason = finishReason;
        this.crid = crid;
        this.speaker = speaker;
        this.uid = uid;
    }

    public void setCrid(String crid) {
        this.crid = crid;
    }

    public void setSpeaker(String speaker) {
        this.speaker = speaker;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }
}