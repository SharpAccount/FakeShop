function startAnim() {
        const fullSidebar = document.getElementById('sidebarTerritory');
        const sidebar = document.getElementById('sidebar');
        const button = document.getElementById('sidebarIcon');
        const pathToMove = -1 * sidebar.clientWidth - 2;
        const sideBarPosition = fullSidebar.getBoundingClientRect();
        console.log(fullSidebar);
    console.log(sidebar);
    console.log(button);
    console.log(pathToMove);
    console.log(sideBarPosition);
        if (sideBarPosition.left === pathToMove) {
            button.style.rotate = "90deg"
            fullSidebar.style.left = "0";
            console.log('did1');
        } else if(sideBarPosition.left === 0) {
            button.style.rotate = "270deg"
            fullSidebar.style.left = pathToMove + "px";
            console.log('did2');
        }
}

async function getProducts() {
    return (await fetch('https://fakestoreapi.com/products')).json();
}

getProducts().then(products => {
    products.forEach((item) => {
        const productBlock = document.createElement('div');
        const productImageFrame = document.createElement('div');
        const productImage = document.createElement('img');
        const productBlockInfo = document.createElement('div');
        const productBlockTitle = document.createElement('div');
        const productTitle = document.createElement('h3');
        const separateLine = document.createElement('hr');
        const description = document.createElement('p');
        const productBlockPrice = document.createElement('div');
        const productPriceValue = document.createElement('p');
        const productBlockRating = document.createElement('div');
        const productRating = document.createElement('p');
        const productRatingValue = document.createElement('p');
        const productCategory = document.createElement('p');
        const productAddToCartButton = document.createElement('button')
        const wrapper = document.getElementById('products');

        productImage.src = item['image'];
        productTitle.textContent = item['title'];
        description.textContent = item['description'];
        productRating.textContent = 'Rating: ';
        productRatingValue.textContent = item['rating']['rate'] + '/5';
        productCategory.textContent = item['category']
        productAddToCartButton.textContent = 'Add to cart' + " for " + "$";
        productPriceValue.textContent = item['price']

        productAddToCartButton.setAttribute("data-number", item["id"]);
        productPriceValue.setAttribute("data-number", "0" + item["id"]);

        productAddToCartButton.addEventListener("click", () => {
            addProductToSidebar(productAddToCartButton.getAttribute("data-number"), item['title'], item['price'])
        });

        productBlock.className = 'product';
        productImageFrame.className = 'productFrame';
        productImage.className = 'productImg';
        productBlockInfo.className = 'productInfo';
        productBlockTitle.className = 'productTitleBlock';
        productTitle.className = 'productTitle';
        description.className = 'productDescr';
        productBlockPrice.className = 'productPrice';
        productBlockRating.className = 'productRating';
        productCategory.className = 'productCategory';
        productAddToCartButton.className = 'productButton';

        productBlockRating.append(productRating);
        productBlockRating.append(productRatingValue);

        productAddToCartButton.append(productPriceValue);

        productImageFrame.append(productImage);
        productBlockTitle.append(productTitle);

        productBlockInfo.append(productBlockTitle);
        productBlockInfo.append(separateLine);
        productBlockInfo.append(description);
        productBlockInfo.append(productBlockPrice);
        productBlockInfo.append(productBlockRating);
        productBlockInfo.append(productCategory);
        productBlockInfo.append(productAddToCartButton);

        productBlock.append(productImageFrame);
        productBlock.append(productBlockInfo);

        wrapper.append(productBlock);

    })
})

let cart = {};
let cartPrice = 0;
const buyButton = document.getElementById('buyButton');

buyButton.addEventListener('click', ()=>{
    if(Object.keys(cart).length > 0) {
        for(let i = 0; i < Object.keys(cart).length; i+=0) {
            removeProductFromSidebar(Object.keys(cart)[i], returnAmountPriceTotal(2, Object.keys(cart)[i]).textContent);
        }
        alert("Thanks for purchase!");
    }
})

