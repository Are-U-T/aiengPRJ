package com.project.eng_back.Mapper;


import com.project.eng_back.Dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM USER_T")
    public List<UserDTO> findAll();


    @Update("update USER_T set name = #{name}, pw = #{pw}, gender = #{gender} where num = #{num}")
    public int editById(UserDTO uDto);

    @Update("update USER_T set del = 1 where num = #{num}")
    public int delete(String num);


    @Insert("insert into USER_T (num, name, email, pw, gender) values (#{num}, #{name},#{email},#{pw},#{gender})")
    public int save(UserDTO uDto);

    @Select("SELECT * FROM USER_T WHERE email = #{email}")
    public UserDTO findByEmail(String email);
//
//    @Select("SELECT * FROM USER_T WHERE no = #{num}")
//    public UserDTO findByUserNo(int num);


    @Update("update USER_T set lv = #{lv} where num = #{num}")
    public int editLevel(UserDTO uDto);
}
