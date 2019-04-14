const Items = [
    {
        id: 1,
        title: 'Калифорния темпура',
        counter: 0,
        price: 300,
        piecesInBox: 6,
        weight: 180,
        img: 'california-tempura.jpg',
    },
    {
        id: 2,
        title: 'Запеченый ролл «Калифорния»',
        counter: 0,
        price: 350,
        piecesInBox: 6,
        weight: 180,
        img: 'zapech-california.jpg',
    },
    {
        id: 3,
        title: 'Филадельфия',
        counter: 0,
        price: 340,
        piecesInBox: 6,
        weight: 180,
        img: 'philadelphia.jpg',
    },
    {
        id: 4,
        title: 'Филадельфия хит ролл',
        counter: 0,
        price: 330,
        piecesInBox: 6,
        weight: 180,
        img: 'california-hit.jpg',
    }
],
	  Cart = [];
const State = {
    items : Items,
    cart : Cart,
};
const ProductsMainContainer = document.querySelector('#productsMainContainer');

/*рендеринг шаблон*/
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
Items.forEach(renderItem);

/* скрытие боковой панели*/
const fullCard = document.querySelector("#fullCard");
fullCard.style.display = "none";

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

/*обновление количества на странице HTML*/
const ItemCounterUpdate = function itemsUpdateCounter(targetId, act) {
    const itemIndex = State.items.findIndex(x => x.id === targetId);
    let count = State.items[itemIndex].counter;

    const itemViewCounterUpdate = () => {
        State.items[itemIndex].counter = count;
        let itemViewCounterUpdate = ProductsMainContainer.querySelector('[data-productid ="' + targetId + '"] [data-count]');
        itemViewCounterUpdate.innerHTML = count;
    };
    const setCounterZero = () => {
        State.items[itemIndex].counter = 0;
        let itemViewCounterUpdate = ProductsMainContainer.querySelector('[data-productid ="' + targetId + '"] [data-count]');
        itemViewCounterUpdate.innerHTML = 0;
    };

    if (act === 'minus' && count > 0) {
        count -= 1;
        itemViewCounterUpdate();
    }
    if (act === 'plus') {
        count += 1;
        itemViewCounterUpdate();
    }
    if (act === 'button') {
        setCounterZero();
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
        //передать count в корзину

        ItemCounterUpdate(parseInt(Id), 'button');
    }
});


// 1 не павильно добавляет количество
// 2 дублирует карточки ролов  решение удаление всего дочернего элемента или вставка по индексу если элемент уже вставлен
// 3 удаление
// 4 обновлять количество в корзине
// 5 обнулять количество после нажания кнопку

/*отслеживание события нажатия на клавишу добавить в корзину */
const AddItemInCart = (targetId) => {
	
    const itemIndex2 = State.items.findIndex(x => x.id === targetId);
    let checkItemInCart = Cart.includes(State.items[itemIndex2]);
    let itemsCounter = State.items[itemIndex2].counter;// получем количество выбранного товара
	console.log(Cart[itemIndexInCart].counter);
	
    if (!checkItemInCart) {
        Cart.push(State.items[itemIndex2]);
        ShowEmptyCart();
        let itemIndexInCart = Cart.findIndex(x => x.id === targetId);
        for (let i = 0; i < Cart.length; i++) {
            if ( i === itemIndexInCart) {
                renderCart(Cart[i]);
            }
        }
        Cart[itemIndexInCart].counter = 0;
    }
    let itemIndexInCart = Cart.findIndex(x => x.id === targetId);
    Cart[itemIndexInCart].counter += itemsCounter;
    let cartViewCounterUpdate = fullCard.querySelector('[data-productid ="' + targetId + '"] [data-count]');
    console.log(Cart[itemIndexInCart].counter);
    cartViewCounterUpdate.innerHTML = Cart[itemIndexInCart].counter;

    // State.items[itemIndex2].counter = 0;
};

const ShowEmptyCart = () => {
    const emptyCart = document.querySelector("#emptyCart");
    (Cart.length === 0) ? emptyCart.style.display = "block" : emptyCart.style.display = "none";

    const fullCard = document.querySelector("#fullCard");
    (Cart.length === 0) ? fullCard.style.display = "none" : fullCard.style.display = "block";
};


const RemoveItemFromCart = (targetId) => {
        let itemFotRemove = fullCard.querySelector('[data-productid ="' + targetId + '"]');
        itemFotRemove.remove();
};


const CartCounterUpdate = (targetId, action) => {
    const itemIndex = Cart.findIndex(x => x.id === targetId);
    let count = Cart[itemIndex].counter;

    const CartViewCounterUpdate = () => {
        Cart[itemIndex].counter = count;
        let cartViewCounterUpdate = fullCard.querySelector('[data-productid ="' + targetId + '"] [data-count]');
        cartViewCounterUpdate.innerHTML = count;
    };

    if (action === 'minus') {
        if (count > 0) {
            count -= 1;
            CartViewCounterUpdate();
        }
        if (count === 0) {
            Cart.splice(itemIndex, 1);

            RemoveItemFromCart(targetId);
            ShowEmptyCart();
        }
    }
    if (action === 'plus') {
        count += 1;
        CartViewCounterUpdate();
    }
};

fullCard.addEventListener('click', (event) => {
    const Id = event.target.closest('[data-productid]').dataset.productid;
    if (event.target.matches('[data-click="minus"]')){
        CartCounterUpdate(parseInt(Id), 'minus');
    }
    if (event.target.matches('[data-click="plus"]')){
        CartCounterUpdate(parseInt(Id), 'plus');
    }
});