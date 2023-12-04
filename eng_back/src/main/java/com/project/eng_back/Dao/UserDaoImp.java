package com.project.eng_back.Dao;

import com.project.eng_back.Dto.UserDTO;
import com.project.eng_back.Mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImp implements UserDao {

    @Autowired
    UserMapper uMapper;

    @Override
    public List<UserDTO> findAll() {
        return uMapper.findAll();
    }

    @Override
    public int editById(UserDTO uDto) {
        return uMapper.editById(uDto);
    }

    @Override
    public int delete(String num) {
        return uMapper.delete(num);
    }

    @Override
    public int save(UserDTO uDto) {
        return uMapper.save(uDto);
    }
    @Override
    public int editLevel(UserDTO uDto) {
        return uMapper.editLevel(uDto);
    }

    @Override
    public UserDTO mypageUser(String num) { return uMapper.mypageUser(num); }

    @Override
    public int getLevelByUserNum(String userNum) {
        return uMapper.getLevelByUserNum(userNum);
    }

    @Override
    public int getExperienceByUserNum(String userNum) {
        return uMapper.getExperienceByUserNum(userNum);
    }

    @Override
    public int addExperience(UserDTO userDTO) {
        return uMapper.addExperience(userDTO);
    }
}
