(function() {
    'use strict';
    console.log('reading js');

    const container = document.querySelector('#container');
    const thePath = document.querySelectorAll('path');
    const theBuses = document.querySelectorAll('.st1');
    const theCurbs = document.querySelectorAll('.st0');
    const muTopImg = document.querySelector('#mu-top');
    const muTrace = document.querySelector('#mu-trace');
    const theStart = document.querySelector('.start');
    


    console.log(theBuses);
    console.log(muTopImg);
    console.log(muTrace);
    console.log(theStart);

    window.addEventListener('load', function() {
        let pageLefts = [];
        let pageLeft;
        let counter = 1;
        let prevCounter = 1;
        let doneResizing;
		let exitDir;
		let enterDir;

        const preLoader = document.querySelector('.mu-on-start');
        preLoader.className = 'mu-after-load';

        window.addEventListener('scroll', function(){
            
        });
    });
    
    

    theBuses.forEach(function (eachBus) {
        console.log(eachBus);
        eachBus.addEventListener('mouseover', function(){
            eachBus.style.opacity = 1;
        });
        eachBus.addEventListener('mouseout', function(){
            eachBus.style.opacity = 0;
        });
        eachBus.addEventListener('click', zoomPhoto);
    });

    function zoomPhoto(event) {
        const thisSpot = event.target.id;
        console.log(thisSpot);
        zoomMUImageClassName(thisSpot);
    }

    function zoomMUImageClassName(cName) {
        muTopImg.className = cName;
        muTopImg.setAttribute('src', 'images/mu-bw.jpg');
        muTrace.setAttribute('class', cName);
        theCurbs.forEach(function(eachCurb) {
            eachCurb.style.opacity = 1;
        })
    }

    

})();