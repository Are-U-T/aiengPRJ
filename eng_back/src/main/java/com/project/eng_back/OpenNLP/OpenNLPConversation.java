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

    public List<String> generateResponse(List<String> inputTokens) {
        // 대화 내용 전체를 역순으로 나열하여 응답으로 사용
        Collections.reverse(inputTokens);
        return inputTokens;
    }

    public List<String> recommendNextResponse(List<String> person1, List<String> person2) {
        // 두 사람 간의 대화 내용을 합침
        List<String> conversation = new ArrayList<>();
        conversation.addAll(person1);
        conversation.addAll(person2);

        // 대화 내용을 문장과 단어로 토큰화
        List<String> conversationTokens = conversation.stream()
                .flatMap(text -> preprocessText(text).stream())
                .collect(Collectors.toList());

        // 대화의 주제와 흐름을 파악
        // 단어 빈도수를 분석하여 대화의 주제를 파악
        Map<String, Long> wordCounts = conversationTokens.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        Set<String> topics = wordCounts.keySet();

        // 문장 구조를 분석하여 대화의 흐름을 파악
        List<String> sentences = Arrays.asList(conversation.get(0).split("\\. "));
        Map<String, List<String>> sentenceStructures = sentences.stream()
                .collect(Collectors.groupingBy(sentence -> sentence.split(" ")[0]));

        // 대화의 주제와 흐름에 따라 다음 질문이나 대답의 가능성을 예측
        // 대화의 주제와 관련된 질문이나 대답을 우선적으로 고려
        List<String> possibleQuestions = topics.stream()
                .flatMap(topic -> Stream.of(
                        "What is " + topic + "?",
                        "How is " + topic + "?",
                        "Tell me about " + topic + "."))
                .collect(Collectors.toList());

        // 대화의 흐름과 일관된 질문이나 대답을 고려
        List<String> possibleAnswers = conversationTokens.stream()
                .filter(token -> token.equals("."))
                .map(index -> conversationTokens.subList(0, conversationTokens.indexOf(index)))
                .filter(tokens -> tokens.size() > 1)
                .flatMap(tokens -> Stream.of(
                        "I agree.",
                        "That's interesting.",
                        "I don't know."))
                .collect(Collectors.toList());

        // 예측된 가능성을 바탕으로 다음 질문이나 대답을 추천
        List<String> nextResponse = Collections.singletonList(possibleQuestions.stream()
                .filter(question -> conversationTokens.contains(question))
                .findFirst()
                .orElseGet(() -> possibleAnswers.stream()
                        .filter(answer -> conversationTokens.contains(answer))
                        .findFirst()
                        .orElse(Collections.singletonList("I don't know.").toString())));

        return nextResponse;
    }

    public static void main(String[] args) throws IOException {
        OpenNLPConversation openNLPConversation = new OpenNLPConversation();

        // 두 사람 간의 대화 내용을 리스트로 관리
        List<String> person1 = Arrays.asList(
                "Hi, how are you?",
                "I'm good, thanks! How about you?"
        );

        List<String> person2 = Arrays.asList(
                "What have you been up to?",
                "Not much, just working and enjoying some free time."
        );

        // 다음 대화말 추천
        List<String> recommendedResponse = openNLPConversation.recommendNextResponse(person1, person2);

        System.out.println("Recommended Next Response: " + recommendedResponse);
    }
}
