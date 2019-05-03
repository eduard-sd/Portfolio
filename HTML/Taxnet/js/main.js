const movieButton = document.querySelector("#movie-button");
const tagsArray = [];
const visibleMoviesList = [];
const favoriteVisibleMoviesList = [];
let moviesOnPageCount = 0;
const mainMovieField = document.querySelectorAll("#accordionFilm");
const accordionFavorite = document.querySelector("#accordionFavorite");

const addVisibleMovies = () => {
    const movieJson =  'js/jsons/films.json';

    async function main2 (path) {
        const responce = await fetch(path);
        data = await responce.json();
        for (let i = moviesOnPageCount; i < moviesOnPageCount+15 ; i++) {
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
        moviesOnPageCount += 15; // === 8 потому что старт с 0
    };

    main2(movieJson); // заполняем новый лист обьектами с id

    //рендарим обьекты на страници из личта
    const accordionFilm = document.querySelector("#accordionFilm");
    const renderFilm = function (item) {
        console.log('here');
        const  film = `<div class="card" data-movieid="${item.id}">
                    <div class="card-header" id="heading-film-id">
                      <h5 class="mb-0 d-flex justify-content-between">
                        <button class="btn btn-link" type="button" data-title data-toggle="collapse" data-target="#collapse-film-${item.id}" aria-expanded="true" aria-controls="collapseOne">
                          ${item.title}
                        </button>
                        <label class="icons" for="card__icons-checkbox-${item.id}">
                          <input type="checkbox" class="card__icons-checkbox" id="card__icons-checkbox-${item.id}">
                          <i class="fas fa-star card__checkbox"></i>
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
}; // показать на странице фильмы
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
}; // показать на странице тэги


const addVisibleFavorite = (targetId) => {
    //рендарим обьекты на страници из личта
    const renderFavorite = function (item) {
        const  film = `<div class="card" data-movieid="${item.id}">
                    <div class="card-header" id="heading-film-id">
                      <h5 class="mb-0 d-flex justify-content-between">
                        <button class="btn btn-link" type="button" data-title data-toggle="collapse" data-target="#collapse-film-${item.id}" aria-expanded="true" aria-controls="collapseOne">
                          ${item.title}
                        </button>
                        <label class="icons" for="card__icons-checkbox-${item.id}">
                          <input type="checkbox" class="card__icons-checkbox" id="card__icons-checkbox-${item.id}" checked="${item.favorite}">
                          <i class="fas fa-star card__checkbox"></i>
                        </label>
                      </h5>
                    </div>

                    <div id="collapse-film-${item.id}" class="collapse" aria-labelledby="heading-film-${item.id}" data-parent="#accordionFilm">
                      <div class="card-body" data-description="">
                        Абзац описания фильма
                      </div>
                    </div>
                  </div>`;
        accordionFavorite.insertAdjacentHTML('beforeend', film);
    };
    const itemIndex = favoriteVisibleMoviesList.findIndex(x => x.id === targetId);
    favoriteVisibleMoviesList[itemIndex].favorite = true;
    renderFavorite(favoriteVisibleMoviesList[itemIndex]);

};
const removeFavoriteMovie = (targetId) => {
    const itemIndex = favoriteVisibleMoviesList.findIndex(x => x.id === targetId);
    favoriteVisibleMoviesList.splice(itemIndex,1);
    console.log(favoriteVisibleMoviesList);
    let itemForRemove = accordionFavorite.querySelector('[data-movieid ="' + targetId + '"]');
    itemForRemove.remove();
};

checkRefresh = () => {
    //загрузить 10 шт видео
    addVisibleMovies();

    movieButton.onclick = () => { // + 15 видео
        addVisibleMovies();
    };

    addVisibleTags();

    const tagsArray = document.querySelectorAll("#movie-tags");

    tagsArray.forEach((elem) => {
        elem.onclick = () => {
            const Id = elem.getAttribute('datatype');
        }
    });


    mainMovieField.forEach((elem) => {
        elem.addEventListener('change', function (event){
            const idString = event.target.closest('[data-movieid]').dataset.movieid;
            const id = parseInt(idString);
            let checkboxCheck = elem.querySelector('.card__icons-checkbox').checked;

            if (!checkboxCheck) {
                visibleMoviesList[id].favorite = false;
                checkboxCheck = false;

                removeFavoriteMovie(id);

            } else if (checkboxCheck) {
                visibleMoviesList[id].favorite = true;
                checkboxCheck = true;

                favoriteVisibleMoviesList.push(visibleMoviesList[id]);
                addVisibleFavorite(id); // рендеринг

                console.log(favoriteVisibleMoviesList);

            }
        })
    })
};









window.onbeforeunload = checkRefresh(); // в момент загрузки мы рендорим строки с  фильмами
//после нажатия на чекбокс добавляем фейворится создаем обьект в localstorage




