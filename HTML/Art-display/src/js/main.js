"use strict";

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
