package com.project.eng_back.Service;

import com.project.eng_back.Dto.UserDTO;

import java.util.List;

public interface UserService {

    public List<UserDTO> findAll();

    public int editById(UserDTO uDto);

    public int delete(String num);

    public int save(UserDTO uDto);
}
