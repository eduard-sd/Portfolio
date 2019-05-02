const movieButton = document.querySelector("#movie-button");
const tagsArray = [];
const visibleMoviesList = [];
let moviesOnPageCount = 0;

const addVisibleMovies = () => {
    const movieJson =  'js/jsons/films.json';

    async function main2 (path) {
        const responce = await fetch(path);
        data = await responce.json();
        for (let i = moviesOnPageCount; i < moviesOnPageCount+8 ; i++) {
            visibleMoviesList.push(
                {
                    id : i,
                    title: data[i].title,
                    tags: data[i].tags,
                    favorite: false,
                }
            );
            renderFilm(visibleMoviesList[i]);
        }
        moviesOnPageCount += 8; // === 8 потому что старт с 0
    };

    main2(movieJson); // заполняем новый лист обьектами с id

    //рендарим обьекты на страници из личта
    const accordionFilm = document.querySelector("#accordionFilm");
    const renderFilm = function (item) {
        console.log('here');
        const  film = `<div class="card" data-movie-id="${item.id}">
                    <div class="card-header" id="heading-film-id">
                      <h5 class="mb-0 d-flex justify-content-between">
                        <button class="btn btn-link" type="button" data-title data-toggle="collapse" data-target="#collapse-film-${item.id}" aria-expanded="true" aria-controls="collapseOne">
                          ${item.title}
                        </button>
                        <label class="icons" for="card__icons-checkbox-${item.id}">
                          <input type="checkbox" class="card__icons-checkbox" id="card__icons-checkbox-${item.id}">
                          <i class="far fa-star card__checkbox-unchecked"></i>
                          <i class="fas fa-star card__checkbox-checked"></i>
                        </label>
                      </h5>
                    </div>

                    <div id="collapse-film-${item.id}" class="collapse" aria-labelledby="heading-film-${item.id}" data-parent="#accordionFilm">
                      <div class="card-body" data-description="">
                        Абзац описания фильма
                      </div>
                    </div>
                  </div>`;
        accordionFilm.insertAdjacentHTML('beforeend', film);
    };
};
const addVisibleTags = () => {
    const tagsJson =  'js/jsons/tags.json';

    async function main2 (path) {
        const responce = await fetch(path);
        data = await responce.json();
        for (let i = 0; i < data.length ; i++) {
            tagsArray.push(
                {
                    id : i,
                    title: data[i],
                    checked: false,
                }
            );
            renderTags(tagsArray[i]);
        }
    };

    main2(tagsJson); // заполняем новый лист обьектами с id

    //рендарим обьекты на страници из личта
    const tagsSelector = document.querySelector("#movie-tags");
    const renderTags = function (item) {
        console.log('here');
        const tags = `<div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox-${item.id}" value="option1">
                            <label class="form-check-label" for="inlineCheckbox-${item.id}">${item.title}</label>
                       </div>`;
        tagsSelector.insertAdjacentHTML('beforeend', tags);
    };
};

checkRefresh = () => {
    //загрузить 10 шт видео
    addVisibleMovies();

    movieButton.onclick = () => {
        addVisibleMovies();
    };

    addVisibleTags();

    const tagsArray = document.querySelectorAll("#movie-tags");

    tagsArray.forEach((elem) => {
        elem.onclick = () => {
            const Id = elem.getAttribute('datatype');
        }
    })

};

window.onbeforeunload = checkRefresh(); // в момент загрузки мы рендорим строки с  фильмами
//после нажатия на чекбокс добавляем фейворится создаем обьект в localstorage




