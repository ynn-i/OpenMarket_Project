// 아이디 비밀번호 검증 및 로그인
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

// ----------
// 장바구니 아이콘으로 로그인 모달창 띄우기
const openLoginBtn = document.querySelector('.cart');
const LoginModal = document.querySelector('.modal');
const closeLoginBtn = document.querySelector('.close-btn');
const noLoginBtn = document.querySelector('.no-btn');
const moveLoginBtn = document.querySelector('.yes-btn');

function openModal(event) {
    event.preventDefault();
    LoginModal.classList.remove('hidden');
}
function closeModal() {
    LoginModal.classList.add('hidden');
}

openLoginBtn.addEventListener('click', openModal);
closeLoginBtn.addEventListener('click', closeModal);
noLoginBtn.addEventListener('click', closeModal);
LoginModal.addEventListener('click', function (event) {
    if (event.target === LoginModal) {
        closeModal();
    }
});

// 로그인 페이지로 이동하기
moveLoginBtn.addEventListener('click', function () {
    window.location.href = 'https://ynn-i.github.io/OpenMarket_Project/login.html';
});
