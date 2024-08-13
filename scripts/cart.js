// 상품 데이터 가져오기
const fetchProductsData = async () => {
    try {
        const response = await fetch('https://openmarket.weniv.co.kr/products/');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('상품 데이터를 가져오는 데 실패했습니다.', err);
    }
};

// 상품 아이디로 상품 정보 불러오기
const findProductInfo = (productId, productsData) => {
    return productsData.results?.find((e) => e.product_id === Number(productId));
};

const getToken = () => {
    return localStorage.getItem('token');
};

const createCartUi = (productData) => {
    const shipping = productData.shipping_method === 'PARCEL' ? '택배배송' : '무료배송';
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
        <div class="check">
            <label class="check-cart">
                <input type="checkbox">
            </label>
        </div>
        <div class="product-cart">
            <img class="product-thumb-cart" src="${productData.image}" alt="${productData.product_name}">
            <div class="info-con">
                <p class="sub-title">${productData.subTitle || ''}</p>
                <p class="main-title">${productData.product_name || ''}</p>
                <p class="product-price">${productData.price || 0}원</p>
                <p class="delivery">${shipping}</p>
            </div>
        </div>
        <div class="counter-con">
            <div class="counter">
                <img class="icon-minus" src="./assets/icons/icon-minus.svg" alt="" />
                <div class="counter-num"><span>1</span></div>
                <img class="icon-plus" src="./assets/icons/icon-plus.svg" alt="" />
            </div>
        </div>
        <div class="product-cost">
            <p class="cost-result">TEXT</p>
            <button class="buy-sm-btn">주문하기</button>
        </div>
        <img class="close-btn" src="./assets/icons/icon-delete.svg" alt="" />
    `;

    const counterNum = cartItem.querySelector('.counter-num span');
    const counterMinus = cartItem.querySelector('.icon-minus');
    const counterPlus = cartItem.querySelector('.icon-plus');
    const costResult = cartItem.querySelector('.cost-result');

    initializeCartCounter(productData.price, counterNum, counterMinus, counterPlus, costResult, productData.stock);

    return cartItem;
};

const initializeCartCounter = (price, counterNum, minusBtn, plusBtn, costResult, stock) => {
    let count = 1;
    const updateDisplay = () => {
        counterNum.textContent = count;
        costResult.textContent = `${(count * price).toLocaleString()}원`;
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

const getCart = async () => {
    const token = getToken();
    if (!token) {
        console.error('로그인 토큰이 없습니다.');
        return null;
    }
    try {
        const res = await fetch('https://openmarket.weniv.co.kr/cart/', {
            method: 'GET',
            headers: {
                Authorization: `JWT ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error('fetch 실패: cart data');
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

const initCart = async () => {
    const productDatas = await getCart();
    const productsData = await fetchProductsData();

    if (productDatas && productDatas.results && productDatas.results.length > 0) {
        const cartListCon = document.querySelector('.cart-list');
        productDatas.results.forEach((cartProduct) => {
            const productData = findProductInfo(cartProduct.product_id, productsData);
            if (productData) {
                const cartItem = createCartUi(productData);
                cartListCon.appendChild(cartItem);
            } else {
                console.error('해당 상품 정보를 찾을 수 없습니다.');
            }
        });

        // 장바구니에 상품이 있을 경우 총 합계 정보 전달
        const costResultCon = document.querySelector('.cost-result-con');
        if (costResultCon) {
            costResultCon.classList.remove('hidden');
        }
    } else {
        const noCart = document.querySelector('.no-cart');
        noCart.classList.remove('hidden');
    }
};

initCart();
