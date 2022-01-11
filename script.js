//функция для выбора нужного сколения к словам "секунда, минута, час, день, год" в зависимости от числа
function switchWord (value, word) {
    let value1,
        words = {
            'second' : ['секунда',"секунд", "сенкунды"],
            'minut' : ['минута', "минут", "минуты"],
            'hour' : ['час', "часов", "часа"],
            'day' : ['день',"дней","дня"],
            "year" : ['год', "лет", "года"]
        };

    value = Math.abs(value) % 100;
    value1 = value % 10;
    
    return words[word][ (value > 4 && value < 21 || value1 == 0 || value1 > 4 && value1 < 10) ? 1 : value1 > 1 && value1 < 5 ? 2 : 0 ];
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
        day_1_DOM = document.querySelector(".day .card-1"), //первая цифра числа "день"
        day_2_DOM = document.querySelector(".day .card-2"), //вторая цифра числа "день"
        day_3_DOM = document.querySelector(".day .card-3"), //третья цифра числа "день"
        hour_1_DOM = document.querySelector(".hour .card-1"), //первая цифры числа "час"
        hour_2_DOM = document.querySelector(".hour .card-2"), //вторая цифры числа "час"
        min_1_DOM = document.querySelector(".min .card-1"), //первая цифры числа "минута"
        min_2_DOM = document.querySelector(".min .card-2"), //втора цифры числа "минута"
        sec_1_DOM = document.querySelector(".sec .card-1"), //первая цифры числа "секунда"
        sec_2_DOM = document.querySelector(".sec .card-2"), //вторая цифры числа "секунда"
        name_day = document.querySelector(".day .name"), //титл день
        name_hour = document.querySelector(".hour .name"), //титл часы
        name_min = document.querySelector(".min .name"), //титл минуты
        name_sec = document.querySelector(".sec .name"), //титл секунды
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

            day_1_DOM.innerHTML = d > 9 ? String(d)[0] : 0;
            hour_1_DOM.innerHTML = h > 9 ? String(h)[0] : 0;
            min_1_DOM.innerHTML = min > 9 ? String(min)[0] : 0;
            sec_1_DOM.innerHTML = sc > 9 ? String(sc)[0] : 0;
            
            day_2_DOM.innerHTML = d > 9 ? String(d)[1] : d;
            hour_2_DOM.innerHTML = h > 9 ? String(h)[1] : h;
            min_2_DOM.innerHTML = min > 9 ? String(min)[1] : min;
            sec_2_DOM.innerHTML = sc > 9 ? String(sc)[1] : sc;

            if (String(d).length > 2) {
                day_3_DOM.style = "display: block;";
                document.querySelector(".day").style = "grid-template-columns: 1fr 1fr 1fr;"
                day_3_DOM.innerHTML = String(d)[2];
            } else {
                day_3_DOM.style = "display: none;";
            }

            name_day.innerHTML = switchWord(d, 'day');
            name_hour.innerHTML = switchWord(h, 'hour');
            name_min.innerHTML = switchWord(min, 'minut');
            name_sec.innerHTML = switchWord(sc, 'second');
            
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

stopwatch(2022,11,"31",23,59,59);

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
}

for (let i = 0; i < array.length; i++) {
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