function main() {
    const Selector = (item) => {
        return document.querySelector(item);
    };

    const Slide1Action1 = Selector('#slide1-action1'),
        Slide1Action2 = Selector('#slide1-action2'),
        Slide1Action3 = Selector('#slide1-action3'),
        Slide2Action1 = Selector("#slide2-action1"),
        HeaderSlide1 = Selector("#header-slide1"),
        HeaderSlide2 = Selector("#header-slide2"),
        HeaderSlide3 = Selector("#header-slide3"),
        Button = Selector("#button"),
        Copyright = Selector("#copyright");


    const tl = new TimelineMax();

    tl.set([Slide1Action2, Slide1Action3, HeaderSlide2,HeaderSlide3,Button,Copyright], {autoAlpha: 0})
        .from([Slide1Action1, HeaderSlide1], 2.5, {opacity: 0, left: "-300px"})
        .to([Slide1Action1], 0.8, {autoAlpha: 0})
        .to(Slide1Action2, 0.5, {autoAlpha: 1}, "-=0.5")
        .to([Slide1Action2], 0.8, {autoAlpha: 0})
        .to(Slide1Action3, 0.5, {autoAlpha: 1}, "-=0.5")
        .set([Slide1Action3, HeaderSlide1], {autoAlpha: 0})
        .from(Slide2Action1, 2.5, {opacity: 0, left: "-200px"})
        .to(HeaderSlide2, 1.5, {autoAlpha: 1}, "-=0.8")
        .to([Slide2Action1, HeaderSlide2], 1.5, {left: '300px', ease: Elastic.easeInOut.config(1, 0.4)})
        .set([Slide1Action1, Slide1Action2, Slide1Action3, HeaderSlide1, HeaderSlide2, Slide2Action1], {
            autoAlpha: 0,
            display: "none"
        })
        .from(HeaderSlide3, 2.5, {autoAlpha: 1, left: "-300px",ease: Back.easeInOut}, "label")
        .from(Copyright, 2.5, {autoAlpha: 1, left: "-300px"}, "label")
        .from(Button, 2.5, {autoAlpha: 1,left: "300px",borderTopWidth:3,borderBottomWidth:3, ease:Back.easeInOut}, "label");
}

window.addEventListener("load", function(event){
    main();
});

