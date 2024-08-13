document.addEventListener('DOMContentLoaded', () => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const swiperIndicators = document.querySelector('.swiper-indicators');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    const slideImages = ['./assets/images/banner1.png', './assets/images/banner2.png', './assets/images/banner3.png'];

    let currentIndex = 0;
    const totalSlides = slideImages.length;
    const slideInterval = 10000;
    let autoSlideInterval;

    const createSlides = () => {
        slideImages.forEach((image) => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `<img src="${image}" alt="Banner Image">`;
            swiperWrapper.appendChild(slide);
        });
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            if (i === 0) {
                indicator.classList.add('active');
            }
            swiperIndicators.appendChild(indicator);
        }
    };

    const updateIndicators = () => {
        const indicators = document.querySelectorAll('.swiper-indicators button');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    };

    const moveToSlide = (index) => {
        swiperWrapper.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateIndicators();
    };
    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % totalSlides;
        moveToSlide(nextIndex);
    };
    const prevSlide = () => {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        moveToSlide(prevIndex);
    };
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, slideInterval);
    };
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    swiperIndicators.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            stopAutoSlide();
            const index = Array.from(swiperIndicators.children).indexOf(event.target);
            moveToSlide(index);
            startAutoSlide();
        }
    });
    createSlides();
    startAutoSlide();

    const createProductUi = (productData) => {
        const productGallery = document.querySelector('.product-gallery');

        const productCon = document.createElement('div');
        productCon.classList.add('product-con');
        productCon.setAttribute('data-id', productData.product_id);

        productCon.innerHTML = `
            <div class="product-thumb">
                <img src="${productData.image}" alt="${productData.product_name}">
            </div>
            <div class="product-info">
                <p class="sub-title">${productData.store_name}</p>
                <p class="main-title">${productData.product_name}</p>
                <p class="product-price">
                    ${productData.price}
                    <span class="product-price-unit"></span>
                </p>
            </div>
        `;

        productGallery.appendChild(productCon);

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
});
