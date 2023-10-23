function startAnim(isOpened) {
    const sidebar = document.getElementById('sidebar');
    const button = document.getElementById('sidebarIcon');
    if (isOpened === true) {
        sidebar.className = "sidebarClosed";
        button.className = "sidebarIconClosed";
    } else {
        sidebar.className = "sidebar";
        button.className = "sidebarIcon";
    }
}

let isOpened = false;

document.getElementById('sidebarIcon').addEventListener('click', () => {
    if (isOpened === false){
        startAnim(false);
        isOpened = true;
    } else {
        startAnim(true);
        isOpened = false;
    }
})

async function getProducts() {
    return (await fetch('https://fakestoreapi.com/products')).json();
}

getProducts().then(products => {
    products.forEach((item) => {
        const productBlock = document.createElement('div');
        productBlock.className = 'product';

        const productImageFrame = document.createElement('div');
        productImageFrame.className = 'productFrame';

        const productImage = document.createElement('img');
        productImage.src = item.image;
        productImage.setAttribute('alt', '');
        productImage.setAttribute("id", "ImgProduct" + item.id);
        productImage.className = 'productImg';

        const productBlockInfo = document.createElement('div');
        productBlockInfo.className = 'productInfo';

        const productBlockTitle = document.createElement('div');
        productBlockTitle.className = 'productTitleBlock';

        const productTitle = document.createElement('h3');
        productTitle.textContent = item.title;
        productTitle.className = 'productTitle';

        const separateLine = document.createElement('hr');

        const description = document.createElement('p');
        description.textContent = item.description;
        description.className = 'productDescr';

        const productPriceValue = document.createElement('p');
        productPriceValue.textContent = item.price;
        productPriceValue.setAttribute("id", "Price" + item.id);

        const productBlockRating = document.createElement('div');
        productBlockRating.className = 'productRating';

        const productRating = document.createElement('p');

        const productRatingValue = document.createElement('p');
        productRating.textContent = 'Rating: ';
        productRatingValue.textContent = item.rating.rate + '/5';

        const productCategory = document.createElement('p');
        productCategory.textContent = item.category;
        productCategory.className = 'productCategory';

        const productAddToCartButton = document.createElement('button')
        productAddToCartButton.textContent = 'Add to cart' + " for " + "$";
        productAddToCartButton.setAttribute("id", "Product" + item.id);
        productAddToCartButton.addEventListener("click", () => {
            addProductToSidebar(productAddToCartButton.getAttribute("id"), item.title, item.price)
        });
        productAddToCartButton.className = 'productButton';

        const wrapper = document.getElementById('wrapper');

        productBlockRating.append(productRating);
        productBlockRating.append(productRatingValue);

        productAddToCartButton.append(productPriceValue);

        productImageFrame.append(productImage);

        productBlockTitle.append(productTitle);

        productBlockInfo.append(productBlockTitle);
        productBlockInfo.append(separateLine);
        productBlockInfo.append(description);
        productBlockInfo.append(productBlockRating);
        productBlockInfo.append(productCategory);
        productBlockInfo.append(productAddToCartButton);

        productBlock.append(productImageFrame);
        productBlock.append(productBlockInfo);

        wrapper.append(productBlock);
    })
})

const cart = {
    products: [],
    price: 0,
};

const buyButton = document.getElementById('buyButton');
const totalPrice = document.getElementById('totalPrice');

const frontProducts = [];

buyButton.addEventListener('click', ()=>{

    if (frontProducts.length > 0) {
        frontProducts.forEach(el => {
            el.remove();
        })

        cart.products = [];
        cart.price = 0;

        totalPrice.textContent = cart.price;//!!!!CRUTCH DETECTED!!!!

        alert("Thanks for purchase!");
    }
})

