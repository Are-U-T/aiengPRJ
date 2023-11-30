package com.project.eng_back.Dao;

import com.project.eng_back.Dto.UserDTO;

import java.util.List;

public interface UserDao {
    public List<UserDTO> findAll();
    public int editById(UserDTO uDto);
    public int delete(String num);
    public int save(UserDTO uDto);

    public int editLevel(UserDTO uDto);
}
