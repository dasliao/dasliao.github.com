(function() {
    'use strict';
    console.log('reading js');
    const body = document.querySelector('body');
    const container = document.querySelector('#container');
    const theBuses = document.querySelectorAll('.st1');
    const theCurbs = document.querySelectorAll('.st0');
    const muTopImg = document.querySelector('#mu-top');
    const muTopImgTwo = document.querySelector('#mu-top-2');
    const muTrace = document.querySelector('#mu-trace');
    const theBkg = document.querySelector('#bkg');
    const explore = document.querySelector('#explore');
    const footer = document.querySelector('footer');
    const bkgText = document.querySelector('#bkg div');
    const header = document.querySelector('header');
    const headerText = document.querySelectorAll("header h1");

    
    window.onbeforeunload = function() {
        window.scrollTo(0,0); 
    }

    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
        body.style.overflow = 'hidden';
        const captions = document.querySelectorAll('article section');
        let secTops = [];
        let pageTop;
        let cnt = 1;
        let prevCnt = 1;
        let doneResizing;
        let exitDir;
        let enterDir;
        let currentSrc = muTopImg.getAttribute('src');
        let preSrc;
        
        const preLoader = document.querySelector('.mu-on-start');
        container.className = 'main-container-layout-after-load';
        preLoader.className = 'mu-after-load';
        footer.className = 'footer-after-load';

        const muImgAfterLoad = document.querySelector('.main-container-layout-after-load .mu-after-load .imgs');
        console.log(muImgAfterLoad);
        
        resetPage();

        explore.addEventListener('click', function(){
            explore.style.opacity = 0;
            body.style.overflow = 'auto';
            container.className = 'main-container-layout-before-scrolling';
            header.style.top = '3vh';
            header.style.left = "4vw";
            headerText.forEach(function(text){
                text.style.fontSize = '5vh';
                text.style.lineHeight = "7vh";
            });
            headerText[0].style.color = 'rgb(177, 100, 100)';
            footer.removeAttribute('class');
        });

        window.addEventListener('scroll', function(){
            if (cnt == prevCnt) {
                
                if (cnt == 3) {
                    preSrc = currentSrc;
                    currentSrc = 'images/mu-night-light.jpg';
                    muTopImgTwo.setAttribute('src', preSrc);
                    muTopImgTwo.style.opacity = 1;
                    muTopImgTwo.style.zIndex = 90;
                    muTopImg.style.zIndex = 50;
                    muTopImg.style.opacity = 1;
                    muTopImg.setAttribute('src', currentSrc);
                    muTopImgTwo.style.opacity = 0;
                    muTopImg.style.zIndex = 90;
                    muTopImgTwo.style.zIndex = 50;
                } else if (cnt == 2) {
                    muTopImg.setAttribute('src', 'images/mu-night.jpg');
                } else if (cnt == 5) {
                    muTopImg.setAttribute('src', 'images/mu-bw.jpg');
                } else if (cnt == 1) {
                    muTopImg.setAttribute('src', 'images/mu-day.jpg');
                    if (pageTop >= 700) {
                        bkgText.style.opacity = 0;
                    }
                } else if (cnt == 4 || cnt == 6) {
                    muTopImg.setAttribute('src', 'images/mu-day.jpg');
                }
                muTopImg.className = `imgs caption-${cnt}`;
                muTopImgTwo.className = `imgs caption-${cnt}`;
                muTrace.setAttribute('class', `imgs caption-${cnt}`);
                theBkg.className = `cls-${cnt}`;
                document.querySelectorAll(`.hotspot-${cnt}`).forEach(function(hotspot) {
                    hotspot.style.opacity = 1;
                });
            }
            container.className = 'main-container-layout-after-scrolling';
            pageTop = window.pageYOffset + 450;

            if (pageTop > secTops[cnt]) {
                cnt++;
            } else if (cnt > 1 && pageTop < secTops[cnt - 1]) {
                cnt--;
            }

            if (cnt != prevCnt) {
                muTopImg.className = `imgs caption-${cnt}`;
                muTopImgTwo.className = `imgs caption-${cnt}`;
                muTrace.setAttribute('class', `imgs caption-${cnt}`);
                theBkg.className = `cls-${cnt}`;
                lightupHotSpot(cnt,prevCnt);
                

                if (cnt > prevCnt) {
                    exitDir = 'slide out-focus out-up';
                    enterDir= 'slide on-focus in-up';
                } else {
                    exitDir = 'slide out-focus out-down';
                    enterDir= 'slide on-focus in-down';
                }
                captions[prevCnt-1].className = exitDir;
                captions[prevCnt-1].addEventListener('animationend', function() {
                    captions[cnt-1].className = enterDir;
                });
                prevCnt = cnt;
            }

            if (pageTop < 700 || pageTop == null) {
                bkgText.style.opacity = 1;
                theBkg.className = `cls-0`;
            }
        });

        function lightupHotSpot(cnt, pCnt) {
            document.querySelectorAll(`.hotspot-${cnt}`).forEach(function(hotspot) {
                hotspot.style.opacity = 1;
            });
            document.querySelectorAll(`.hotspot-${pCnt}`).forEach(function(hotspot) {
                hotspot.style.opacity = 0;
            });
        }

        window.addEventListener('resize', function () {
            clearTimeout(doneResizing);
            doneResizing = setTimeout(function () {
                resetPage();
            }, 500);
        });


        function resetPage() {
            secTops = [];

            captions.forEach(function(caption) {
                console.log(caption);
                secTops.push(Math.floor(caption.getBoundingClientRect().top) + window.pageYOffset);
                console.log(secTops.length);
            });
    
            const pagePos = window.pageYOffset + window.innerHeight + 100;
            cnt = 0;

            secTops.forEach(function(sec) {
                if (pagePos > sec) {
                    cnt++;
                }
            });
        }

        theBuses.forEach(function (eachBus) {
            console.log(eachBus);
            eachBus.addEventListener('mouseover', function(){
                eachBus.style.opacity = 1;
            });
            eachBus.addEventListener('mouseout', function(){
                if (container.className != 'main-container-layout-after-scrolling'){
                    eachBus.style.opacity = 0;
                }
            });
        });

    }); // finish the load event listner
    


})();