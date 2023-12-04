

export default function userValidation(name, password, email) {
    // 이름 검사
    if (name === "") {
        alert("이름을 입력하세요.");
        return false;
    }

    var nameRegExp = /^[가-힣a-zA-Z]+$/;
    if (!nameRegExp.test(name)) {
        alert("이름이 올바르지 않습니다.");
        return false;
    }

    // 비밀번호 검사
    if (password === "") {
        alert("비밀번호를 입력하세요.");
        return false;
    }

    if (password === email) {
        alert("비밀번호는 이메일과 일치하면 안 됩니다.");
        return false;
    }

    var passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    if (!passwordRegExp.test(password)) {
        alert("영문 + 숫자 + 특수문자 조합으로 8~15자리 입력해주세요.");
        return false;
    }

    return true;
}
