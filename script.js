//вспомогательная функция для выбора 
//нужного сколения к словам "секунда, минута, час, день, год" в зависимости от числа
function switchWord (value, word) {
    let value1,
        words = {
            'second' : ['секунда',"секунд", "сенкунды"],
            'minute' : ['минута', "минут", "минуты"],
            'hour' : ['час', "часов", "часа"],
            'day' : ['день',"дней","дня"],
            "year" : ['год', "лет", "года"]
        };

    value = Math.abs(value) % 100;
    value1 = value % 10;
    
    return words[word][ (value > 4 && value < 21 || value1 == 0 || value1 > 4 && value1 < 10) ? 1 : value1 > 1 && value1 < 5 ? 2 : 0 ];
}

//вспомогательная функция для заполенения
//первой и второй цифр карточек
function splitNumber(dom, number, order) {
    dom.innerHTML = number > 9 ? String(number)[order] : order > 0 ? number : 0;
}

//класс описывающий карточку с цифрами времени
//карточка состоит из перой, второй цифры числа
//и названия карточки (день,час,...)
class Card {
    constructor(name) {
        console.info(name,'.'+name);
        this.name = name;
        this.cardOne = document.querySelector('.' + name + ' .card-1'); //дом элемента карты для цифры 1
        this.cardTwo = document.querySelector('.' + name + ' .card-2'); //дом элемента карты для цифры 2
        this.cardName = document.querySelector('.' + name + ' .name'); //дом элемента карты для названия
    }

    //метод заполнения элементов ДОМ в hmtl
    fillCard(number) {
        this.cardName.innerHTML = switchWord(number, this.name);
        splitNumber(this.cardOne, number, 0);
        splitNumber(this.cardTwo, number, 1);
    };

}

function stopwatch (...args) {
    const inValid = [...args].some( (arg) => { return isNaN(Number(arg)) }) || (arguments.length ? false : true);
    if ( inValid ) {
        console.info("Invalid Date");
        return;
    }

    let date = new Date(...args), //дата до которой отсчитывается время
        // DOM-элемнты секундамера
        // ==================================================
        day_DOM = new Card('day'), //инициализация карточки "дни"
        hour_DOM = new Card('hour'), //инициализация карточки "часы"
        min_DOM = new Card('minute'), //инициализация карточки "минуты"
        sec_DOM = new Card('second'), ////инициализация карточки "секунды"
        day_3_DOM = document.querySelector(".day .card-3"), //третья цифра числа "день"
        // ==================================================
        sec, // всё остаточное время в секундах
        sc, //текущие секунды
        min, // текущие минуты
        h, // текущие часы
        d, // текущие дни
        countdown, //создаем обратный осчет когда осталося < 10sec
        timeId = setTimeout( function tick (date) { //Объявление сеттайм с таймаутом 1000мс, который имитирует секунды
                                                   //И коллбэк, который высчитывает обратный отсчет отнимая по 1 сек каждый ее запуск
            sec = (date - new Date())/1000;
            if ( sec < 0 ) {
                clearTimeout(timeId);
                return;
            }

            sc = Math.trunc(sec%60);
            min = Math.trunc(sec/60%60);
            h = Math.trunc(sec/3600%24);
            d = Math.trunc(sec/86400);

            day_DOM.fillCard(d);
            hour_DOM.fillCard(h);
            min_DOM.fillCard(min);
            sec_DOM.fillCard(sc);

            if (String(d).length > 2) {
                day_3_DOM.style = "display: block;";
                document.querySelector(".day").style = "grid-template-columns: 1fr 1fr 1fr;"
                day_3_DOM.innerHTML = String(d)[2];
            } else {
                day_3_DOM.style = "display: none;";
            }

            if (!d && !h && !min && sc == 10) {
                countdown = document.createElement("div");
                countdown.classList.add('countdown');
                countdown.innerHTML = sc;
                document.querySelector('.container').appendChild(countdown);
                document.querySelector('.container').style = 'background-color: rgba(0, 0, 0, 0.363);';
                document.querySelector('.stopwatch').style = 'opacity: 0.1;';
            } 
            if (!d && !h && !min && sc < 10) {
                countdown.innerHTML = sc;
            }
            
            if (!d && !h && !min && !sc) {
                    if ( document.querySelector('.countdown') ){
                        setTimeout ( () =>{
                            document.querySelector('.countdown').remove();
                            document.querySelector('.feerverk').style.display = block;
                        }
                        ,1000)
                    }
                clearTimeout(timeId);
            }
            else{
                timeId = setTimeout (tick, 1000, date);
            }
        },0, date);

}

stopwatch(2022,01,"31",23,59,59);

function ballBounce(e) {
    var i = e;
    if (e.className.indexOf(" bounce") > -1) {
      return;
    }
    toggleBounce(i);
  }
  
function toggleBounce(i) {
    i.classList.add("bounce");
    function n() {
        i.classList.remove("bounce");
        i.classList.add("bounce1");
        function o() {
        i.classList.remove("bounce1");
        i.classList.add("bounce2");
        function p() {
            i.classList.remove("bounce2");
            i.classList.add("bounce3");
            function q() {
            i.classList.remove("bounce3");
            }
            setTimeout(q, 500);
        }
        setTimeout(p, 500);
        }
        setTimeout(o, 500);
    }
    setTimeout(n, 500);
}

var array = document.querySelectorAll('.ball');

for (let i = 0; i < array.length; i++) {
    array[i].addEventListener('mouseenter', function () {
        ballBounce(this);
    });
    array[i].addEventListener('click', function () {
        ballBounce(this);
    });
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

setInterval( () => {
    ballBounce(array[getRandomInt(12)]);
}, 10000);