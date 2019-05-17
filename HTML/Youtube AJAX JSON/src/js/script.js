"use strict"
const switcher = document.querySelector('#cbx'),
      more = document.querySelector('.more'),
      modal = document.querySelector('.modal'),
      videos = document.querySelectorAll('.videos__item');

let player;

const bindSlideToggle = (trigger, boxBody, content, openClass) =>{
    let button = {
        'element' : document.querySelector(trigger),
        'active' : false,
    };
    const box = document.querySelector(boxBody), //
          boxContent = document.querySelector(content);//

    button.element.addEventListener('click', () => {
        if (!button.active) {
            button.active = true;
            box.style.height = boxContent.clientHeight + 'px';
            box.classList.add(openClass); // ищет доступные классы и добавляет класс
        } else {
            button.active = false;
            box.style.height = 0 + 'px';
            box.classList.remove(openClass);
        }
    })
};

bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

function switchMode() { //switcher dark/light
    if (night === false) {
        document.body.classList.add('night');
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#fff';
        });
        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = "#fff";
        });
        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = "#fff";
        });
        document.querySelector('.header__item-descr').style.color = "#fff";
        document.querySelector('.logo img').src = "logo/youtube_night.svg";

        night = true;
    } else {
        document.body.classList.remove('night');

        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#000';
        });
        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = "#000";
        });
        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = "#000";
        });
        document.querySelector('.header__item-descr').style.color = "#000";
        night = false;
        document.querySelector('.logo img').src = "logo/youtube.svg";
    }
}

let night = false;
switcher.addEventListener('change', () => {switchMode()});


// const data = [
//     ['img/thumb_3.webp',
//         'img/thumb_4.webp',
//         'img/thumb_5.webp'],
//     ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
//         '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2',
//         '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'],
//     ['3,6 ​тыс. просмотров',
//         '4,2 тыс. просмотров',
//         '28 тыс. просмотров'],
//     ['X9SmcY3lM-U',
//         '7BvHoh0BrMw',
//         'mC8JW_aG2EM']
// ];


// more.addEventListener('click', ()=> {
//     const videosWrapper =  document.querySelector('.videos__wrapper');//video block
//     more.remove();
//
//     for (let i = 0; i < data[0].length ; i++) {
//         let card = document.createElement('a');
//         card.classList.add('videos__item', 'videos__item-active');
//         card.setAttribute('data-url',data[3][i]);
//         card.insertAdjacentHTML('afterbegin',`
//             <img src="${data[0][i]}" alt="thumb">
//             <div class="videos__item-descr">
//                 ${data[1][i]}
//             </div>
//             <div class="videos__item-views">
//                     ${data[2][i]}
//             </div>
//         `);
//         videosWrapper.appendChild(card);
//         bindModal(card);
//
//         setTimeout(() => { //callback function
//             card.classList.remove('videos__item-active');
//         }, 10);
//     }
//
//     let button = document.createElement('button');
//     button.classList.add('more');
//     button.innerText = 'Загрузить еще';
//     videosWrapper.appendChild(button);
//
//     slice('.videos__item-descr',100);//обрезание title
//     if(night) {
//         night = false;
//         switchMode();
//     }
//
// }) ;

function slice(selector, count) {
    document.querySelectorAll(selector).forEach(item => {
        item.textContent.trim();
        if (item.textContent.length > count+1) {
            item.textContent = item.textContent.slice(0, 101).trim() + "...";
        }
    })

}

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function bindModalOnPage(cards) {
    cards.forEach(elem => {
        elem.addEventListener('click', function (event) {
            event.preventDefault();
            const id = elem.getAttribute('data-url');
            loadVideo(id);
            openModal();
        })
    })
}
bindModalOnPage(videos);

function bindModal(card) {
    card.addEventListener('click', function (event) {
            event.preventDefault();
            const id = card.getAttribute('data-url');
            loadVideo(id);
            openModal();
    })
}

modal.addEventListener('click', function (event) {
    const frame = document.querySelector('#frame');
    if(event.target !== frame) {
        stopVideo();
        closeModal()
    }
});

// 2. This code loads the IFrame Player API code asynchronously.
 function createVideo() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
     setTimeout(function () {
         player =  new YT.Player('frame', {
             height: "100%",
             width: "100%",
             videoId: 'M7lc1UVf-VE',
         });
     }, 500)

}
createVideo();


function loadVideo(id) {
    player.loadVideoById({'videoId':`${id}`});
}

function stopVideo() {
    player.stopVideo();
}

function load () {
    gapi.client.init({
        'apiKey': 'AIzaSyDG_6jmtg3jJzCT5QbtvTkMAYRqQ0IZnNM',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    }).then(function() {
        return gapi.client.youtube.playlistItems.list({
            "part": "snippet,contentDetails",
            "maxResults": "6",
            "playlistId": "PL3Ym7KeB8QMgd1OOAQUgSHmiocL6ri-y-"
        })
    }).then(function(response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response.result);
        },
        function(err) { console.error("Execute error", err); });
}


more.addEventListener('click', ()=> {
    gapi.load("client", load);
});