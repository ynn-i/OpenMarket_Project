// 아이디 비밀번호 검증 및 로그인
async function login(event) {
    event.preventDefault();

    const selectedRadio = document.querySelector('input[name="tabs"]:checked');
    const loginType = selectedRadio ? selectedRadio.value : 'BUYER';

    console.log('Selected login type:', loginType); // 로그인 타입을 콘솔에 출력합니다.

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
        error.style.setProperty('display', 'block', 'important');
        return;
    }

    try {
        const req = await fetch('https://openmarket.weniv.co.kr/accounts/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: ID,
                password: PW,
                login_type: loginType,
            }),
        });
        const data = await req.json();
        console.log('Response data:', data);

        if (req.ok && data.token) {
            console.log('Login successful!');
            localStorage.setItem('token', data.token);
            window.location.href = 'https://ynn-i.github.io/OpenMarket_Project/';
        } else {
            errorMessage = data.message || '아이디 또는 비밀번호가 일치하지 않습니다.';
            error.textContent = errorMessage;
            error.style.setProperty('display', 'block', 'important');
        }
    } catch (error) {
        alert('로그인에 실패하였습니다. 다시 시도해주세요.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.login-btn').addEventListener('click', login);
});
