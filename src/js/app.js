'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import ModalVideo from 'modal-video';
import Swiper, {
    Navigation,
    Pagination,
    EffectFade,
    Autoplay,
    Thumbs,
    Mousewheel
} from 'swiper';

// Проверка поддержки webP
baseFunction.testWebP();


const sliderSpinerData = () => {
    return {
        init(e) {
            let animationTime = e.params.autoplay.delay / 1000;
            let diagramSpiner = e.$el[0].querySelector('.slider-timer');
            diagramSpiner.querySelector('.slider-timer-path').style.animationDuration = `${animationTime}s`;
            diagramSpiner.classList.add('start');
        },
        slideChange(e) {
            let sliderSpeed = e.params.speed;
            let diagramSpiner = e.$el[0].querySelector('.slider-timer');
            diagramSpiner.classList.remove('start');
            setTimeout(() => {
                diagramSpiner.classList.add('start');
            }, sliderSpeed);
        }
    }
};

const mainSlider = new Swiper('.main-screen__slider', {
    modules: [Navigation, EffectFade, Autoplay],
    speed: 300,
    loop: true,
    autoplay: {
        delay: 6000,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: sliderSpinerData(),
});

const teasersSlider = new Swiper('.teasers__slider', {
    modules: [Navigation, EffectFade, Autoplay],
    speed: 900,
    loop: true,
    autoplay: {
        delay: 4000,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 4,
    spaceBetween: 30,
    on: sliderSpinerData(),
});

const ourDestinationsSlider = new Swiper('.our-destinations__slider', {
    modules: [Navigation, EffectFade, Autoplay],
    speed: 900,
    loop: true,
    autoplay: {
        delay: 6000,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 4,
    spaceBetween: 30,
    on: sliderSpinerData(),
});

