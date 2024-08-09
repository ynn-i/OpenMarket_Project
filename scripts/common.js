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

function handleLoginModal(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'https://ynn-i.github.io/OpenMarket_Project/cart.html';
    } else {
        openModal(event);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    openLoginBtn.addEventListener('click', handleLoginModal);

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
});
