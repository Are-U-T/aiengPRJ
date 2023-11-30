package com.project.eng_back.Dao;

import com.project.eng_back.Dto.ReviewDto;
import com.project.eng_back.Mapper.ReviewMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewDaoImpl implements ReviewDao {

    @Autowired
    ReviewMapper reviewMapper;

    @Override
    public int write(ReviewDto reviewDto) { return reviewMapper.write(reviewDto);}
}
