package com.project.eng_back.Dto;

import com.sun.istack.NotNull;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.UUID;

@Validated
@Data
public class UserDTO {

    private String num;

    @NotNull
    @Pattern(regexp = "/^[가-힣a-zA-Z]+$/")
    private String name;

    @NotNull
    @Email
    @Pattern(regexp = "/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i", message = "올바른 이메일 주소 형식이 아닙니다.")
    private String email;

    @NotNull
    @Pattern(regexp = "/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/")
    private String pw;

    private int gender;

    private int lv;

    private int del;

    private LocalDateTime regDate;

    public UserDTO() {
        this.num = UUID.randomUUID().toString();
    }
}