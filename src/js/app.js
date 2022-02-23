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

            const swiperWrapper = e.$wrapperEl[0];
            swiperWrapper.addEventListener('mouseenter', (e) => {
                this.autoplay.stop();
                diagramSpiner.classList.remove('start');
            });
            swiperWrapper.addEventListener('mouseleave', (e) => {
                this.autoplay.start();
                diagramSpiner.classList.add('start');
            });
        },
        slideChange(e) {
            let sliderSpeed = e.params.speed;
            let diagramSpiner = e.$el[0].querySelector('.slider-timer');
            diagramSpiner.classList.remove('start');
            setTimeout(() => {
                diagramSpiner.classList.add('start');
            }, sliderSpeed);
        }
    };
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
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
        980: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 15,
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
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
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
        1024: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 15,
        }
    },
    on: sliderSpinerData(),
});


let modalsBtns = document.querySelectorAll('[data-modal-open]');
let modalsContent = [...document.querySelectorAll('[data-modal-content]')];

modalsBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const modalId = btn.dataset.modalOpen;
        let modalItem = modalsContent.find(item => item.dataset.modalContent == modalId);
        modalItem.classList.add('show');
    });

});

document.addEventListener('click', (e) => {
    const closeModalBtn = e.target.closest('[data-close-btn]');
    if (closeModalBtn) {
        closeModalBtn.closest('[data-modal-content]').classList.remove('show');
    }
    const modalContentWrapper = e.target.closest('[data-modal-content]');
    if (modalContentWrapper && !e.target.closest('.item-modal__wrapper')) {
        modalContentWrapper.classList.remove('show');
    }
});



// Логика работы меню
const openMenuBtn = document.querySelector('[data-open-menu]');
const header = document.querySelector('#header');
const unvisibleHeaderContent = header.querySelector('.header__unvisible');
const headerShowContent = header.querySelector('.header__wrapper');
openMenuBtn.addEventListener('click', (e) => {
    unvisibleHeaderContent.style.height = `calc(100vh - ${headerShowContent.clientHeight}px)`;
    openMenuBtn.classList.toggle('show');
    header.classList.toggle('menu-open');
    // document.body.classList.toggle('hidden');
})
