"use strict";

const switcher = document.querySelector('#cbx'),
      modal = document.querySelector('.modal'),
      videos = document.querySelectorAll('.videos__item'),
      videosWrapper =  document.querySelector('.videos__wrapper'),
      more = document.querySelector('.more'),
      videosButton = document.querySelector('.videos__button');
let player,
    nextPageToken = '',
    prevPageToken = '';

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
//
//     more.remove();
//
//     for (let i = 0; i < data[0].length ; i++) {
//         let card = document.createElement('a');
//         card.classList.add('videos__item', 'videos__item-active');
//         card.setAttribute('data-url',data[3][i]); //id
//         card.insertAdjacentHTML('afterbegin',`
//             <img src="${data[0][i]}" alt="thumb"> // картинка
//             <div class="videos__item-descr">
//                 ${data[1][i]} // название
//             </div>
//             <div class="videos__item-views">
//                     ${data[2][i]} // просмотры
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
            "playlistId": "PL3Ym7KeB8QMgd1OOAQUgSHmiocL6ri-y-",
            "pageToken": `${nextPageToken}`,
        })
    }).then(function(response) {
        nextPageToken = response.result.nextPageToken;

        if(response.result.items.length < 6) {
            more.remove();
        }

        response.result.items.forEach(item => {
            let card = document.createElement('a');
            card.classList.add('videos__item', 'videos__item-active');
            card.setAttribute('data-url', item.contentDetails.videoId);
            card.insertAdjacentHTML('afterbegin', `
                <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
                <div class="videos__item-descr">
                    ${item.snippet.title}
                </div>
                <div class="videos__item-views">
                        2,6 тыс. просмотров
                </div>
            `);

            videosWrapper.appendChild(card);
            bindModal(card);

            setTimeout(() => { //callback function
                card.classList.remove('videos__item-active');
            }, 10);

            slice('.videos__item-descr', 100);//обрезание title
            if (night) {
                night = false;
                switchMode();
            }
        });
    },
    function(err) { console.error("Execute error", err); });
} // мой канал


const myList = () => {gapi.load("client", load)};
more.addEventListener('click', myList);

function createButtonLoadMore() {
    let button = document.createElement('button');
    button.classList.add('more');
    button.innerText = 'Загрузить еще';
    videosButton.appendChild(button);
}

function search(target) {
    gapi.client.init({
        'apiKey': 'AIzaSyDG_6jmtg3jJzCT5QbtvTkMAYRqQ0IZnNM',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    }).then(function() {
        return gapi.client.youtube.search.list({
            'max': '10',
            "maxResults": "6",
            'part': 'snippet',
            'q': `${target}`,
            'type': '',
            "pageToken": `${nextPageToken}`,
        })
    }).then(function(response) {
        let temp = response.result.prevPageToken;

        try {
            nextPageToken = response.result.nextPageToken;

            if (response.result.prevPageToken) {
                prevPageToken = response.result.prevPageToken;
            } else {
                prevPageToken = response.result.nextPageToken;
            }

        } catch (erorr) {
            console.log(error);
        }

        if(response.result.items.length < 6) {
            more.remove();
        }

        response.result.items.forEach(item => {
            let card = document.createElement('a');
            card.classList.add('videos__item', 'videos__item-active');
            card.setAttribute('data-url', item.id.videoId);
            card.insertAdjacentHTML('afterbegin', `
                <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
                <div class="videos__item-descr">
                    ${item.snippet.title}
                </div>
                <div class="videos__item-views">
                        2,6 тыс. просмотров
                </div>
            `);

            videosWrapper.appendChild(card);
            bindModal(card);

            setTimeout(() => { //callback function
                card.classList.remove('videos__item-active');
            }, 10);

            slice('.videos__item-descr', 100);//обрезание title
            if (night) {
                night = false;
                switchMode();
            }
        });
    })
} // поиск по ютубу

document.querySelector('.search').addEventListener('submit', (e) => {
    e.preventDefault();
    gapi.load("client", () => { search(document.querySelector('.search > input').value) });

    videosWrapper.innerHTML = '';

    more.removeEventListener('click', myList);
    more.addEventListener('click', () => {
        gapi.load("client", () => { search(document.querySelector('.search > input').value) });
    });
});
