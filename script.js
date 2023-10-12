function startAnim() {
    const fullSidebar = document.getElementById('sidebarTerritory');
    const sidebar = document.getElementById('sidebar');
    const button = document.getElementById('sidebarIcon');
    const pathToMove = -1 * sidebar.clientWidth - 2;
    const sidebarposition = fullSidebar.getBoundingClientRect();
    if (sidebarposition.left === pathToMove) {
        button.style.rotate = "90deg"
        fullSidebar.style.left = "0" + "px";
    } else if(sidebarposition.left === 0) {
        button.style.rotate = "270deg"
        fullSidebar.style.left = pathToMove + "px";
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
    })
})
function addRemoveFromSidebar() {
    console.log('dsf');
}
const button = document.getElementsByClassName(productButton);
button.forEach((purshbutton) => {
    purshbutton.addEventListener("click", () => {
        console.log('dsa');
    });
})