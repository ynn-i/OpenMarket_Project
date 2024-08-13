// 제품 id를 통해 해당 제품 상세페이지 구현하기
const getProductIdFromUrl = () => {
    const productId = new URLSearchParams(window.location.search);
    return productId.get('product_id');
};

const fetchProductDetails = async (productId) => {
    const res = await fetch(`https://openmarket.weniv.co.kr/products/${productId}/`);
    const productDatas = await res.json();
    return productDatas;
};

const createProductDetailUi = (productData) => {
    const productDetailContainer = document.querySelector('.product-detail');
    const shippingMethodText = productData.shipping_method === 'PARCEL' ? '택배배송' : '무료배송';

    productDetailContainer.innerHTML = `
        <div class="product-detail-img-con">
            <img class="product-detail-img" src="${productData.image}" alt="${productData.product_name}">
        </div>
        <div class="product-detail-info">
            <div class="detail-info">
                <p class="store-info">${productData.store_name}</p>
                <p class="product-info">${productData.product_name}</p>
                <p class="price-info">${productData.price}원</p>
                <p class="delivery-info">${shippingMethodText}</p>
            </div>
            <div class="product-counter-con">
                <div class="counter">
                    <img class="icon-minus" src="./assets/icons/icon-minus.svg" alt="minus">
                    <div><span class="counter-num">1</span></div>
                    <img class="icon-plus" src="./assets/icons/icon-plus.svg" alt="plus">
                </div>
            </div>
            <div class="cost-result-info">
                <p class="cost-info">총 상품 금액</p>
                <p class="count-result">총 수량 <span class="count-result-num">1</span>개</p>
                <p class="cost-result">${productData.price}</p>
            </div>
            <div class="btn-con">
                <button class="purchase-btn">바로 구매</button>
                <button class="cart-btn">장바구니</button>
            </div>
        </div>
    `;

    const counterNum = productDetailContainer.querySelector('.counter-num');
    const counterMinus = productDetailContainer.querySelector('.icon-minus');
    const counterPlus = productDetailContainer.querySelector('.icon-plus');
    const costResult = productDetailContainer.querySelector('.cost-result');
    const countResultNum = productDetailContainer.querySelector('.count-result-num');

    initializeCounter(productData.price, counterNum, counterMinus, counterPlus, costResult, countResultNum, productData.stock);
};

const initializeCounter = (price, counterNum, minusBtn, plusBtn, costResult, countResultNum, stock) => {
    let count = 1;
    const updateDisplay = () => {
        counterNum.textContent = count;
        countResultNum.textContent = `${count}`;
        costResult.textContent = `${(count * price).toLocaleString()}`;
    };
    const increase = () => {
        if (count < stock) {
            count++;
            updateDisplay();
        } else {
            console.log('재고 수량을 초과해서 선택할 수 없습니다.');
        }
    };
    const decrease = () => {
        if (count > 1) {
            count--;
            updateDisplay();
        }
    };

    minusBtn.addEventListener('click', decrease);
    plusBtn.addEventListener('click', increase);
    updateDisplay();
};

const initProductDetailPage = async () => {
    const productId = getProductIdFromUrl();
    if (productId) {
        const productData = await fetchProductDetails(productId);
        if (productData) {
            createProductDetailUi(productData);
            addEventListeners(productData);
        }
    } else {
        console.error('제품 ID가 URL에 없습니다.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initProductDetailPage();

    // 상세 정보 탭
    document.querySelectorAll('.tab-btn').forEach((tab) => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach((t) => t.setAttribute('aria-selected', 'false'));
            tab.setAttribute('aria-selected', 'true');
        });
    });
});

const addEventListeners = (productData) => {
    const purchaseBtn = document.querySelector('.purchase-btn');
    const cartBtn = document.querySelector('.cart-btn');

    if (purchaseBtn && cartBtn) {
        purchaseBtn.addEventListener('click', () => {
            window.location.href = `payment.html?product_id=${productData.id}`;
        });

        cartBtn.addEventListener('click', () => {
            window.location.href = `cart.html?product_id=${productData.id}`;
        });
    } else {
        console.error('해당 페이지를 찾을 수 없습니다.');
    }
};