function addProductToSidebar(id, title, price) {
    if (cart.products[id]) {
        increaseAmount(id, price);
        return;
    }

    const product = {
        id: id,
        price: price,
        amount: 1,
    }

    cart.products[id] = product;
    cart.price += cart.products[id].price;
    cart.price = Math.round(cart.price * 100) / 100;

    const element = document.createElement('div');
    element.className = "sidebarElement";
    element.setAttribute('id', "Element" + id);

    const sidebarImgFrame = document.createElement('div');
    sidebarImgFrame.className = 'sidebarImgFrame';

    const sidebarImg = document.createElement('Img');
    sidebarImg.src = document.getElementById("Img" + id).src;
    sidebarImg.className = 'sidebarImg';

    const productNameBlock = document.createElement('div');
    productNameBlock.className = "sidebarElementInfo";

    const productName = document.createElement('h3');
    productName.textContent = "Name";

    const productNameValue = document.createElement('p');
    productNameValue.textContent = title;

    const AmountBlock = document.createElement('div');
    AmountBlock.className = "sidebarElementInfo";

    const productAmount = document.createElement('h3');
    productAmount.setAttribute("id", "Amount" + title.id)
    productAmount.textContent = "Amount";

    const productAmountBlock = document.createElement('div');
    productAmountBlock.className = "amount";

    const plusSign = document.createElement('div');
    plusSign.classList.add("sign");
    plusSign.classList.add("plus");
    plusSign.addEventListener('click', () => {
        increaseAmount(id, price);
    })

    const minusSign = document.createElement('div');
    minusSign.classList.add("sign");
    minusSign.classList.add("minus");
    minusSign.addEventListener('click', () => {
        decreaseAmount(id, price);
    })

    const productAmountValue = document.createElement('p');
    productAmountValue.className = "productNums";
    productAmountValue.setAttribute('id', "Amount" + id);
    productAmountValue.textContent = cart.products[id].amount;

    const productsPriceBlock = document.createElement('div');
    productsPriceBlock.className = "sidebarElementInfo";

    const productsPrice = document.createElement('h3');
    productsPrice.className = "sidebarLastElement";
    productsPrice.textContent = "Price:";

    const productsPriceValueBlock = document.createElement('div');
    productsPriceValueBlock.className = "productPositionPrice";

    const productsPriceValue = document.createElement('p');
    productsPriceValue.className = "productNums";
    productsPriceValue.setAttribute('id', "Price" + id);
    productsPriceValue.textContent = price;

    const sideBar = document.getElementById('sidebarProducts');

    totalPrice.textContent = cart.price;

    const dollarSign = document.createElement('p');
    dollarSign.className = "productNums";
    dollarSign.textContent = "$";

    sidebarImgFrame.append(sidebarImg);

    productAmountBlock.append(plusSign, productAmountValue, minusSign);

    AmountBlock.append(productAmount, productAmountBlock);

    productNameBlock.append(productName, productNameValue);

    productsPriceValueBlock.append(dollarSign, productsPriceValue);

    productsPriceBlock.append(productsPrice, productsPriceValueBlock);

    element.append(sidebarImgFrame, productNameBlock, AmountBlock, productsPriceBlock);

    sideBar.append(element);

    frontProducts.push(element);////!!!!CRUTCH DETECTED PT.2!!!!
}

function removeProductFromSidebar(id, price) {
    cart.price = Math.abs(Math.round((cart.price - price) * 100) / 100);
    delete cart.products[id];

    delete frontProducts.find((el) => el.getAttribute('id') === "Element" + id);

    const toRemove = document.getElementById("Element" + id);
    toRemove.remove();

    totalPrice.textContent = cart.price;
}

function increaseAmount(id, price) {
    const prodAmount = document.getElementById("Amount" + id);

    cart.price = Math.round((cart.price + price) * 100) / 100;
    cart.products[id].amount += 1;

    totalPrice.textContent = cart.price;
    prodAmount.textContent = cart.products[id].amount;
}

function decreaseAmount(id, price) {
    if(cart.products[id].amount === 1) {
        removeProductFromSidebar(id, price);
        return;
    }

    const prodAmount = document.getElementById("Amount" + id);

    cart.price = Math.round((cart.price - price) * 100) / 100;
    cart.products[id].amount -= 1;

    totalPrice.textContent = cart.price;
    prodAmount.textContent = cart.products[id].amount;
}