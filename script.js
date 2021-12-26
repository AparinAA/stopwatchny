function stopwatch (...args) {

    
    const inValid = [...args].some( (arg) => { return isNaN(Number(arg)) }) || (arguments.length ? false : true);
    if ( inValid ) {
        console.info("Invalid Date");
        return;
    }

    let date = new Date(...args),
        // DOM-элемнты секундамера
        // ==================================================
        day_1_DOM = document.querySelector(".day .card-1"),
        day_2_DOM = document.querySelector(".day .card-2"),
        hour_1_DOM = document.querySelector(".hour .card-1"),
        hour_2_DOM = document.querySelector(".hour .card-2"),
        min_1_DOM = document.querySelector(".min .card-1"),
        min_2_DOM = document.querySelector(".min .card-2"),
        sec_1_DOM = document.querySelector(".sec .card-1"),
        sec_2_DOM = document.querySelector(".sec .card-2"),
        name_day = document.querySelector(".day .name"),
        name_min = document.querySelector(".min .name"),
        name_hour = document.querySelector(".hour .name"),
        name_sec = document.querySelector(".sec .name"),
        // ==================================================
        sec, // все остаточное время в секундах
        sc, //текущие секунды
        min, // текущие минуты
        h, // текущие часы
        d, // текущие дни

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

            name_day.innerHTML = d < 5 && d > 0 ? "дня" : "дней";
            name_hour.innerHTML = h < 5 && h > 0 ? "часа" : "часов";
            name_min.innerHTML = min < 5 && min > 0 ? "минуты" : "минут";
            name_sec.innerHTML = sc < 5 && sc > 0 ? "секунды" : "секунд";
            
            if (!d && !h && !min && !sc) {
                clearTimeout(timeId);
            }
            else{
                timeId = setTimeout (tick, 1000, date);
            }
        },0, date);

}

stopwatch(2021,11,"31",23,59,59);