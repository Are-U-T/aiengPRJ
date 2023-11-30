package com.project.eng_back.Controller;

import com.project.eng_back.Dto.GoogleUserDTO;
import com.project.eng_back.Dto.UserDTO;
import com.project.eng_back.Mapper.UserMapper;
import com.project.eng_back.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    @GetMapping("/data")
    public String home() {
        return "data 준비 중 ....";
    }

    @Autowired
    UserService uService;

    @GetMapping("/findAll")
    public List<UserDTO> findAll() {
        return uService.findAll();
    }

    @PostMapping("/editById")
    public int editById(@RequestBody UserDTO uDto) {
        System.out.println(uDto);
        return uService.editById(uDto);
    }

    @PostMapping("/saveLevel")
    public int saveLevel(@RequestBody UserDTO uDto) {
        System.out.println(uDto);
        return uService.editLevel(uDto);
    }

    @DeleteMapping("/delete")
    public int delete(@RequestParam("num") String num) {
        return uService.delete(num);
    }

    @PutMapping("/save")
    public int save(@RequestBody UserDTO uDto) {
        return uService.save(uDto);
    }

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO, HttpSession session) {
        UserDTO foundUser = userMapper.findByEmail(userDTO.getEmail());

        if (foundUser != null && foundUser.getPw().equals(userDTO.getPw())) {
            String userNo = foundUser.getNum();
            session.setAttribute("userNo", userNo);
            return ResponseEntity.ok(foundUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀 번호 틀렸습니다.");
        }
    }

    @PutMapping("/google-login")
    public ResponseEntity<?> googleSave(@Valid @RequestBody GoogleUserDTO guDto, HttpSession session) {
        System.out.println("test" + guDto);
        UserDTO foundUser = userMapper.findByEmail(guDto.getEmail());

        if (foundUser != null) {
            String userNo = foundUser.getNum();
            session.setAttribute("userNo", userNo);
            return ResponseEntity.ok(foundUser);
        }

        UserDTO uDto = new UserDTO();
        uDto.setName(guDto.getName());
        uDto.setEmail(guDto.getEmail());
        uDto.setPw(guDto.getPw());
        uDto.setGender(guDto.getGender());
        System.out.println(uDto);

        int result = uService.save(uDto);

        if (result > 0) {
            session.setAttribute("userNo", uDto.getNum());
            return ResponseEntity.ok(uDto);

        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save user");
        }
    }
}
