package com.project.eng_back.Mapper;

import com.project.eng_back.Dto.ReviewDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReviewMapper {

    @Insert("insert into REVIEW_TEST (num, wnum, title, content, rdate) values (#{num}, #{wnum},#{title},#{content}, #{rdate})")
    public int write(ReviewDto reviewDto);
}
