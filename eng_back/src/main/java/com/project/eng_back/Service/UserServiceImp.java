package com.project.eng_back.Service;

import com.project.eng_back.Dao.UserDao;
import com.project.eng_back.Dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserDao uDao;

    @Override
    public List<UserDTO> findAll() {
        return uDao.findAll();
    }

    @Override
    public int editById(UserDTO uDto) {
        return uDao.editById(uDto);
    }

    @Override
    public int delete(String num) {
        return uDao.delete(num);
    }

    @Override
    public int save(UserDTO uDto) {
        return uDao.save(uDto);
    }
}
