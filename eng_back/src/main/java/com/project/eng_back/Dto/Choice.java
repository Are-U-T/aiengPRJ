package com.project.eng_back.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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

    // 생성자
    public Choice() {

    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    @Builder
    public Choice(String text, Integer index, String finishReason, String crid) {
        this.text = text;
        this.index = index;
        this.finishReason = finishReason;
        this.crid = crid;
    }

    public void setCrid(String crid) {
        this.crid = crid;
    }
}