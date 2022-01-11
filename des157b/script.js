(function() {
    'use strict';

    const button = document.querySelector('button');
    const main = document.querySelector('main');
    const side = document.querySelector('#side');
    const sections = document.querySelectorAll('section');
    const lists = document.querySelectorAll('section li');
    // const scrollContainer = document.querySelector("main");
    let mode = 'light';
    let satAndLight = '55%, 70%';
    let hueList = [];
    var randomHue;
    // scrollContainer.addEventListener("wheel", (evt) => {
    //     evt.preventDefault();
    //     scrollContainer.scrollLeft += evt.deltaY;
    // });

    console.log(Math.floor(Math.random()*(359-1) + 1));
    
    colorTheList(satAndLight);
    
    button.addEventListener('click', function() {
        if (mode === 'light') {
            main.className = 'switch';
            button.className = 'switch';
            side.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'dark';
            colorTheList(mode);
        } else if (mode === 'dark'){
            main.removeAttribute('class');
            button.removeAttribute('class');
            side.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'light';
            colorTheList(mode);
        }
    })


    function colorTheList(brightness) {
        hueList = [`${Math.floor(Math.random()*(359-1) + 1)}`];
        if(brightness === 'dark') {
            satAndLight = '45%, 45%';
        } else if (brightness === 'light') {
            satAndLight = '55%, 70%';
        }
        for(let i = 0; i < lists.length; i++) {
            randomHue = Math.floor(Math.random()*(359-1) + 1);
            lists[i].style.backgroundColor = `hsl(${hueCheck(randomHue)}, ${satAndLight})`;
        }
    }

    function hueCheck(hue) {
        for(let i = 0; i < hueList.length; i++) {
            if (hue == hueList[i]) {
                hue = Math.floor(Math.random()*(359-1) + 1);
                hueCheck(hue);
            }
        }
        return hue;
    }




})();