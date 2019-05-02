

const tags =  'js/jsons/tags.json';
const movie =  'js/jsons/films.json';
const method = 'GET';
const isAsync = false;

// main(method,tags,isAsync);

main2(tags);
main2(movie);


function main() {
    const request = new XMLHttpRequest();
    request.open(method, src, isAsync);
    request.send();

    const data = JSON.parse(request.response);
    console.log(data);
}


function main2 (url) {
    const request = fetch(url);

    const jsonStream = request.then(responce => {
        return responce.json();
    });

    jsonStream.then(data =>{
        console.log(data)
    })
}
