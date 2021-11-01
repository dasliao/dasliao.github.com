(function() {
    'use strict';
    console.log('reading js');

    const container = document.querySelector('#container');
    const thePath = document.querySelectorAll('path');
    const theBuses = document.querySelectorAll('.st1');
    const muTopImg = document.querySelector('#mu-top');
    const muTrace = document.querySelector('#mu-trace');

    console.log(theBuses);
    console.log(muTopImg);
    console.log(muTrace);

    theBuses.forEach(function (eachBus) {
        console.log(eachBus);
        eachBus.addEventListener('mouseover', function(){
            eachBus.style.opacity = 1;
            eachBus.style.cursor = "pointer";
        });
        eachBus.addEventListener('mouseout', function(){
            eachBus.style.opacity = 0;
        });
        eachBus.addEventListener('click', zoomPhoto);
    });

    function zoomPhoto(event) {
        const thisSpot = event.target.id;
        console.log(thisSpot);
        switch(thisSpot) {
            case 'bus-g': 
                zoomMUImageClassName(thisSpot);
                break;
            case 'bus-b': 
                zoomMUImageClassName(thisSpot);
                break;
            case 'bus-p': 
                zoomMUImageClassName(thisSpot);
                break;  
            case 'bus-q': 
                zoomMUImageClassName(thisSpot);
                break;  
            case 'bus-z': 
                zoomMUImageClassName(thisSpot);
                break;  
            case 'bus-m': 
                zoomMUImageClassName(thisSpot);
                break;  
            case 'bus-k': 
                zoomMUImageClassName(thisSpot);
                break;  
            case 'bus-e': 
                zoomMUImageClassName(thisSpot);
                break;  
            case 'bus-f': 
                zoomMUImageClassName(thisSpot);
                break;  
            case 'bus-trip-1': 
                zoomMUImageClassName(thisSpot);
                break;  
            case 'bus-trip-2': 
                zoomMUImageClassName(thisSpot);
                break;  
            case 'bus-trip-3': 
                zoomMUImageClassName(thisSpot);
                break;  
            default: zoomMUImageClassName('start');
        }
    }

    function zoomMUImageClassName(cName) {
        muTopImg.className = cName;
        muTrace.setAttribute('class', cName);
    }

})();