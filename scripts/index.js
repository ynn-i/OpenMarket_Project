// Create Ui
const createProductUi = (productData) => {
    const productGallery = document.querySelector('.product-gallery');
    const productCon = document.createElement('div');
    productCon.classList.add('product-con');
    const productThumb = document.createElement('div');
    productThumb.classList.add('product-thumb');
    const productImage = document.createElement('img');
    productImage.src = productData.image;
    productImage.alt = productData.product_name;
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    const productSubTitle = document.createElement('p');
    productSubTitle.classList.add('sub-title');
    productSubTitle.textContent = `${productData.store_name}`;
    const productMainTitle = document.createElement('p');
    productMainTitle.classList.add('main-title');
    productMainTitle.textContent = productData.product_name;
    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = `${productData.price}`;
    const productPriceUnit = document.createElement('span');
    productPriceUnit.classList.add('product-price-unit');

    // $todoText.textContent = todoData.todo;
    productGallery.appendChild(productCon);
    productCon.appendChild(productThumb);
    productThumb.appendChild(productImage);
    productCon.appendChild(productInfo);
    productInfo.appendChild(productSubTitle);
    productInfo.appendChild(productMainTitle);
    productInfo.appendChild(productPrice);
    productPrice.appendChild(productPriceUnit);
};

const getProducts = async () => {
    const res = await fetch('https://openmarket.weniv.co.kr/products/');
    const productDatas = await res.json();
    return productDatas;
};
const initProducts = async () => {
    const productDatas = await getProducts();
    if (productDatas && productDatas.results) {
        productDatas.results.forEach((productData) => {
            createProductUi(productData);
        });
    } else {
        console.error('상품이 존재하지 않습니다.');
    }
};
initProducts();

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
    const token = localStorage.getItem('token');
    if (token) {
        alert('Redirecting to cart page');
        window.location.href = '/cart.html';
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
