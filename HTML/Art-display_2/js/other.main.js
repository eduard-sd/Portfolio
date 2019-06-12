"use strict";
const Museums = [
    {
        id: '1',
        lang: ['en','ru'],
        img: './img/800px-Bode_Museum.jpg',
        title: ['Bode Museum','Музей Боде'],
        text: ['Some quick example text','Небольшой абзац текста'],
        buttonText: ['Add review','Оставить отзыв']
    },{
        id: '2',
        lang: ['en','ru'],
        img: './img/800px-British_Museum_from_NE_2.jpg',
        title: ['British Museum','Британский Музей'],
        text: ['Some quick example text','Небольшой абзац текста'],
        buttonText: ['Add review','Оставить отзыв']
    },{
        id: '3',
        lang: ['en','ru'],
        img: './img/Louvre_at_night_centered.jpg',
        title: ['Louvre','Лувр'],
        text: ['Some quick example text','Небольшой абзац текста'],
        buttonText: ['Add review','Оставить отзыв']
    },{
        id: '4',
        lang: ['en','ru'],
        img: './img/Uffizi_Gallery,_Florence.jpg',
        title: ['Uffizi Gallery','Галерея Юффизи'],
        text: ['Some quick example text','Небольшой абзац текста'],
        buttonText: ['Add review','Оставить отзыв']
    },{
        id: '5',
        lang: ['en','ru'],
        img: './img/State_Historical_Museum,_Moscow,_Russia.jpg',
        title: ['State Historical Museum','Национальный Музей'],
        text: ['Some quick example text','Небольшой абзац текста'],
        buttonText: ['Add review','Оставить отзыв']
    },
];

const Text = {
    header_h1: ['Review book','Книга отзывов'],
    header_h2: ['Please select the museum','Пожалуйста выберите музей']
};

const modal = document.querySelector('.modal');

const openModal = function () {
    modal.style.display = 'block';
};

const closeModal = function () {
    modal.style.display = 'none';
};

const frame = document.querySelector('#frame');
modal.addEventListener('click', function (event) {
   if (event.target === modal) {
       closeModal();
       clearTextField();
   }
});

//reder cards and header text
const headerText = document.querySelector('.header-text'),
      container = document.querySelector('.container');
const renderCards = function(museums, index) {
    for (let i = 0; i < museums.length; i++) {
        let card = `
        <div class="card" style="width: 18rem;">
        <img src="${museums[i].img}" class="card-img-top" intrinsicsize  alt="${museums[i].title[index]}">
        <div class="card-body">
          <h5 class="card-title">${museums[i].title[index]}</h5>
          <p class="card-text">${museums[i].text[index]}...</p>
          <a href="#" class="btn btn-primary review" data-id="${museums[i].id}">${museums[i].buttonText[index]}</a>
        </div>
      </div>
  `;
        container.insertAdjacentHTML('beforeend', card);

        let button = document.querySelectorAll('.review');
        button.forEach(key => {
            key.onclick = (e) => {
                e.stopPropagation();
                openModal();
            }
        });
    }

    let renderText = `
          <h1>${Text.header_h1[index]}</h1>
          <h2>${Text.header_h2[index]}</h2>
    `;
    headerText.innerHTML = renderText;
};


//reder cards and header text after page load
const language = document.querySelector('.language-select');
document.addEventListener("DOMContentLoaded", function(event) {
    let el = document.querySelector('#inputGroupSelect01');
    renderCards(Museums, el.options[el.selectedIndex].value);
    console.log(el.options[el.selectedIndex].value);

    language.onchange = () => {
        container.innerHTML = '';
        renderCards(Museums, el.options[el.selectedIndex].value);
    }
});





const contentButton = document.querySelector(".content__button"),
      textField = document.querySelector(".textarea"),
      keyboard = document.querySelectorAll(".screen-keyboard__key");

function clearTextField() {
    textField.value = '';
}


//проверка поля на текст
function checkField(){
    if(textField.value.length) {
        contentButton.removeAttribute("disabled")
    } else {
        contentButton.setAttribute("disabled", "disabled");
    }
}

checkField();


//проверка поля на текст при вводе с  экранной клавиатуры
keyboard.forEach(key => {
    key.addEventListener("click",()=>{
        checkField();
    })
});

//проверка поля на текст при вводе с клавиатуры
textField.onchange = () => {
    checkField()
};

// отправка текстовых данных в файл
contentButton.onclick = () => {

    const fs = require('fs-extra');


// Data which will write in a file.
    let data = textField.value;

// Write data in 'Output.txt' .
    fs.writeFile('review.txt', data, (err) => {

        // In case of a error throw err.
        if (err) throw err;
    })
};
