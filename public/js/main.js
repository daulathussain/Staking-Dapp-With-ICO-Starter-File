(function(window, document, undefined) {
    'use strict';

    /*==============================
    Header
    ==============================*/
    if (document.querySelector('.header')) {
        var headerBtn = document.querySelector('.header__btn');
        var headerNav = document.querySelector('.header__nav');
        var header = document.querySelector('.header');

        headerBtn.addEventListener('click', function() {
            headerBtn.classList.toggle('header__btn--active');
            headerNav.classList.toggle('header__nav--active');

            if (window.scrollY === 0) {
                header.classList.toggle('header--active');
            }
        });

        window.addEventListener('scroll', function() {
            var header = document.querySelector('.header');
            if (window.scrollY > 0) {
                header.classList.add('header--active');
            } else {
                header.classList.remove('header--active');
            }
        });
        window.dispatchEvent(new Event('scroll'));
    }

    /*==============================
    Carousel
    ==============================*/
    if (document.querySelector('.roadmap__carousel')) {
        var elms = document.getElementsByClassName('roadmap__carousel');

        for (var i = 0; i < elms.length; i++) {
            new Splide(elms[i], {
                type: 'loop',
                perPage: 3,
                drag: true,
                pagination: false,
                autoWidth: false,
                auto: true,
                speed: 800,
                gap: 10,
                arrows: false,
                focus: 0,
                breakpoints: {
                    767: {
                        pagination: true,
                        arrows: false,
                        perPage: 1,
                    },
                    991: {
                        pagination: true,
                        arrows: false,
                        perPage: 2,
                    },
                    1199: {
                        pagination: true,
                        arrows: false,
                        perPage: 3,
                    },
                }
            }).mount();
        }
    }

    /*==============================
    Canvas
    ==============================*/
    if (document.querySelector('.section__canvas--first')) {
        VANTA.FOG({
            el: "#canvas",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xA034FA,
            midtoneColor: 0xA034FA,
            lowlightColor: 0xE66C12,
            baseColor: 0x16142A,
            blurFactor: 0.90,
            speed: 1.70,
            zoom: 1.00
        })
    }

    if (document.querySelector('.section__canvas--second')) {
        VANTA.FOG({
            el: "#canvas2",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xA034FA,
            midtoneColor: 0xA034FA,
            lowlightColor: 0xE66C12,
            baseColor: 0x16142A,
            blurFactor: 0.90,
            speed: 1.70,
            zoom: 1.00
        })
    }

    if (document.querySelector('.section__canvas--third')) {
        VANTA.FOG({
            el: "#canvas3",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xA034FA,
            midtoneColor: 0xA034FA,
            lowlightColor: 0xE66C12,
            baseColor: 0x16142A,
            blurFactor: 0.90,
            speed: 1.20,
            zoom: 1.00
        })
    }

    /*==============================
    Scrollbar
    ==============================*/
    var Scrollbar = window.Scrollbar;

    if (document.querySelector('.deals__table-wrap')) {
        Scrollbar.init(document.querySelector('.deals__table-wrap'), {
            damping: 0.1,
            renderByPixels: true,
            alwaysShowTracks: true,
            continuousScrolling: true
        });
    }

    /*==============================
    Modal
    ==============================*/
    document.querySelectorAll('.modal').forEach(function(myModalEl) {
        myModalEl.addEventListener('show.bs.modal', event => {
            if (window.innerWidth > 1200) {
                var header = document.querySelector('.header');
                var scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
                header.style.paddingRight = scrollBarWidth + "px";
            }
        });

        myModalEl.addEventListener('hidden.bs.modal', event => {
            if (window.innerWidth > 1200) {
                var header = document.querySelector('.header');
                header.style.paddingRight = '';
            }
        });
    });

})(window, document);