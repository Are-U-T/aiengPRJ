package com.project.eng_back.Controller;

import com.project.eng_back.Dto.ReviewDto;
import com.project.eng_back.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping("/write")
    public int editById(@RequestBody ReviewDto reviewDto) {
        System.out.println(reviewDto);
        return reviewService.write(reviewDto);
    }
}