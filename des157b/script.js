(function() {
    'use strict';

    const button = document.querySelector('button');
    const main = document.querySelector('main');
    const side = document.querySelector('#side');
    const sections = document.querySelectorAll('section');
    const lists = document.querySelectorAll('section li');
    const listsLinks = document.querySelectorAll('section li a');
    // const scrollContainer = document.querySelector("main");
    let mode = 'light';
    let satAndLight = '55%, 70%';
    let textSatAndLight = '35%, 30%';
    let hueList = [];
    var randomHue;

    // scrollContainer.addEventListener("wheel", function(evt){
    //     evt.preventDefault();
    //     console.log('hi');
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
            textSatAndLight = '70%, 80%'
        } else if (brightness === 'light') {
            satAndLight = '55%, 70%';
            textSatAndLight = '35%, 30%'
        }
        for(let i = 0; i < lists.length; i++) {
            randomHue = Math.floor(Math.random()*(359-1) + 1);
            lists[i].style.backgroundColor = `hsl(${hueCheck(randomHue)}, ${satAndLight})`;
            listsLinks[i].style.color = `hsl(${hueCheck(randomHue)}, ${textSatAndLight})`;
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