// Create Ui
const createProductUi = (productData) => {
    const productGallery = document.querySelector('.product-gallery');
    const productCon = document.createElement('div');
    productCon.classList.add('product-con');
    productCon.setAttribute('data-id', productData.product_id);

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

    productGallery.appendChild(productCon);
    productCon.appendChild(productThumb);
    productThumb.appendChild(productImage);
    productCon.appendChild(productInfo);
    productInfo.appendChild(productSubTitle);
    productInfo.appendChild(productMainTitle);
    productInfo.appendChild(productPrice);
    productPrice.appendChild(productPriceUnit);

    // 재품 상세페이지로 이동하기
    productCon.addEventListener('click', () => {
        window.location.href = `https://ynn-i.github.io/OpenMarket_Project/product.html?product_id=${productData.product_id}`;
    });
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
