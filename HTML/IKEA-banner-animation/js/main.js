"use strict";

function main() {
    const Selector = function (item) {
        return document.querySelector(item);
    };

    const PictureBook1 = Selector('#picture-book1'),
        PictureBook2 = Selector('#picture-book2'),
        PictureBook3 = Selector('#picture-book3'),
        Slide2Action1 = Selector("#slide2-action1"),
        HeaderSlide1 = Selector("#header-slide1"),
        HeaderSlide2 = Selector("#header-slide2"),
        HeaderSlide3 = Selector("#header-slide3"),
        Button = Selector("#button"),
        Copyright = Selector("#copyright");


    const tl = new TimelineMax();

    tl.set([PictureBook1, PictureBook2,PictureBook3, HeaderSlide2,HeaderSlide3,Button,Copyright], {autoAlpha: 0})
        .from(HeaderSlide1, 2, {opacity: 0, autoAlpha: 0, left: "-300px"}, "first-slide")
        .from(PictureBook1, 2, {opacity: 0, autoAlpha: 0, left: "-283px"}, "first-slide")
        .from(PictureBook2, 2, {opacity: 0, autoAlpha: 0, left: "-262px"}, "first-slide")
        .from(PictureBook3, 2, {opacity: 0, autoAlpha: 0, left: "-225px"}, "first-slide")
        .to(PictureBook2, 0.5, { bottom: "89px",left: "55px",rotation: "-15"}, "second-slide")
        .to(PictureBook3, 0.5, { bottom: "126px",left: "92px",rotation: "-25"}, "second-slide")
        .to(PictureBook2, 1, {bottom: "89px",left: "55px",rotation: 0}, "-=0.3")
        .to(PictureBook3, 0.8, {bottom: "85px",left: "136px",rotation: 0}, "-=1")
        .set([PictureBook1,PictureBook2,PictureBook3, HeaderSlide1], {autoAlpha: 0})
        .from(Slide2Action1, 2.5, {opacity: 0, left: "-200px"})
        .to(HeaderSlide2, 1.5, {autoAlpha: 1}, "-=0.8")
        .to([Slide2Action1, HeaderSlide2], 1.5, {left: '300px', ease: Elastic.easeInOut.config(1, 0.4)})
        .set([PictureBook1,PictureBook2,PictureBook3, HeaderSlide1, HeaderSlide2, Slide2Action1], {
            autoAlpha: 0,
        })
        .from(HeaderSlide3, 2.5, {autoAlpha: 1, left: "-300px",ease: Back.easeInOut}, "label")
        .from(Copyright, 2.5, {autoAlpha: 1, left: "-300px"}, "label")
        .from(Button, 2.5, {opacity: 0,autoAlpha: 1,left: "300px",borderTopWidth:3,borderBottomWidth:3, ease:Back.easeInOut}, "label");
}

window.addEventListener("load", function(event){
main();
});