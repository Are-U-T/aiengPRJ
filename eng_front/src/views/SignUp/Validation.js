function userValidation() {
    const mail = document.querySelector("input[id=mail]");
    const number = document.querySelector("input[id=number]");
    const password = document.querySelector("input[id=password]");
    const userName = document.querySelector("input[id=name]");

    if (mail.value == "") {
        alert("이메일을 입력하세요.");
        mail.focus();
        return false;
    }
    ;

    var mailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!mailRegExp.test(mail.value)) {
        alert("올바른 이메일을 입력해주세요.");
        mail.focus();
        mail.value = "";
        return false;
    }

    if (number.value == "") {
        alert("인증번호를 입력하세요.");
        number.focus();
        return false;
    }
    ;

    var numberRegExp = /^[0-9]{6}$/;
    if (!numberRegExp.test(number.value)) {
        alert("올바른 인증번호를 입력해주세요.");
        number.focus();
        number.value = "";
        return false;
    }

    if (password.value == "") {
        alert("비밀번호를 입력하세요.");
        password.focus();
        return false;
    }
    ;

    if (password.value == mail.value) {
        alert("비밀번호는 이메일과 일치하면 안 됩니다.");
        password.focus();
        password.value = "";
        return false;
    }

    var passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    if (!passwordRegExp.test(password.value)) {
        alert("영문 + 숫자 + 특수문자 조합으로 8~15자리 입력해주세요.");
        password.focus();
        password.value = "";
        return false;
    }

    // 이름 검사
    if (userName.value == "") {
        alert("이름을 입력하세요.");
        userName.focus();
        return false;
    }
    ;

    var nameRegExp = /^[가-힣a-zA-Z]+$/;
    if (!nameRegExp.test(userName.value)) {
        alert("이름이 올바르지 않습니다.");
        userName.focus();
        userName.value = "";
        return false;
    }

    // alert("완료.");
    return true;
}

export default userValidation;