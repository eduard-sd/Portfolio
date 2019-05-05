const movieButton = document.querySelector("#movie-button");
const tagsArray = [];
const visibleMoviesList = [];
let favoriteVisibleMoviesList = [];
let moviesOnPageCount = 0;
const mainMovieField = document.querySelectorAll("#accordionFilm");
const accordionFavorite = document.querySelector("#accordionFavorite");
const favoriteTab = document.querySelector("#profile-tab");
const MOVIE_URL =  'js/jsons/films.json';
let searchMatchesList = [];
let tagsFilter = [];
let tagsFilterResult = [];
const tagsSelector = document.querySelector("#movie-tags");


const getFavoriteList = () => {
    return JSON.parse(localStorage.getItem("favorite"));
};
const setFavoriteList = (key, obj) => {
    let sObj = JSON.stringify(obj);
    return localStorage.setItem(key, sObj);
};


try {
    if (getFavoriteList().length > 0) {
        favoriteVisibleMoviesList = getFavoriteList();
    }
} catch(e) {
    console.log(e);
}

const addVisibleMovies = () => {
    //рендарим обьекты на страници из лиcта
    const accordionFilm = document.querySelector("#accordionFilm");
    const renderFilm = function (item) {
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

    for (let i = moviesOnPageCount; i < moviesOnPageCount + 15; i++) {
        renderFilm(visibleMoviesList[i]);
    }
    moviesOnPageCount += 15; // === 15 потому что старт с 0

    try {
        // если в favoriteVisibleMoviesList.length > 0 то для каждого обекта находим копию в visibleMoviesList и ставим checked
        if (getFavoriteList().length > 0) {
            for (let i = 0; i < favoriteVisibleMoviesList.length; i++) {
                let idFavorite = favoriteVisibleMoviesList[i].id;
                console.log(visibleMoviesList);

                let itemIndex = visibleMoviesList.findIndex(x => x.id === idFavorite);
                visibleMoviesList[itemIndex].favorite = true;
                let itemMakeChecked = accordionFilm.querySelector(`#card__icons-checkbox-${idFavorite}`).checked = true;
            }
        }
    } catch(e) {console.log(e)}

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
                    checked: true,
                }
            );
            renderTags(tagsArray[i]);
        }
    }

    main2(tagsJson); // заполняем новый лист обьектами с id

    //рендарим обьекты на странице из листа
    const renderTags = function (item) {
        const tags = `<div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox-${item.id}" data-id="${item.id}" value="option1">
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

    let itemForRemove = accordionFavorite.querySelector('[data-movieid ="' + targetId + '"]');
    itemForRemove.remove();
};
async function loadMovies (path) {
    const responce = await fetch(path);
    const data = await responce.json();
    for (let i = 0; i < data.length ; i++) {
        visibleMoviesList.push(
            {
                id : i,
                title: data[i].title,
                tags: data[i].tags,
                favorite: false,
            }
        );
    }
};

checkRefresh = async () => {
    await loadMovies(MOVIE_URL); //создаем список обьектов из json
    addVisibleMovies(); // рендорим на странице
    movieButton.onclick = () => { // + 15 видео по кнопке
        addVisibleMovies();
    };
    addVisibleTags(); // рендори тэги

    mainMovieField.forEach((elem) => {
        elem.addEventListener('change', function (event){
            const idString = event.target.closest('[data-movieid]').dataset.movieid;
            const id = parseInt(idString);

            if (visibleMoviesList[id].favorite) {
                visibleMoviesList[id].favorite = false;
                removeFavoriteMovie(id);

                localStorage.removeItem("favorite");
                setFavoriteList("favorite", favoriteVisibleMoviesList);

            } else if (!visibleMoviesList[id].favorite) {
                visibleMoviesList[id].favorite = true;

                favoriteVisibleMoviesList.push(visibleMoviesList[id]);
                addVisibleFavorite(id); // рендеринг
                setFavoriteList("favorite", favoriteVisibleMoviesList);
            }
        })
    });

    favoriteTab.onclick = () => {
        let accordionFavoriteChildrens = accordionFavorite.childElementCount;
        if (accordionFavoriteChildrens === 0) {
            for (let i = 0; i < favoriteVisibleMoviesList.length; i++) {
                let id = favoriteVisibleMoviesList[i].id;
                addVisibleFavorite(id);
            }
        }
    };

    const searchButton = document.querySelector('.form-inline button');
    const searchInput = document.querySelector('.form-inline input');

    searchButton.onclick = () => {
        searchMatchesList = [];
        for (let i = 0; i < visibleMoviesList.length; i++) {
            let titleLowCase = visibleMoviesList[i].title.toLowerCase();
            let searchLowCase = searchInput.value.trim().toLowerCase();

            let word = '';
            for (let j = 0; j < searchLowCase.length; j++) {
                if(searchLowCase.charAt(j) === titleLowCase.charAt(j)){
                    word += searchLowCase.charAt(j);
                } else {
                    j = searchLowCase.length;
                    word = '';
                }
            }

            console.log(word);
            if(word === searchLowCase) {
                searchMatchesList.push(visibleMoviesList[i]) // :TODO добавить .id чтоб сравнивать по id
            }
        }
        return searchMatchesList;
    };

    const tagsSelectorList = document.querySelectorAll("#movie-tags");
    tagsSelectorList.forEach((elem) => {
        elem.addEventListener('change', function (event){
            const dataId = event.target.closest('[data-id]').dataset.id;
            const id = parseInt(dataId);

            if (tagsArray[id].checked) {
                tagsFilter.push(tagsArray[id].title);
                tagsArray[id].checked = false;

            } else if (!tagsArray[id].checked) {
                let itemIndex = tagsFilter.indexOf(tagsArray[id].title);
                tagsFilter.splice(itemIndex,itemIndex+1);
                tagsArray[id].checked = true;
            }

            tagsFilterResult = [];
            for (let i = 0; i < visibleMoviesList.length; i++) {
                let movieTagsList = visibleMoviesList[i].tags;
                let list = [];
                for (let j = 0; j < tagsFilter.length; j++) {
                    if(movieTagsList.includes(tagsFilter[j])){
                        list.push(tagsFilter[j]);
                    } else {
                        j = tagsFilter.length;
                        list = [];
                    }
                }

                console.log(list);
                if(list.length > 0) {
                    tagsFilterResult.push(visibleMoviesList[i]) // :TODO добавить .id чтоб сравнивать по id
                }
            }
            return tagsFilterResult;

        })
    });

};

window.onbeforeunload = checkRefresh(); // в момент загрузки мы рендорим строки с  фильмами
//после нажатия на чекбокс добавляем фейворится создаем обьект в localstorage




