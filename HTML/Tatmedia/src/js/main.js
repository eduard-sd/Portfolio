
const blocks = document.querySelector(".hot-news__container");

const renderBlocks = (index) => {
    const item = `
            <div class="col-row-1">A${index}</div>
            <div class="col-row-2">B${index}</div>
            <div class="col-row-3">C${index}</div> 
    `;
    blocks.insertAdjacentHTML("beforeend", item);
};

for (let i = 1; i <= 10; i++) {
    renderBlocks(i)
}

document.querySelector(".past-news__button").onclick = () => {
        for(let i = 0; i < blocks.children.length; i++){
        let target = Math.floor(Math.random() * blocks.children.length -1) + 1;
        blocks.children[i].style.order = `${target}`;
    }
};

