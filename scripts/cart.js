// 토큰을 가져오는 함수 정의
const getToken = () => {
    return localStorage.getItem('login-token');
};

const createCartUi = (productData) => {
    const cartListCon = document.createElement('ul');
    cartListCon.classList.add('cart-list');
    const cartList = document.createElement('li');
    const checkCon = document.createElement('div');
    checkCon.classList.add('check');
    const checkLabel = document.createElement('label');
    checkLabel.classList.add('check-cart');
    const checkInp = document.createElement('input');
    checkInp.type = 'checkbox';
    const productCart = document.createElement('div');
    productCart.classList.add('product-cart');
    const productThumbCart = document.createElement('img');
    productThumbCart.classList.add('product-thumb-cart');
    productThumbCart.src = productData.image;
    productThumbCart.alt = productData.product_name;
    const infoCon = document.createElement('div');
    infoCon.classList.add('info-con');
    const subTitle = document.createElement('p');
    subTitle.classList.add('sub-title');
    subTitle.textContent = productData.subTitle || '';
    const mainTitle = document.createElement('p');
    mainTitle.classList.add('main-title');
    mainTitle.textContent = productData.product_name || '';
    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = `${productData.price || 0}원`;
    const delivery = document.createElement('p');
    delivery.classList.add('delivery');
    delivery.textContent = productData.shipping_method || '';

    cartListCon.appendChild(cartList);
    cartList.appendChild(checkCon);
    checkCon.appendChild(checkLabel);
    checkCon.appendChild(checkInp);
    cartList.appendChild(productCart);
    productCart.appendChild(productThumbCart);
    productCart.appendChild(infoCon);
    infoCon.appendChild(subTitle);
    infoCon.appendChild(mainTitle);
    infoCon.appendChild(productPrice);
    infoCon.appendChild(delivery);

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
        return null;
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
