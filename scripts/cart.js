const createCarttUi = (productData) => {};

const getCart = async () => {
    try {
        const req = await fetch('https://openmarket.weniv.co.kr/cart/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await req.json();
        console.log(data);

        if (data.count > 0) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        alert('로딩에 실패하였습니다. 다시 시도해주세요.');
        return null;
    }
};

const initCart = async () => {
    const cartDatas = await getCart();
    if (cartDatas && cartDatas.results) {
        cartDatas.results.forEach((productData) => {
            createCartUi(productData);
        });
    } else {
        console.error('장바구니에 상품이 존재하지 않습니다.');
    }
};
initCart();
