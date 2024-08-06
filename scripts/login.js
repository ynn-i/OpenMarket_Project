async function login(id, pw, login_type) {
    const buyerTab = document.getElementById('login-tab').checked;
    const id = document.getElementById('id').value.trim();
    const pw = document.getElementById('pw').value.trim();
    const error = document.querySelector('.error');
    let errorMessage = '';

    if (id === '' && pw === '') {
        errorMessage = '아이디와 비밀번호를 입력해 주세요.';
    } else if (id === '') {
        errorMessage = '아이디를 입력해 주세요.';
    } else if (pw === '') {
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
                login_type: login_type,
            }),
        });
        const data = await req.json();

        if (data.success) {
            alert(loginData.login_type === 'BUYER' ? '구매회원 로그인 성공' : '판매회원 로그인 성공');
            window.location.href = loginData.login_type === 'BUYER' ? '/index.html' : '/index.html';
        } else {
            errorMessage = '아이디 또는 비밀번호가 일치하지 않습니다.';
        }
    } catch (error) {}
}
document.querySelector('button').addEventListener('click', login);

// 비로그인 상태일 때 로그인 페이지로 이동
document.addEventListener('DOMContentLoaded', function () {
    const cartBtn = document.querySelector('.cart');

    cartBtn.addEventListener('click', function (event) {
        event.preventDefault();

        if (isLoggedIn()) {
            window.location.href = '/cart.html';
        } else {
            // 로그인 요청 모달 디스플레이 논 해제
        }
    });
});

async function isLoggedIn() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        return false;
    }

    try {
        const response = await fetch('/api/verify-token', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return true;
        } else {
            // 토큰이 유효하지 않으면 로컬 스토리지에서 제거
            localStorage.removeItem('jwtToken');
            return false;
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        return false;
    }
}