function addProductToSidebar(id, title, price) {

    if (cart[id] > 0) {
        increaseAmount(id, price);
        return;
    }

    cart[id] = 1;
    cartPrice += price;

    const Element = document.createElement('div');
    const sideBarProduct = document.createElement('div');
    const productNameBlock = document.createElement('div');
    const productName = document.createElement('h3');
    const productNameValue = document.createElement('p');
    const AmountBlock = document.createElement('div');
    const productAmount = document.createElement('h3');
    const productAmountBlock = document.createElement('div');
    const plusSign = document.createElement('div');
    const productAmountValue = document.createElement('p');
    const minusSign = document.createElement('div');
    const productsPriceBlock = document.createElement('div');
    const productsPrice = document.createElement('h3');
    const productsPriceValueBlock = document.createElement('div');
    const productsPriceValue = document.createElement('p');
    const sideBar = document.getElementById('sidebarProducts');
    const totalPrice = document.getElementById('totalPrice');
    const dollarSign = document.createElement('p');

    sideBarProduct.className = "sidebarElement";
    productNameBlock.className = "sidebarElementInfo";
    AmountBlock.className = "sidebarElementInfo"
    productAmountBlock.className = "amount";
    plusSign.classList.add("sign");
    plusSign.classList.add("plus");
    productAmountValue.className = "productNums";
    minusSign.classList.add("sign");
    minusSign.classList.add("minus");
    productsPriceBlock.className = "sidebarElementInfo";
    productsPriceValueBlock.className = "productPositionPrice";
    productsPrice.className = "sidebarLastElement";
    dollarSign.className = "productNums";
    productsPriceValue.className = "productNums";
    Element.className = "sidebarElement";

    dollarSign.textContent = "$";

    productAmountValue.setAttribute('data-number', "" + id);
    productsPriceValue.setAttribute('data-number', "P0" + id);
    Element.setAttribute('data-number', "00" + id);

    plusSign.addEventListener('click', () => {
        increaseAmount(id, price);
    })
    minusSign.addEventListener('click', () => {
        decreaseAmount(id, price);
    })


    productName.textContent = "Name";
    productNameValue.textContent = title;
    productAmount.textContent = "Amount";
    productAmountValue.textContent = cart[id];
    productsPrice.textContent = "Price:";
    productsPriceValue.textContent = price.toFixed(2);
    totalPrice.textContent = cartPrice.toFixed(2);

    productAmountBlock.append(plusSign, productAmountValue, minusSign);
    AmountBlock.append(productAmount, productAmountBlock);

    productNameBlock.append(productName, productNameValue);

    productsPriceValueBlock.append(dollarSign, productsPriceValue);

    productsPriceBlock.append(productsPrice, productsPriceValueBlock);

    Element.append(productNameBlock, AmountBlock, productsPriceBlock);
    sideBar.append(Element);

}
function removeProductFromSidebar(id, price) {

    cartPrice = Math.abs(cartPrice - price);
    delete cart[id];

    returnAmountPriceTotal(3, id).textContent = (cartPrice).toFixed(2);

    returnAmountPriceTotal(4, id).remove();
}
function increaseAmount(_id, _price) {

    returnAmountPriceTotal(1, _id).textContent = (parseInt(returnAmountPriceTotal(1, _id).textContent) + 1).toString();
    returnAmountPriceTotal(2, _id).textContent = ((Math.round((parseFloat(returnAmountPriceTotal(2, _id).textContent) + _price) * 100)) / 100).toFixed(2);
    cartPrice = Math.round((cartPrice + _price) * 100) / 100;

    returnAmountPriceTotal(3, _id).textContent = (cartPrice).toFixed(2);
}
function decreaseAmount(_id, _price) {

    if((parseInt(returnAmountPriceTotal(1, _id).textContent) - 1) === 0) {
        removeProductFromSidebar(_id, _price);
        return;
    }

    returnAmountPriceTotal(1, _id).textContent = (parseInt(returnAmountPriceTotal(1, _id).textContent) - 1).toString();
    returnAmountPriceTotal(2, _id).textContent = ((Math.round((parseFloat(returnAmountPriceTotal(2, _id).textContent) - _price) * 100)) / 100).toFixed(2);
    cartPrice = Math.round((cartPrice - _price) * 100) / 100;

    returnAmountPriceTotal(3, _id).textContent = (cartPrice).toFixed(2);
}
function returnAmountPriceTotal(elem, index) {
    if (elem === 1) return document.querySelector('[data-number="'+ index +'"]');
    if (elem === 2) return document.querySelector('[data-number="'+ "P0" + index +'"]');
    if (elem === 4) return document.querySelector('[data-number="'+ "00" + index +'"]');
    if (elem === 3) return document.getElementById('totalPrice');
}