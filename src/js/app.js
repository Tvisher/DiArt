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


const mainSlider = new Swiper('.main-screen__slider', {
    modules: [Navigation, EffectFade, Autoplay],
    speed: 900,
    loop: true,
    autoplay: {
        delay: 4100,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
