(function(){
    'use strict';
    console.log('loading js');
    
    const filters = document.querySelectorAll(".filters");
    const filterContainer = document.querySelector("#filter-container");
    const myVideo = document.querySelector('#my-video');
    const pauseBtn = document.querySelector('.fa-pause');
    const expandBtn = document.querySelector('.fa-expand-alt');

    let playing = true;
    let timer = 0;


    let prefix = {
        start: [0, 3,],
        end: [2, 11.5],
        id: ['text-1','text-2'],
        class: ['hidden prefix', 'showing prefix']
    }

    let objects = {
        start: [3, 6, 9],
        end: [6, 9, 12],
        id: ['text-3','text-4','text-5'],
        class: ['hidden objects', 'showing objects']
    }

    const intervalID = setInterval(checkTime, 1000);
    
    // ****************************** Event Listeners ***********************************

    pauseBtn.addEventListener('click', function(){
        if(playing) {
            myVideo.pause();
            pauseBtn.className = 'fas fa-play';
        } else {
            myVideo.play();
            pauseBtn.className = 'fas fa-pause'; 
        }
        playing = !playing;
    });

    for(let i = 0; i< filters.length; i++) {
        filters[i].addEventListener('mouseenter', function(){
                for(let j = 0; j < filters.length; j++) {
                    if (j != i) {
                        filters[j].style.width = '10%';
                    }
                }
                filters[i].style.width = "70%";
                let randomPlayRate = Math.fround(Math.random() * (2-0.2) + 0.2);
                console.log(randomPlayRate);
                myVideo.playbackRate = randomPlayRate;
        });

        filters[i].addEventListener('mouseout', function(){
            for(let j = 0; j < filters.length; j++) {
                if (j !== i) {
                    filters[j].style.width = '';
                }
            }
            filters[i].style.width = "";
            myVideo.playbackRate = 1;
        }) 
    }

    expandBtn.addEventListener('click', function() {
        if(!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            expandBtn.className = 'fas fa-compress-alt';
        } else {
            document.exitFullscreen();
            expandBtn.className = 'fas fa-expand-alt';
        }
    });

    // ****************************** Functions *********************************** 


    function checkTime() {
        for(let i = 0; i < prefix.start.length; i++) {
            if (prefix.start[i] < myVideo.currentTime && myVideo.currentTime < prefix.end[i]) {
                document.getElementById(`${prefix.id[i]}`).className = `${prefix.class[1]}`;
            } else {
                document.getElementById(`${prefix.id[i]}`).className = `${prefix.class[0]}`;
            }
        }

        for(let i = 0; i < objects.start.length; i++) {
            if (objects.start[i] < myVideo.currentTime && myVideo.currentTime < objects.end[i]) {
                document.getElementById(`${objects.id[i]}`).className = `${objects.class[1]}`;
                document.getElementById(`${objects.id[i]}`).style.animationName = 'objects-name-in';
            } else {
                document.getElementById(`${objects.id[i]}`).style.animationName = 'objects-name-out';
                document.getElementById(`${objects.id[i]}`).className = `${objects.class[0]}`;
            }
        }

    }

})();