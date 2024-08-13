const getToken = () => {
    return localStorage.getItem('token');
};

const createCartUi = (productData) => {
    const cartListCon = document.createElement('div');
    cartListCon.innerHTML = `
        <ul class="cart-list">
            <li>
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
                        <p class="delivery">${productData.shipping_method || ''}</p>
                    </div>
                </div>
            </li>
        </ul>
    `;

    document.body.appendChild(cartListCon);
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
    if (productDatas && productDatas.results) {
        productDatas.results.forEach((productData) => {
            createCartUi(productData);
        });
    } else {
        console.error('상품이 존재하지 않습니다.');
    }
};

initCart();
