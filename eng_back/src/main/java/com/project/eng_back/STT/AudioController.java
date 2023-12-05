package com.project.eng_back.STT;

import com.project.eng_back.Controller.ChatGptController;
import com.project.eng_back.TTS.PlayAudio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/audio")
public class AudioController {

    private ChatGptController chatGptController;

    @Autowired
    private PlayAudio playAudio;

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

    // 음성 나오게 하는 메서드
    @PostMapping("/playAudio")
    public ResponseEntity<Resource> playAudio(@RequestParam("text") String textToConvert) {
        try {

            byte[] audioData = playAudio.playAudio(textToConvert).getBody();
            // 创建 ByteArrayResource
            ByteArrayResource resource = new ByteArrayResource(audioData);

            // 返回 ResponseEntity，设置响应头以指示资源类型和文件名
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"audio.mp3\"")
                    .body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            // 返回带错误信息的 ResponseEntity
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ByteArrayResource(new byte[0]));
        }
    }

    // 다른 표현 문장 3개 추천
    @PostMapping("/alternativeExpressionOutput")
    public ResponseEntity<String> alternativeExpressionOutput(@RequestParam("text") String textToConvert) {
        try {
            // 调用 OpenAI API 获取其他表达方式
            String alternativeExpression = chatGptController.alternativeExpressionOutput(textToConvert);
            System.out.println("alternativeExpression: " + alternativeExpression);

            // 返回 ResponseEntity，將 alternativeExpression 作為純文本返回
            return ResponseEntity.ok().body(alternativeExpression);
        } catch (Exception e) {
            e.printStackTrace();
            // 返回带错误信息的 ResponseEntity
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating alternative expression.");
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<Resource> handleAudioUpload(@RequestPart("audio") MultipartFile audioFile, @RequestPart("userNum") String userNum) {
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

                System.out.println("audio userNum : " + userNum);
                byte[] audioData = chatGptController.conversation(output, userNum);

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

    @PostMapping("/autoQuestion")
    public ResponseEntity<Resource> autoQuestion(@RequestParam("text") String textToConvert, @RequestParam("userNum") String userNum) {
        try {

            byte[] audioData = chatGptController.conversation(textToConvert, userNum);
            // 创建 ByteArrayResource
            ByteArrayResource resource = new ByteArrayResource(audioData);

            // 返回 ResponseEntity，设置响应头以指示资源类型和文件名
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"audio.mp3\"")
                    .body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            // 返回带错误信息的 ResponseEntity
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ByteArrayResource(new byte[0]));
        }
    }
}