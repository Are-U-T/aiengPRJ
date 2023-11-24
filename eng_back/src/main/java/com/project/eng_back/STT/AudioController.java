package com.project.eng_back.STT;

import com.google.api.client.util.Value;
import com.project.eng_back.Controller.ChatGptController;
import com.project.eng_back.Dto.QuestionRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import static com.google.api.ResourceProto.resource;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/audio")
//@RequestMapping("/api/speech-to-text")
public class AudioController {

    private ChatGptController chatGptController;

    @Autowired
    public AudioController(ChatGptController chatGptController) {
        this.chatGptController = chatGptController;
    }

//    @PostMapping("/start")
//    public void startRecording() {
//        // 開始錄音的相應邏輯
//        System.out.println("Start Recording");
//        try {
//            SpeechToTextExample.startRecording();
//            SpeechToTextExample.streamingMicRecognize();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }// 重置停止錄音的標誌
//
//    }
//
//    @PostMapping("/stop")
//    public void stopRecording() {
//        SpeechToTextExample.stopRecording();
//        System.out.println("Stop Recording");
//    }

//    @Value("${upload.path}")
//    private String uploadPath;  // 设置为文件上传路径

    @PostMapping("/upload")
    public ResponseEntity<Resource> handleAudioUpload(@RequestPart("audio") MultipartFile audioFile) {
//        if (audioFile.isEmpty()) {
////            return ResponseEntity.badRequest().body("Audio file is empty");
//            return ResponseEntity.badRequest().body("Audio file is empty".getBytes());
//        }

        try {

//            // Specify the file path where you want to save the audio file
//            String fileName = "recording.mp3";
//            String uploadPath ="/Users/wangjiangling/Desktop/final/audio/";
//
//
//            // Save the audio file to the specified path
//            Path filePath = Path.of(uploadPath, fileName);
//            Files.copy(audioFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING); // 컴퓨터에 저장

            try {
//                System.out.println(filePath.toString());
                String output = SpeechToTextService.syncRecognizeFile(audioFile.getBytes());
                System.out.println("Speech Recognition Result: " + output);

                byte[] audioData = chatGptController.conversation(output);

                ByteArrayResource resource = new ByteArrayResource(audioData);


//                String filePath = "/Users/wangjiangling/Documents/GitHub/aiengPRJ/1seoyun.mp3";
//                Path path = Paths.get(filePath);
//                Resource resource = new UrlResource(path.toUri());

                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"audio.mp3\"")
                        .body(resource);
            } catch (Exception e) {
                e.printStackTrace(); // Handle the exception as needed
//                return new ResponseEntity<>("Failed to process audio", HttpStatus.INTERNAL_SERVER_ERROR);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ByteArrayResource(new byte[0]));
            }
//            return new ResponseEntity<>("Audio uploaded successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
//            return new ResponseEntity<>("Failed to upload audio", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ByteArrayResource(new byte[0]));
        }
    }
}