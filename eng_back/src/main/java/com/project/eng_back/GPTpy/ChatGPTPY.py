# prompt engineering을 통해 새로운 학습 데이터를 추가하는 방식으로 모델을 업데이트
from flask import Flask, request, jsonify
from dataclasses import dataclass
import openai

app = Flask(__name__)

# OpenAI API 키 설정
openai.api_key = "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"

@dataclass
class Choice:
    role: str
    content: str

def update_model(user_role, gpt_role, situation):
    # 업데이트에 사용될 프롬프트 생성
    prompt = f"You are a {user_role}. And I am {gpt_role}. I practicing English with you. {situation}"

    # 새로운 예제 데이터 생성
    new_data = [{"input": situation, "output": ""}]

    # 모델 업데이트
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt + new_data[0]["input"]},
            {"role": "assistant", "content": new_data[0]["output"]}
        ],
        max_tokens=1000,
        n=1,
        stop=None,
        temperature=0.7
    )

    # 반환된 응답에서 assistant의 대답 추출
    assistant_response = response['choices'][0]['message']['content']

    return Choice(role="assistant", content=assistant_response)

@app.route("/update-model", methods=["POST"])
def update_model_route():
    try:
        user_role = request.json.get("userRole")
        gpt_role = request.json.get("gptRole")
        situation = request.json.get("situation")

        if user_role is None or gpt_role is None or situation is None:
            raise ValueError("One or more required parameters are missing.")

        # 모델 업데이트
        gpt_response_choice = update_model(user_role, gpt_role, situation)

        # 중간 로그 출력
        print(f"Model updated for user role: {user_role}, GPT role: {gpt_role}, situation: {situation}")

        return jsonify({"status": "success", "response": gpt_response_choice.__dict__})
    except ValueError as ve:
        # 중간 로그 출력
        print(f"Error during model update: {str(ve)}")
        return jsonify({"status": "error", "message": str(ve)}), 400  # 400 Bad Request
    except Exception as e:
        # 중간 로그 출력
        print(f"Error during model update: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="10.20.100.136",port=8889)  # 포트번호
