const newBlocks = document.querySelector(".hot-news__container");


for(let i = 0; i < newBlocks.children.length; i++){
    let target = Math.floor(Math.random() * newBlocks.children.length -1) + 1;
    newBlocks.children[i].style.order = `${target}`;
}

