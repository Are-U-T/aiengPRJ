from transformers import GPT2LMHeadModel, GPT2Tokenizer

def generate_sentence(prompt, model, tokenizer, max_length=50):
    input_ids = tokenizer.encode(prompt, return_tensors='pt')
    output = model.generate(input_ids, max_length=max_length, num_beams=5, no_repeat_ngram_size=2, top_k=50, top_p=0.95, temperature=0.7)

    generated_sentence = tokenizer.decode(output[0], skip_special_tokens=True)
    return generated_sentence

if __name__ == "__main__":
    # GPT 모델 및 토크나이저 로드
    gpt_model = GPT2LMHeadModel.from_pretrained('gpt2')
    gpt_tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

    # 생성할 문장의 프롬프트
    prompt = ("broke up")

    # 문장 생성
    generated_sentence = generate_sentence(prompt, gpt_model, gpt_tokenizer)

    # 결과 출력
    print("Generated Sentence:", generated_sentence)
