package com.project.eng_back.TTS;//package com.areut.finalProject.TTS;
// Imports the Google Cloud client library

import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import com.project.eng_back.Dto.Choice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.FileOutputStream;
import java.io.OutputStream;

/**
 * Google Cloud TextToSpeech API sample application. Example usage: mvn package exec:java
 * -Dexec.mainClass='com.example.texttospeech.QuickstartSample'
 */

@Component
public class QuickstartSample {

    static String num = "1";

    /** Demonstrates using the Text-to-Speech API. */
    public ResponseEntity<byte[]> run(Choice content, int code) {

        // Instantiates a client
        try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {

            // db 에서 select 한 content 가져오기
            String gptText = content.getText();

            System.out.println("gpt 대답 : " + gptText);

            // Set the text input to be synthesized
            SynthesisInput input = SynthesisInput.newBuilder().setText(gptText).build();

            // Build the voice request, select the language code ("en-US") and the ssml voice gender
            // ("neutral")
            VoiceSelectionParams voice;
            if (code >= 1 && code <= 4) {
                // For code 1-4, use en-US language and select gender based on code
                voice = VoiceSelectionParams.newBuilder()
                        .setLanguageCode("en-GB")
                        .setSsmlGender((code % 2 == 1) ? SsmlVoiceGender.MALE : SsmlVoiceGender.FEMALE)
                        .setName(getVoiceName(code))
                        .build();
            } else if (code >= 5 && code <= 8) {
                // For code 5-8, use en-GB language and select gender based on code
                voice = VoiceSelectionParams.newBuilder()
                        .setLanguageCode("en-US")
                        .setSsmlGender((code % 2 == 1) ? SsmlVoiceGender.MALE : SsmlVoiceGender.FEMALE)
                        .setName(getVoiceName(code))
                        .build();
            } else {
                // Handle other code values or provide a default
                // You might want to throw an exception or use a default voice
                // For now, let's use a default voice
                voice = VoiceSelectionParams.newBuilder()
                        .setLanguageCode("en-US")
                        .setSsmlGender(SsmlVoiceGender.FEMALE)
                        .setName(getVoiceName(8)) // You might want to choose a default voice name
                        .build();
            }

            // Select the type of audio file you want returned
            AudioConfig audioConfig =
                    AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();

            // Perform the text-to-speech request on the text input with the selected voice parameters and
            // audio file type
            SynthesizeSpeechResponse response =
                    textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

            // Get the audio contents from the response
            ByteString audioContents = response.getAudioContent();

            byte[] audioBytes = audioContents.toByteArray();


//
//            // Write the response to the output file.
//            try (OutputStream out = new FileOutputStream(num + "seoyun.mp3")) {
//                out.write(audioContents.toByteArray());
//                System.out.println("Audio content written to file \"seoyun.mp3\"");
//
//            } catch (Exception e) {
//                System.out.println("1 에러 출력: " + e);
//            }
//            int num1 = Integer.valueOf(num);
//            num1++;
//            num = String.valueOf(num1);
            return ResponseEntity.ok().contentType(org.springframework.http.MediaType.APPLICATION_OCTET_STREAM)
                    .body(audioBytes);
        } catch (Exception e) {
//            System.out.println("2 에러 출력: " + e);
            System.out.println("Error: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String getVoiceName(int code) {
        String voiceName = null;

        switch (code) {
            case 1:
                voiceName = "en-GB-Neural2-D";//UK male 40
                break;
            case 2:
                voiceName = "en-GB-Neural2-F";//UK female 40
                break;
            case 3:
                voiceName = "en-GB-Neural2-B";//UK male 20
                break;
            case 4:
                voiceName = "en-GB-Neural2-A";//UK female 20
                break;
            case 5:
                voiceName = "en-US-Neural2-J";//US male 40
                break;
            case 6:
                voiceName = "en-US-Neural2-E";//US female 40
                break;
            case 7:
                voiceName = "en-US-Neural2-A";//US male 20
                break;
            case 8:
                voiceName = "en-US-Neural2-G";//US female 20
                break;
            default:
                break;
        }

        return voiceName;
    }
}