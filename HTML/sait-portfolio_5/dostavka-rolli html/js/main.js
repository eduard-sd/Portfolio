const ItemsObj = [
    {id: 1,title: 'Калифорния темпура',counter: 0,counterInCart: 0,price: 300,piecesInBox: 6,weight: 180,img: 'california-tempura.jpg',},
    {id: 2,title: 'Запеченый ролл «Калифорния»',counter: 0,counterInCart: 0,price: 350,piecesInBox: 6,weight: 180,img: 'zapech-california.jpg',},
    {id: 3,title: 'Филадельфия',counter: 0,counterInCart: 0,price: 340,piecesInBox: 6,weight: 180,img: 'philadelphia.jpg',},
    {id: 4,title: 'Филадельфия хит ролл',counter: 0,counterInCart: 0,price: 330,piecesInBox: 6,weight: 180,img: 'california-hit.jpg',}
],
	  CartObjects = [];


const State = {
    items : ItemsObj,
    cart : CartObjects,
};

/* скрытие боковой панели*/
const fullCard = document.querySelector("#fullCard");
fullCard.style.display = "none";

/*рендеринг шаблон*/
const ProductsMainContainer = document.querySelector('#productsMainContainer');
const renderItem = function (item) {
    const Markup = `<div class="col-md-6">
                    <div class="card mb-4" data-productid="${item.id}">
                        <img class="product-img" src="img/roll/${item.img}" alt="${item.title}">
                        <div class="card-body text-center">
                            <h4 class="item-title">${item.title}</h5>
                            <p><small class="text-muted">${item.piecesInBox} шт.</small></p>
                            <div class="details-wrapper">
                                <div class="items">
                                    <div class="items__control" data-click="minus">-</div>
                                    <div class="items__current" data-count>${item.counter}</div>
                                    <div class="items__control" data-click="plus">+</div>
                                </div>
    
                                <div class="price">
                                    <div class="price__weight">${item.weight}г.</div>
                                    <div class="price__currency">${item.price} ₽</div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-block btn-outline-warning" id="addToCartButton">+ в корзину</button>
                        </div>
                    </div>
            </div>
    `;
    ProductsMainContainer.insertAdjacentHTML('beforeend', Markup);
};
ItemsObj.forEach(renderItem);

/*рендеринг корзины*/
const CartFull = document.querySelector('#cartContainer');
const renderCart = (item) => {
    const MarkupFullCart = `
        <!-- cart-item  -->
        <div class="cart-item" data-productid="${item.id}">
            <div class="cart-item__top">
                <div class="cart-item__img">
                    <img src="img/roll/${item.img}" alt="${item.title}">
                </div>
                <div class="cart-item__desc">
                    <div class="cart-item__title">${item.title}</div>
                    <div class="cart-item__weight">${item.piecesInBox} шт. / ${item.weight}г.</div>
                    <!-- cart-item__details -->
                    <div class="cart-item__details">
                        <div class="items items--small">
                            <div class="items__control" data-click="minus">-</div>
                            <div class="items__current" data-count>${item.counter}</div>
                            <div class="items__control" data-click="plus">+</div>
                        </div>
                        <div class="price">
                            <div class="price__currency">${item.price} ₽</div>
                        </div>
                    </div>
                    <!-- // cart-item__details -->
                </div>
            </div>
        </div>
        <!-- // cart-item  -->    
    `;
    CartFull.insertAdjacentHTML("afterbegin", MarkupFullCart);
};

/*обновление видимой части на странице*/
function viewUpdate(selector, targetId, counter) {
	let viewUpdate = selector.querySelector('[data-productid ="' + targetId + '"] [data-count]');
	viewUpdate.innerHTML = counter;
};

