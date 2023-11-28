function loginValidation() {
    const mail = document.querySelector("input[id=email]");
    const password = document.querySelector("input[id=password]");

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

    if (password.value == "") {
        alert("비밀번호를 입력하세요.");
        password.focus();
        return false;
    }
    ;

    return true;
}

export default loginValidation;