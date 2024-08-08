// 아이디 비밀번호 검증 및 로그인
async function login(id, pw, login_type) {
    const loginType = document.getElementById('login-tab').checked;
    const ID = document.getElementById('id').value.trim();
    const PW = document.getElementById('pw').value.trim();
    const error = document.querySelector('.error');
    let errorMessage = '';

    if (ID === '' && PW === '') {
        errorMessage = '아이디와 비밀번호를 입력해 주세요.';
    } else if (ID === '') {
        errorMessage = '아이디를 입력해 주세요.';
    } else if (PW === '') {
        errorMessage = '비밀번호를 입력해 주세요.';
    }
    if (errorMessage) {
        error.textContent = errorMessage;
        error.style.display = 'block';
        return;
    }

    try {
        const req = await fetch('https://openmarket.weniv.co.kr/accounts/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: id,
                password: pw,
                login_type: loginType ? 'SELLER' : 'BUYER',
            }),
        });
        const data = await req.json();

        if (data.success) {
            alert(loginData.login_type === 'BUYER' ? '구매회원 로그인 성공' : '판매회원 로그인 성공');
            window.location.href = loginData.login_type === 'BUYER' ? '/index.html' : '/index.html';
        } else {
            errorMessage = '아이디 또는 비밀번호가 일치하지 않습니다.';
        }
    } catch (error) {
        alert('로그인에 실패하였습니다. 다시 시도해주세요.');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.login-btn').addEventListener('click', login);
});