/*счетчик количества товара на сранице*/
const ItemCounterUpdate = function itemsUpdateCounter(targetId, act) {
    const itemIndex = ItemsObj.findIndex(x => x.id === targetId);

    if (act === 'minus' && ItemsObj[itemIndex].counter > 0) {
        ItemsObj[itemIndex].counter -= 1;
		viewUpdate (ProductsMainContainer,targetId,ItemsObj[itemIndex].counter);
    }
    if (act === 'plus') {
        ItemsObj[itemIndex].counter += 1;
		viewUpdate (ProductsMainContainer,targetId,ItemsObj[itemIndex].counter);
    }
};

/*отслеживание события нажатия на клавишу + или - */
ProductsMainContainer.addEventListener('click', (e) => {
    const Id = e.target.closest('[data-productid]').dataset.productid;
    if (e.target.matches('[data-click="minus"]')){
        ItemCounterUpdate(parseInt(Id), 'minus');
    }
    if (e.target.matches('[data-click="plus"]')){
        ItemCounterUpdate(parseInt(Id), 'plus');
    }
    if (e.target.matches('#addToCartButton')){
        let state = AddItemInCart(parseInt(Id));
    }
});


/*отслеживание события нажатия на клавишу добавить в корзину */
const AddItemInCart = (targetId) => {
    let itemIndex = ItemsObj.findIndex(x => x.id === targetId);
    let checkItemInCart = CartObjects.includes(ItemsObj[itemIndex]);
 
	if (!checkItemInCart && ItemsObj[itemIndex].counter > 0) {
        CartObjects.push(ItemsObj[itemIndex]);
        ShowEmptyCart();
		let itemIndexInCart = CartObjects.findIndex(x => x.id === targetId);
		renderCart(CartObjects[itemIndexInCart]);
    }
	
	let itemIndexInCart = CartObjects.findIndex(x => x.id === targetId);
    CartObjects[itemIndexInCart].counterInCart += ItemsObj[itemIndex].counter;

	viewUpdate (fullCard,targetId,CartObjects[itemIndexInCart].counterInCart);
    ItemsObj[itemIndex].counter = 0;
	viewUpdate (ProductsMainContainer,targetId,ItemsObj[itemIndex].counter)
};

//скрытие или открытие корзины
const ShowEmptyCart = () => {
    const emptyCart = document.querySelector("#emptyCart");
    (CartObjects.length === 0) ? emptyCart.style.display = "block" : emptyCart.style.display = "none";

    const fullCard = document.querySelector("#fullCard");
    (CartObjects.length === 0) ? fullCard.style.display = "none" : fullCard.style.display = "block";
};



/*счетчик количества товара в корзине*/
const CartCounterUpdate = (targetId, action) => {
    const itemIndex = CartObjects.findIndex(x => x.id === targetId);	
	//удаление из корзины видимого элемента
	const RemoveItemFromCart = (targetId) => {
			let itemFotRemove = fullCard.querySelector('[data-productid ="' + targetId + '"]');
			itemFotRemove.remove();
	};
    if (action === 'minus') {
        if (CartObjects[itemIndex].counterInCart > 0) {
            CartObjects[itemIndex].counterInCart -= 1;
			viewUpdate (fullCard,targetId,CartObjects[itemIndex].counterInCart);
        }
        if (CartObjects[itemIndex].counterInCart === 0) {
            CartObjects.splice(itemIndex, 1);
            RemoveItemFromCart(targetId);
            ShowEmptyCart();
        }
    }
    if (action === 'plus') {
		CartObjects[itemIndex].counterInCart += 1;
		viewUpdate (fullCard,targetId,CartObjects[itemIndex].counterInCart);
    }
};

/*отслеживание события в корзине */
fullCard.addEventListener('click', (event) => {
   const Id = event.target.closest('[data-productid]').dataset.productid;
    if (event.target.matches('[data-click="minus"]')){
        CartCounterUpdate(parseInt(Id), 'minus');
    }
    if (event.target.matches('[data-click="plus"]')){
        CartCounterUpdate(parseInt(Id), 'plus');
    }
});
