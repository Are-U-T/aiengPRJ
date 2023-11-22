package com.project.eng_back.TTS;

// Imports the Google Cloud client library
import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import com.project.eng_back.Dto.Choice;
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
    public static void run(Choice content) {

        // Instantiates a client
        try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {

            // db 에서 select 한 content 가져오기
            String gptText = content.getText();

            System.out.println("gpt 대답 : " + gptText);

            // Set the text input to be synthesized
            SynthesisInput input = SynthesisInput.newBuilder().setText(gptText).build();

            // Build the voice request, select the language code ("en-US") and the ssml voice gender
            // ("neutral")
            VoiceSelectionParams voice =
                    VoiceSelectionParams.newBuilder()
                            .setLanguageCode("en-US")
                            .setSsmlGender(SsmlVoiceGender.NEUTRAL)
                            .build();

            // Select the type of audio file you want returned
            AudioConfig audioConfig =
                    AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();

            // Perform the text-to-speech request on the text input with the selected voice parameters and
            // audio file type
            SynthesizeSpeechResponse response =
                    textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

            // Get the audio contents from the response
            ByteString audioContents = response.getAudioContent();



            // Write the response to the output file.
            try (OutputStream out = new FileOutputStream(num + "seoyun.mp3")) {
                out.write(audioContents.toByteArray());
                System.out.println("Audio content written to file \"seoyun.mp3\"");

            } catch (Exception e) {
                System.out.println("1 에러 출력: " + e);
            }
            int num1 = Integer.valueOf(num);
            num1++;
            num = String.valueOf(num1);
        } catch (Exception e) {
            System.out.println("2 에러 출력: " + e);
        }
    }
}