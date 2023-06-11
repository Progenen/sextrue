class MinModalJS {
    modalOpen () {
        this.modal.classList.add('min-modal-js-active');
        document.querySelector(".wrapper").classList.add('lock');
        document.body.classList.add('lock');
        if (this.whenModalOpen) {
            this.whenModalOpen();
        }
    }

    modalClose () {
        this.modal.classList.remove('min-modal-js-active');
        document.querySelector(".wrapper").classList.remove('lock');
        document.body.classList.remove('lock');
        this.whenModalClose();
    }
    modalDestroy() {
        this.modal.remove();
    }

    constructor(inner, obj) {
        if (obj.keyOpen === undefined) {
            obj.keyOpen = 'Escape';
        }

        this.btns = document.querySelectorAll(obj.buttonsActive);
        this.inner = document.querySelector(inner);
        this.closeBtns = document.querySelectorAll(obj.buttonsDisActive);
        this.keyOpen = obj.keyOpen;
        this.modalOutsideClick = obj.modalOutsideClick;
        this.modal = document.createElement('div');
        this.modal.classList.add('modal-wrapper');
        this.whenModalClose = obj.whenModalClose;
        this.whenModalOpen = obj.whenModalOpen;
        this.modal.append(this.inner);
        document.querySelector(".wrapper").append(this.modal);
        
        this.btns.forEach(element => {
            element.addEventListener('click', (e) =>{
                e.preventDefault();
                this.modalOpen();
            });
        });

        this.closeBtns.forEach(element => {
            element.addEventListener('click', (e) =>{
                e.preventDefault();
                this.modalClose();
            });
        });

        if (this.modalOutsideClick != false) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.modalClose();
                }
            });
        }

        if (this.key != false) {
            document.addEventListener('keydown', (e)=> {
                if (e.key === this.keyOpen) { 
                    this.modalClose();
                }
            });
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {

    // Burger menu (Header)

    class MainMenu {
        constructor() {
            this.menu = document.querySelector('.main-menu');
            this.body = document.body;
            this.menuBtn = document.querySelectorAll('.main-menu-btn');
        }

        openMenu = (e) => {
            this.menu.classList.add('show');
            this.body.classList.add('lock');
            e.target.classList.add('collapsed');
        }
 
        closeMenu = (e) => {
            this.menu.classList.remove('show');
            this.body.classList.remove('lock');
            e.target.classList.remove('collapsed');
        }

        render() {
            this.menuBtn.forEach(element => {
                element.addEventListener('click', (e) => {
                    if (this.menu.classList.contains('show')) {
                        this.closeMenu(e);
                    } else {
                        this.openMenu(e);
                    }
                })
            })
        }
    }

    //Получаем все "select" по селектору
    //Получаем все "select" по селектору
    const selects = document.querySelectorAll('[data-custom-select]');
    //переборка по полученным "select"
    for (let i = 0; i < selects.length; i++) {
        const select = selects[i]
        //получаем все "option" внутри "select"
        const options = select.querySelectorAll('option')

        //создаем кастомный "select"
        const cSelect = document.createElement('div')
        const cSelectList = document.createElement('div')
        const cSelectCurrent = document.createElement('div');
        const cSelectCurrentText = document.createElement("span");

        // select.setAttribute('tabindex', '1')
        //задем классы и атрибуты кастомному "select"
        cSelect.className = 'custom-select' + ' ' + select.classList;
        cSelectList.className = 'custom-select__list custom-scrollbar'
        cSelectCurrent.className = 'custom-select__current'
        cSelectCurrent.append(cSelectCurrentText);

        //создаем вложенность созданных элементов
        cSelect.append(cSelectCurrent, cSelectList)

        //добавляем кастоный "select" сразу после оргинального "select"
        select.after(cSelect)

        //получаем список и значения "option" из "select", затем создаём кастомный "option" для кастоного "select"
        const createCustomDom = (x, y) => {
            let selectItems = ''
            for (var i = 0; i < options.length; i++) {
                console.log(select.clientWidth);
                selectItems += '<div class="custom-select__item" data-value="' + options[i].value + '">' + options[i].text + '</div>'
            }
            cSelectList.innerHTML = selectItems
            x(), y();
        }

        //открываем-закрываем выпадающий список по клику
        const toggleClass = () => { cSelect.classList.toggle('custom-select--show') }

        //присваиваем текстовое первое значение "option" в кастомном "select"
        const currentTextValue = () => cSelectCurrentText.textContent = cSelectList.children[0].textContent

        //получаем и задаем значения text/value 
        const currentValue = () => {
            const items = cSelectList.children
            for (var el = 0; el < items.length; el++) {
                let selectValue = items[el].getAttribute('data-value')
                let selectText = items[el].textContent
                items[el].addEventListener('click', () => {
                    cSelect.classList.remove('custom-select--show')
                    cSelectCurrentText.textContent = selectText
                    select.value = selectValue
                })
            }
        }

        const desctopFn = () => {
            cSelectCurrent.addEventListener('click', toggleClass)
        }

        const mobileFn = () => {
            cSelectCurrent.addEventListener('click', toggleClass)
        }

        createCustomDom(currentTextValue, currentValue)


        //закрываем выпадающий список по клику вне области кастомного селекта
        document.addEventListener('mouseup', (e) => {
            if (!cSelect.contains(e.target)) cSelect.classList.remove('custom-select--show')
        })

        detectmob(mobileFn, desctopFn)

        function detectmob(x, y) {
            if (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
            ) {
                x();
                console.log('mobile')
            }
            else {
                y();
                console.log('desktop')
            }
        }
    }

    if (document.querySelector(".multi-range")) {
        const multiRage = document.querySelectorAll(".multi-range");

        multiRage.forEach(el => {
            const lowerSlider = el.querySelector(".lower"),
                    upperSlider = el.querySelector(".upper");
            let lowerVal = parseInt(lowerSlider.value);
            let upperVal = parseInt(upperSlider.value);
            let lowerSliderCount = el.querySelector(".filter-form__range-value--1");
            let upperSliderCount = el.querySelector(".filter-form__range-value--2");

            upperSlider.oninput = function () {
                lowerVal = parseInt(lowerSlider.value);
                upperVal = parseInt(upperSlider.value);


                if (upperVal < lowerVal + 1) {
                    lowerSlider.value = upperVal - 1;

                    if (lowerVal == lowerSlider.min) {
                        upperSlider.value = 1;
                    }
                }
                lowerSliderCount.textContent = lowerVal;
                upperSliderCount.textContent = upperVal;
                console.log(lowerVal);
            };

            lowerSlider.oninput = function () {
                lowerVal = parseInt(lowerSlider.value);
                upperVal = parseInt(upperSlider.value);

                if (lowerVal > upperVal - 1) {
                    upperSlider.value = lowerVal + 1;

                    if (upperVal == upperSlider.max) {
                        lowerSlider.value = parseInt(upperSlider.max) - 1;
                    }

                }
                lowerSliderCount.textContent = lowerVal;
                upperSliderCount.textContent = upperVal;

                console.log(upperVal);
                console.log(upperSlider.value);
                console.log(lowerVal);
            };

        })

    }

    if (document.querySelector(".header")) {
        const headerCatBtns = document.querySelectorAll("[data-params-btn]");
        const headerCat = document.querySelector(".filter-search-params__drop");
        const filterBtn = document.querySelectorAll("[data-filter-btn]");
        const filter = document.querySelector(".filter__top");
        const filterCat = document.querySelector(".filter-search-params__drop");
        const filterTabTitle = document.querySelectorAll("[data-params-tab-title]");
        const filterTabContent = document.querySelectorAll("[data-params-tab-content");

        filterTabTitle.forEach((el, i) => {
            el.addEventListener("click", () => {
                filterTabTitle.forEach((title, j) => {
                    title.classList.remove("active");
                    filterTabContent[j].classList.remove("active");
                });
                el.classList.add("active");
                filterTabContent[i].classList.add("active");
            })
        })

        headerCatBtns.forEach(element => {
            element.addEventListener("click", () => {
                document.body.classList.toggle("lock");
                filter.classList.remove("active");
                headerCat.classList.toggle("active");
            })
        }); 

        if (window.innerWidth <= 1040) {
    
            filterBtn.forEach(element => {
                element.addEventListener("click", () => {
                    console.log("ok");
                    filterCat.classList.remove("active");
                    filter.classList.toggle("active");
                })
            });
    
            document.body.append(filter);
            document.body.append(headerCat);
        }
    }

    if (document.querySelector(".catalog-item__phone")) {
        const phoneText = document.querySelectorAll(".catalog-item-phone__text");
        const phoneSwap = document.querySelectorAll(".catalog-item-phone__phone");

        document.querySelectorAll(".catalog-item__footer").forEach((element, i) => {
            element.addEventListener("click", () => {
                phoneText[i].classList.toggle("active");
                phoneSwap[i].classList.toggle("active");
            })
        });
    }

    if (window.innerWidth <= 992) {
        const paramsTitles = document.querySelectorAll(".filter-search-params__item-title");
        const paramsLists = document.querySelectorAll(".filter-search-params__item-list");

        paramsTitles.forEach((el, i) => {
            el.addEventListener("click", () => {
                el.classList.toggle("active");
                paramsLists[i].classList.toggle("active");
            })
        })
    }

    if (document.querySelector("[data-video]")) {
        const video = document.querySelectorAll('[data-video]');
        const videoIframe = document.querySelector("video");
        const videoBody = document.querySelector(".modal-video__body");
        const newModal = new MinModalJS('.modal-video', {
            buttonsActive: '[data-video]',
            buttonsDisActive: '.modal-video__close',
            keyOpen: false, // Or false
            modalOutsideClick: true, // if true, modal closed when you click outside content modal
            whenModalClose: function () {
                videoIframe.pause();
            }
        });
        video.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                if (videoIframe.getAttribute('src') != element.getAttribute('href')) {
                    videoIframe.src = element.getAttribute('href');
                }
            });
        });
    }

});