function startAnim() {
    const fullSidebar = document.getElementById('sidebarTerritory');
    const sidebar = document.getElementById('sidebar');
    const button = document.getElementById('sidebarIcon');
    const pathToMove = -1 * sidebar.clientWidth - 2;
    console.log(pathToMove);
    console.log(fullSidebar.style.left);
    if(button.style.rotate == "270deg") {
        button.style.rotate = "90deg"
    } else {
        button.style.rotate = "270deg"
    }
    if (fullSidebar.style.left == pathToMove + "px") {
        fullSidebar.style.left = "0"
        console.log('did');
    } else if(fullSidebar.style.left = "0") {
        fullSidebar.style.left = pathToMove + "px";
        console.log('ddd');
    }
}

async function getProducts() {
    return (await fetch('https://fakestoreapi.com/products')).json();
}

getProducts().then(products => {
    products.forEach((item) => {
        console.log(item);
        const productBlock = document.createElement('div');
        const productImageFrame = document.createElement('div');
        const productImage = document.createElement('img');
        const seperateLine = document.createElement('hr');
        const productBlockInfo = document.createElement('div');
        const productTitle = document.createElement('h3');
        const productBlockPrice = document.createElement('div');
        const productPrice = document.createElement('p');
        const productPriceValue = document.createElement('p');
        const productBlockRating = document.createElement('div');
        const productRating = document.createElement('p');
        const productRatingValue = document.createElement('p');
        const productCategory = document.createElement('p');
        const wrapper = document.getElementById('products');

        productImage.src = item['image'];
        productTitle.textContent = item['title'];
        productPrice.textContent = 'Price: ';
        productPriceValue.textContent = '$' + item['price'];
        productRating.textContent = 'Rating: ';
        productRatingValue.textContent = item['rating']['rate'] + '/5';
        productCategory.textContent = item['category']

        productBlock.className = 'product';
        productImageFrame.className = 'productFrame';
        productImage.className = 'productImg';
        productBlockInfo.className = 'productInfo';
        productTitle.className = 'productTitle';
        productBlockPrice.className = 'productPrice';
        productBlockRating.className = 'productRating';
        productCategory.className = 'productCategory';


        productBlockRating.append(productRating);
        productBlockRating.append(productRatingValue);

        productBlockPrice.append(productPrice);
        productBlockPrice.append(productPriceValue);

        productImageFrame.append(productImage);

        productBlockInfo.append(productTitle);
        productBlockInfo.append(seperateLine);
        productBlockInfo.append(productBlockPrice);
        productBlockInfo.append(productBlockRating);
        productBlockInfo.append(productCategory);

        productBlock.append(productImageFrame);
        productBlock.append(productBlockInfo);

        wrapper.append(productBlock);
    })
})