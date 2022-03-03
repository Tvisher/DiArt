'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import Swiper, {
    Navigation,
    EffectFade,
    Autoplay,
} from 'swiper';

import WOW from 'wow.js';


// Проверка поддержки webP
baseFunction.testWebP();

//получаем ширину полоски скрола
const scrollLineWigth = baseFunction.scrollbarWidth();

// Маска для инпутов с номером телефона
const phoneInputs = document.querySelectorAll('input[type=tel]');
phoneInputs.forEach(input => {
    $(input).mask("+7 (999) 999-99-99");
});



// настройка коррекной работы спинера с анимацией autoplay в слайдерах
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
    speed: 800,
    loop: true,
    autoplay: {
        delay: 6000,
    },
    // effect: 'fade',
    // fadeEffect: {
    //     crossFade: true
    // },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: sliderSpinerData(),
});

const teasersSlider = new Swiper('.teasers__slider', {
    modules: [Navigation, Autoplay],
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

const articlesSlider = new Swiper('.articles__slider', {
    modules: [Navigation, Autoplay],
    speed: 900,
    loop: true,
    autoplay: {
        delay: 4000,
    },
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
        980: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: sliderSpinerData(),
});

// Модальные окна секции с сотами
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

// Логика работы выпадающего меню
const openMenuBtn = document.querySelector('[data-open-menu]');
const header = document.querySelector('#header');
const unvisibleHeaderContent = header.querySelector('.header__unvisible');
const headerShowContent = header.querySelector('.header__wrapper');
openMenuBtn.addEventListener('click', (e) => {
    unvisibleHeaderContent.style.height = `calc(100vh - ${headerShowContent.clientHeight}px)`;
    openMenuBtn.classList.toggle('show');
    header.classList.toggle('menu-open');
    document.body.classList.toggle('hidden');
    if (!document.body.classList.contains('hidden')) {
        document.body.style.paddingRight = "0px";
    } else {
        document.body.style.paddingRight = `${scrollLineWigth}px`;
    }
});

//Кнопка показать ещё список партнёров
const showMoreBtn = document.querySelector('#show-all-clients');
if (showMoreBtn) {
    showMoreBtn.onclick = (e) => {
        document.querySelector('#ours-clients__list').classList.add('show');
        showMoreBtn.classList.add('hide');
    };
}

// Действие при нажатии на ссылки в открытом меню
const munuLinks = document.querySelectorAll('[data-close-menu]');
munuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (header.classList.contains('menu-open')) {
            openMenuBtn.classList.remove('show');
            header.classList.remove('menu-open');
            document.body.classList.remove('hidden');
            document.body.style.paddingRight = '0px';
        }
    });
});

// Функция, описывающая самоснаписание заголовка на главной странице  
function writeText(classEl, speed, cb) {
    const textWriteEl = document.querySelector(classEl);
    const text = [textWriteEl.dataset.text];
    let line = 0;
    let count = 0;
    let result = '';
    function typeLine() {
        let interval = setTimeout(
            () => {
                result += text[line][count]
                document.querySelector(classEl).innerHTML = result + '|';
                count++;
                if (count >= text[line].length) {
                    count = 0;
                    line++;
                    if (line == text.length) {
                        clearTimeout(interval);
                        document.querySelector(classEl).innerHTML = result;
                        setTimeout(() => {
                            cb && cb();
                        }, 300);
                        return true;
                    }
                }
                typeLine();
            }, getRandomInt(getRandomInt(speed * 2.5)));
    }
    typeLine();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Счётчики секции с клиентами
function outNum(num, elem, step, time) {
    let e = elem,
        n = Math.round(num - 250);
    let timerInterval = time;
    let interval = setInterval(() => {
        n = n + step;
        if (n == num - 15) {
            clearInterval(interval);
            let lowTimerInterval = time * 12;
            let lowInterval = setInterval(() => {
                n = n + step;
                if (n == num) {
                    clearInterval(lowInterval);
                }
                e.innerHTML = n;
            }, lowTimerInterval);
        }
        e.innerHTML = n;
    }, timerInterval);
}


// Класс описывающий появление анимаций
const wow = new WOW({
    boxClass: 'wow',      // animated element css class (default is wow)
    animateClass: 'animate__animated', // animation css class (default is animated)
    offset: 10,          // distance to the element when triggering the animation (default is 0)
    mobile: true,       // trigger animations on mobile devices (default is true)
    live: true,       // act on asynchronously loaded content (default is true)
    callback: function (box) {
        if (box.classList.contains('main-screen__title')) {
            setTimeout(() => {
                writeText('.main-screen__title', 220, () => { writeText('.main-screen__desc', 100) });
            }, 1050);
        }
        if (box.classList.contains('ours-clients__block')) {
            setTimeout(() => {
                document.querySelectorAll('.counter__el').forEach((element, index) => {
                    const iterableNum = +element.textContent;
                    outNum(iterableNum, element, 1, 7 + index);
                });
            }, 1000);
        }
    },
    scrollContainer: null,    // optional scroll container selector, otherwise use window,
    resetAnimation: true,     // reset animation on end (default is true)
});

window.addEventListener('load', (e) => {
    wow.init();
});


// обьявление паралакс элементов
const scenes = document.querySelectorAll('.paralax-container');
scenes.forEach(scene => {
    let parallaxInstance = new Parallax(scene);
})


// Кнопка проматать к началу страницы
const scrollToTop = document.querySelector('#scroll-to-top');
window.addEventListener("scroll", (e) => {
    console.log();
    if (window.pageYOffset > 300) {
        scrollToTop.classList.add('show');
    } else {
        scrollToTop.classList.remove('show');
    }
});
$(scrollToTop).click(function () {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    return false;
});

// Плавный скролл на сайте
SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime: 500,
    // Размер шага в пикселях 
    stepSize: 75,
    // Ускорение 
    accelerationDelta: 100,
    // Максимальное ускорение
    accelerationMax: 2,

    // Поддержка клавиатуры
    keyboardSupport: true,
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll: 50,
    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,
    // Поддержка тачпада
    touchpadSupport: true,
})



