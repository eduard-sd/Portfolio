"use strict";

const Museums = [
    {
        id: '1',
        lang: ['en','ru'],
        img: './img/800px-Bode_Museum.jpg',
        title: ['Bode Museum','Музей Боде'],
        text: ['Some quick example text.','Небольшой абзац текста'],
    },{
        id: '2',
        lang: ['en','ru'],
        img: './img/800px-British_Museum_from_NE_2.jpg',
        title: ['British Museum','Британский Музей'],
        text: ['Some quick example text.','Небольшой абзац текста'],
    },{
        id: '3',
        lang: ['en','ru'],
        img: './img/Louvre_at_night_centered.jpg',
        title: ['Louvre','Лувр'],
        text: ['Some quick example text.','Небольшой абзац текста'],
    },{
        id: '4',
        lang: ['en','ru'],
        img: './img/Uffizi_Gallery,_Florence.jpg',
        title: ['Uffizi Gallery','Галерея Юффизи'],
        text: ['Some quick example text.','Небольшой абзац текста'],
    },{
        id: '5',
        lang: ['en','ru'],
        img: './img/State_Historical_Museum,_Moscow,_Russia.jpg',
        title: ['State Historical Museum','Национальный Музей'],
        text: ['Some quick example text.','Небольшой абзац текста'],
    },
];

const container = documen.querySelector('.container');

const renderCards = function(museum) {
  let card = `
        <div class="card" style="width: 18rem;">
        <img src="${}" class="card-img-top" intrinsicsize  alt="...">
        <div class="card-body">
          <h5 class="card-title">State Historical Museum</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-xl">Extra large modal</button>
        </div>
      </div>
  `;
};









const screenButton = document.querySelector(".screen__button"),
      contentButton = document.querySelector(".content__button"),
      textField = document.querySelector(".textarea"),
      keyboard = document.querySelectorAll(".screen-keyboard__key");

screenButton.onclick = () => {
    const content = document.querySelector(".content"),
          screenBanner = document.querySelector(".screen__banner");

    content.style.display = "block";
    screenBanner.style.display = "none";
};

function checkField(){
    if(textField.value.length) {
        contentButton.removeAttribute("disabled")
    } else {
        contentButton.setAttribute("disabled", "disabled");
    }
}

checkField();

keyboard.forEach(key => {
    key.addEventListener("click",()=>{
        checkField();
    })
});

textField.onchange = () => {
    checkField()
};

contentButton.onclick = () => {
    var blob = new Blob([`${textField.value}`],
        {type: "text/plain;charset=utf-8"});

    saveAs(blob, "newtext.txt");
};
