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

    const productImageCon = document.createElement('div');
    productImageCon.classList.add('product-detail-img-con');
    const productImage = document.createElement('img');
    productImage.classList.add('product-detail-img');
    productImage.src = productData.image;
    productImage.alt = productData.product_name;

    const productDetailInfo = document.createElement('div');
    productDetailInfo.classList.add('product-detail-info');
    const detailInfo = document.createElement('div');
    detailInfo.classList.add('detail-info');
    const storeInfo = document.createElement('p');
    storeInfo.classList.add('store-info');
    storeInfo.textContent = `${productData.store_name}`;
    const productInfo = document.createElement('p');
    productInfo.classList.add('product-info');
    productInfo.textContent = productData.product_name;
    const priceInfo = document.createElement('p');
    priceInfo.classList.add('price-info');
    priceInfo.textContent = `${productData.price}`;
    // 배송방법 정보 수정 예정
    const deliveryInfo = document.createElement('p');
    deliveryInfo.classList.add('delivery-info');
    deliveryInfo.textContent = `${productData.shipping_method}`;

    const productCounterCon = document.createElement('div');
    productCounterCon.classList.add('product-counter-con');
    const productCounter = document.createElement('div');
    productCounter.classList.add('counter');
    const counterMinus = document.createElement('img');
    counterMinus.classList.add('icon-minus');
    counterMinus.src = './assets/icons/icon-minus.svg';
    const counterNumCon = document.createElement('div');
    const counterNum = document.createElement('span');
    counterNum.textContent = count;
    const counterPlus = document.createElement('img');
    counterPlus.classList.add('icon-plus');
    counterPlus.src = './assets/icons/icon-plus.svg';

    const costResultInfo = document.createElement('div');
    costResultInfo.classList.add('cost-result-info');
    const costInfo = document.createElement('p');
    costInfo.classList.add('cost-info');
    costInfo.textContent = '총 상품 금액';
    // 상품 수량 정보 수정 예정
    const countResult = document.createElement('p');
    countResult.classList.add('count-result');
    // 총 금액 정보 수정 예정
    const costResult = document.createElement('p');
    costResult.classList.add('cost-result');
    costResult.textContent = `${productData.price}`;

    const btnCon = document.createElement('div');
    btnCon.classList.add('btn-con');
    const purchaseBtn = document.createElement('button');
    purchaseBtn.classList.add('purchase-btn');
    purchaseBtn.textContent = '바로 구매';
    const cartBtn = document.createElement('button');
    cartBtn.classList.add('cart-btn');
    cartBtn.textContent = '장바구니';

    productDetailContainer.appendChild(productImage);
    productDetailContainer.appendChild(productImageCon);
    productImageCon.appendChild(productImage);
    productDetailContainer.appendChild(productDetailInfo);
    productDetailInfo.appendChild(detailInfo);
    detailInfo.appendChild(storeInfo);
    detailInfo.appendChild(productInfo);
    detailInfo.appendChild(priceInfo);
    detailInfo.appendChild(deliveryInfo);
    productDetailInfo.appendChild(productCounterCon);
    productCounterCon.appendChild(productCounter);
    productCounter.appendChild(counterMinus);
    productCounter.appendChild(counterNumCon);
    counterNumCon.appendChild(counterNum);
    productCounter.appendChild(counterPlus);
    productDetailInfo.appendChild(costResultInfo);
    costResultInfo.appendChild(costInfo);
    costResultInfo.appendChild(countResult);
    costResultInfo.appendChild(costResult);
    productDetailInfo.appendChild(btnCon);
    btnCon.appendChild(purchaseBtn);
    btnCon.appendChild(cartBtn);

    // 카운터 기능 초기화
    initializeCounter(price, countResult, minusBtn, plusBtn, costResult);
};

// 카운터 기능 구현
const initializeCounter = (price, countResult, minusBtn, plusBtn, costResult) => {
    let count = 1;
    const updateDisplay = () => {
        countResult.textContent = count;
        costResult.textContent = `${(count * price).toLocaleString()}`;
    };
    const increase = () => {
        count++;
        updateDisplay();
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
        }
    } else {
        console.error('제품 ID가 URL에 없습니다.');
    }
};

document.addEventListener('DOMContentLoaded', initProductDetailPage);

// 상세 정보 탭
document.querySelectorAll('.tab-btn').forEach((tab) => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach((t) => t.setAttribute('aria-selected', 'false'));
        tab.setAttribute('aria-selected', 'true');
    });
});
