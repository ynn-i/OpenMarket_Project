// ----------
// 장바구니 아이콘으로 로그인 모달창 띄우기
const openLoginBtn = document.querySelector('.cart');
const LoginModal = document.querySelector('.modal');
const closeLoginBtn = document.querySelector('.close-btn');
const noLoginBtn = document.querySelector('.no-btn');
const moveLoginBtn = document.querySelector('.yes-btn');
const LOGIN = document.querySelector('.login');

function openModal() {
    LoginModal.classList.remove('hidden');
}
function closeModal() {
    LoginModal.classList.add('hidden');
}

function handleLoginModal(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'https://ynn-i.github.io/OpenMarket_Project/cart.html';
    } else {
        openModal(event);
    }
}

openLoginBtn.addEventListener('click', handleLoginModal);
noLoginBtn.addEventListener('click', closeModal);
closeLoginBtn.addEventListener('click', closeModal);
LoginModal.addEventListener('click', function (event) {
    if (event.target === LoginModal) {
        closeModal();
    }
});

moveLoginBtn.addEventListener('click', () => {
    window.location.href = 'https://ynn-i.github.io/OpenMarket_Project/login.html';
});

// ----------
// 마이페이지 버튼 기능 구현
const openMypageBtn = document.querySelector('.mypage');
const mypageModal = document.querySelector('.mypage-modal');
const mypageBtn = document.querySelector('.mypage-btn');
const logoutBtn = document.querySelector('.logout-btn');

function openMypageModal() {
    mypageModal.classList.remove('hidden');
}
function closeMypageModal() {
    mypageModal.classList.add('hidden');
}

openMypageBtn.addEventListener('mouseover', openMypageModal);
openMypageBtn.addEventListener('mouseleave', () => {
    setTimeout(() => {
        if (!mypageModal.matches(':hover') && !openMypageBtn.matches(':hover')) {
            closeMypageModal();
        }
    }, 100);
});
mypageModal.addEventListener('mouseover', openMypageModal);
mypageModal.addEventListener('mouseleave', () => {
    setTimeout(() => {
        if (!mypageModal.matches(':hover') && !openMypageBtn.matches(':hover')) {
            closeMypageModal();
        }
    }, 100);
});

// ----------
// 로그아웃
// 로그아웃
logoutBtn.addEventListener('click', async () => {
    try {
        const res = await fetch('https://openmarket.weniv.co.kr/accounts/logout/', {
            method: 'POST',
            credentials: 'include',
        });
        const data = await res.json();

        if (res.ok) {
            if (data.detail === '로그아웃되었습니다.') {
                localStorage.removeItem('userToken');
                sessionStorage.removeItem('userToken');
                window.location.href = 'https://ynn-i.github.io/OpenMarket_Project/login.html';
            } else {
                console.error('로그아웃 실패:', data.detail || '알 수 없는 오류 발생');
                alert('로그아웃에 실패하였습니다.');
            }
        } else {
            console.error('HTTP 상태 코드:', res.status);
            alert('로그아웃에 실패하였습니다.');
        }
    } catch (error) {
        console.error('로그아웃 요청 실패:', error);
        alert('로그아웃에 실패하였습니다.');
    }
});
