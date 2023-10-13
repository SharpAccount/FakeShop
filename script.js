function startAnim() {
        const fullSidebar = document.getElementById('sidebarTerritory');
        const sidebar = document.getElementById('sidebar');
        const button = document.getElementById('sidebarIcon');
        const pathToMove = -1 * sidebar.clientWidth - 2;
        const sideBarPosition = fullSidebar.getBoundingClientRect();
        if (sideBarPosition.left === pathToMove) {
            button.style.rotate = "90deg"
            fullSidebar.style.left = "0" + "px";
        } else if(sideBarPosition.left === 0) {
        const sidebarposition = fullSidebar.getBoundingClientRect();
        if (sidebarposition.left === pathToMove) {
            button.style.rotate = "90deg"
            fullSidebar.style.left = "0" + "px";
        } else if(sidebarposition.left === 0) {
            button.style.rotate = "270deg"
            fullSidebar.style.left = pathToMove + "px";
        }
    }
}

let idCount = 0;
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
        const seperateLine = document.createElement('hr');
        const description = document.createElement('p');
        const productBlockPrice = document.createElement('div');
        //const productPrice = document.createElement('p');
        //const productPriceValue = document.createElement('p');
        const productBlockRating = document.createElement('div');
        const productRating = document.createElement('p');
        const productRatingValue = document.createElement('p');
        const productCategory = document.createElement('p');
        const productAddToCartButton = document.createElement('button')
        const wrapper = document.getElementById('products');

        productImage.src = item['image'];
        productTitle.textContent = item['title'];
        description.textContent = item['description'];
        //productPrice.textContent = 'Price: ';
        //productPriceValue.textContent = '$' + item['price'];
        productRating.textContent = 'Rating: ';
        productRatingValue.textContent = item['rating']['rate'] + '/5';
        productCategory.textContent = item['category']
        productAddToCartButton.textContent = 'Add to cart' + " for " + "$" + item['price'];

        productAddToCartButton.setAttribute("data-number", idCount + "");
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

        //productBlockPrice.append(productPrice);
        //productBlockPrice.append(productPriceValue);

        productImageFrame.append(productImage);
        productBlockTitle.append(productTitle);

        productBlockInfo.append(productBlockTitle);
        productBlockInfo.append(seperateLine);
        productBlockInfo.append(description);
        productBlockInfo.append(productBlockPrice);
        productBlockInfo.append(productBlockRating);
        productBlockInfo.append(productCategory);
        productBlockInfo.append(productAddToCartButton);

        productBlock.append(productImageFrame);
        productBlock.append(productBlockInfo);

        wrapper.append(productBlock);

        idCount++;
    })
})

let cart = {};
let cartPrice = 0;
function addProductToSidebar(id, title, price) {
    if (cart[id] > 0) {
        increaseAmount(id);
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
    const productsPriceValue = document.createElement('p');
    const sideBar = document.getElementById('sidebarProducts');
    const totalPrice = document.getElementById('totalPrice');

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
    productsPrice.className = "sidebarLastElement";
    productsPriceValue.className = "productNums";
    Element.className = "sidebarElement";

    productAmountValue.setAttribute('data-number', id + "");
    productsPriceValue.setAttribute('data-number', id + "");

    productName.textContent = "Name";
    productNameValue.textContent = title;
    productAmount.textContent = "Amount";
    productAmountValue.textContent = cart[id];
    productsPrice.textContent = "Price:";
    productsPriceValue.textContent = "$" + price;
    totalPrice.textContent = cartPrice;

    productAmountBlock.append(plusSign, productAmountValue, minusSign);
    AmountBlock.append(productAmount, productAmountBlock);

    productNameBlock.append(productName, productNameValue);

    productsPriceBlock.append(productsPrice, productsPriceValue);

    Element.append(productNameBlock, AmountBlock, productsPriceBlock);
    sideBar.append(Element);

}
function increaseAmount(_id) {
    const amount = document.querySelector('[data-number=_id]');
    const price = document.querySelector('[data-number=_id]');
    console.log(_id);
    console.log(amount);
    console.log(price);

    amount.textContent = (parseInt(amount.textContent) + 1).toString();
    price.textContent = ((parseInt(amount.textContent) / parseInt(amount.textContent)) + parseInt(amount.textContent)) + "";

}
