package com.project.eng_back.STT;

import com.google.cloud.speech.v1.*;
import com.google.protobuf.ByteString;
import com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding;

import java.util.List;

public class SpeechToTextService {

    public static String syncRecognizeFile(byte[] data) throws Exception {
        StringBuilder transcription = new StringBuilder();

        try (SpeechClient speech = SpeechClient.create()) {
//            Path path = Paths.get(fileName);
//            byte[] data = Files.readAllBytes(path);
            ByteString audioBytes = ByteString.copyFrom(data);

            // Configure request with local raw PCM audio
            RecognitionConfig config =
                    RecognitionConfig.newBuilder()
                            .setEncoding(AudioEncoding.WEBM_OPUS)
                            .setLanguageCode("en-US")
                            .setSampleRateHertz(16000)
                            .build();
            RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(audioBytes).build();

            // Use blocking call to get audio transcript
            RecognizeResponse response = speech.recognize(config, audio);
            List<SpeechRecognitionResult> results = response.getResultsList();

            for (SpeechRecognitionResult result : results) {
                // There can be several alternative transcripts for a given chunk of speech. Just use the
                // first (most likely) one here.
                SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
                String transcript = alternative.getTranscript();
                transcription.append(transcript).append("\n");
//                System.out.printf("Transcription: %s%n", alternative.getTranscript());
            }
        }
        return transcription.toString();
    }
}