package com.project.eng_back.OpenNLP;

import opennlp.tools.sentdetect.SentenceDetectorME;
import opennlp.tools.sentdetect.SentenceModel;
import opennlp.tools.tokenize.TokenizerME;
import opennlp.tools.tokenize.TokenizerModel;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class OpenNLPConversation {

    private SentenceDetectorME sentenceDetector;
    private TokenizerME tokenizer;

    public OpenNLPConversation() throws IOException {
        // Sentence Detector 모델 로딩
        try (InputStream sentenceModelStream = getClass().getResourceAsStream("/OpenNLP/en-sent.bin")) {
            assert sentenceModelStream != null;
            SentenceModel sentenceModel = new SentenceModel(sentenceModelStream);
            sentenceDetector = new SentenceDetectorME(sentenceModel);
        }

        // Tokenizer 모델 로딩
        try (InputStream tokenizerModelStream = getClass().getResourceAsStream("/OpenNLP/en-token.bin")) {
            assert tokenizerModelStream != null;
            TokenizerModel tokenizerModel = new TokenizerModel(tokenizerModelStream);
            tokenizer = new TokenizerME(tokenizerModel);
        }
    }

    public List<String> preprocessText(String text) {
        // 문장 감지
        String[] sentences = sentenceDetector.sentDetect(text);

        // 토큰화
        return new ArrayList<>(Arrays.asList(tokenizer.tokenize(sentences[0])));
    }

    public List<String> recommendNextResponse(List<String> person1, List<String> person2) {
        // 두 사람 간의 대화 내용을 합침
        List<String> conversation = new ArrayList<>();
        conversation.addAll(person1);
        conversation.addAll(person2);

        // 대화 내용을 문장으로 토큰화
        List<String> sentences = conversation.stream()
                .flatMap(text -> Arrays.stream(text.split("\\. ")))
                .collect(Collectors.toList());

        // 대화의 주제와 관련된 질문이나 대답을 우선적으로 고려
        List<String> possibleQuestions = new ArrayList<>();
        for (String sentence : sentences) {
            // 문장을 토큰화할 때 하나의 토큰으로 간주
            List<String> conversationTokens = preprocessText(sentence);

            possibleQuestions.addAll(Stream.of(
                            "What is " + sentence + "?",
                            "How is " + sentence + "?",
                            "Our topic of conversation is " + sentence + ".")
                    .filter(question -> conversationTokens.contains(question))
                    .collect(Collectors.toList()));
        }

        return possibleQuestions;
    }

    public static void main(String[] args) throws IOException {
        OpenNLPConversation openNLPConversation = new OpenNLPConversation();

        // 두 사람 간의 대화 내용을 리스트로 관리
        List<String> person1 = Arrays.asList(
                "Our topic of conversation is making Christmas plans.",
                "I'm so excited for Christmas! What do you think we should do for Christmas?"
        );

        List<String> person2 = Arrays.asList(
                " I love it! So, what do you want to do for dinner after skiing?"
        );

        // 다음 대화말 추천
        List<String> recommendedResponse = openNLPConversation.recommendNextResponse(person1, person2);

        System.out.println("Recommended Next Response: " + recommendedResponse);
    }
}
