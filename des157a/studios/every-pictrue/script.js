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
    const theBkg = document.querySelector('#bkg');
    const leftArrow = document.querySelector('#left-arrow');
    const muContainer = document.querySelector('#mu-container');
    


    console.log(theBuses);
    console.log(muTopImg);
    console.log(muTrace);
    console.log(theStart);

    window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}

    window.addEventListener('load', function() {
        const captions = document.querySelectorAll('section')
        console.log(captions);
        let secTops = [];
        let pageTop;
        let cnt = 1;
        let prevCnt = 1;
        let doneResizing;
		let exitDir;
		let enterDir;

        const preLoader = document.querySelector('.mu-on-start');
        container.className = 'main-container-layout-after-load';
        preLoader.className = 'mu-after-load';
        
        console.log(`cnt1 ${cnt}`);
        resetPage();
        console.log(`cnt2 ${cnt}`);


        console.log(`left arrow ${leftArrow}`);

        leftArrow.addEventListener('click', function(){
            container.className = 'main-container-layout-before-scrolling';
        });

        window.addEventListener('scroll', function(){
            if (cnt == prevCnt) {
                if (cnt == 3) {
                    muTopImg.setAttribute('src', 'images/mu-night-light.jpg');
                } else if (cnt == 2) {
                    muTopImg.setAttribute('src', 'images/mu-night.jpg');
                } else if (cnt == 5) {
                    muTopImg.setAttribute('src', 'images/mu-bw.jpg');
                } else if (cnt == 1 || cnt == 4 || cnt == 6) {
                    muTopImg.setAttribute('src', 'images/mu-day.jpg');
                }
                muTopImg.className = `imgs caption-${cnt}`;
                muTrace.setAttribute('class', `imgs caption-${cnt}`);
                theBkg.className = `cls-${cnt}`;
                document.querySelectorAll(`.hotspot-${cnt}`).forEach(function(hotspot) {
                    hotspot.style.opacity = 1;
                });
            }
            container.className = 'main-container-layout-after-scrolling';
            pageTop = window.pageYOffset + 450;
            

            // console.log(`cnt ${cnt}`);
            // console.log(`PTop ${pageTop}`);
            // console.log(`secTop ${secTops[cnt]}`);

            if (pageTop > secTops[cnt]) {
				cnt++;
                console.log(`scrolling down ${cnt}`);
			} else if (cnt > 1 && pageTop < secTops[cnt - 1]) {
				cnt--;
                console.log(`scrolling up ${cnt}`);
			}

            // console.log(cnt);

            // calcSecWidth();

            if (cnt != prevCnt) {
                muTopImg.className = `imgs caption-${cnt}`;
                muTrace.setAttribute('class', `imgs caption-${cnt}`);
                theBkg.className = `cls-${cnt}`;
                lightupHotSpot(cnt,prevCnt);
                

                if (cnt > prevCnt) {
                    exitDir = 'slide out-focus out-up';
                    enterDir= 'slide on-focus in-up';
                    // console.log(`scrolling down`);
                } else {
                    exitDir = 'slide out-focus out-down';
                    enterDir= 'slide on-focus in-down';
                    // console.log(`scrolling up`);
                }

                // console.log(`current counter ${cnt}`);
                // console.log(`previous counter ${prevCnt}`);
                captions[prevCnt-1].className = exitDir;
                captions[prevCnt-1].addEventListener('animationend', function() {
                    captions[cnt-1].className = enterDir;
                });
                console.log(`cnt1 ${cnt}`);
                console.log(`precnt1 ${prevCnt}`);
                prevCnt = cnt;
                console.log(`cnt2 ${cnt}`);
                console.log(`precnt2 ${prevCnt}`);
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

        function calcSecWidth() {
            let secWidth;
            let top;
            let bottom;
            let topLength;
            let bottomLength;
            let rectHeight;
            let height = Math.floor(window.innerHeight);
            captions.forEach(function(caption) {
                top = Math.floor(caption.getBoundingClientRect().top);
                bottom = Math.floor(caption.getBoundingClientRect().bottom);
                rectHeight = bottom - top;
                topLength = height-top;
                bottomLength = height-bottom;
                // console.log(`current top ${top}`);
                // console.log(`current bottom ${bottom}`);
                // console.log(`current bottomLength ${bottomLength}`);
                if (topLength > 0 && topLength < height) {
                    if (top >= bottomLength){
                        if (top <= height) {
                            secWidth = Math.floor(30 + 5 * (((((rectHeight)/2) + top))/(height/2)-1));
                            caption.style.width = `${secWidth}vw`;
                            console.log(`current secWith ${secWidth}`);
                        }
                    } else {
                        if (top > 0) {
                            secWidth = Math.floor(35 - 5 * (((((rectHeight)/2) + top))/(height/2)));
                            caption.style.width = `${secWidth}vw`;
                            console.log(`current secWith ${secWidth}`);
                        } else if (top < 0 && top > -(rectHeight/2)) {
                            secWidth = Math.floor(35 - 5 * (((((rectHeight)/2) - top))/(height/2)));
                            caption.style.width = `${secWidth}vw`;
                            console.log(`current secWith ${secWidth}`);
                        }
                    }
                }
                
            });
        }



        function resetPage() {
            secTops = [];

            captions.forEach(function(caption) {
                console.log(caption);
                let temp = caption.getBoundingClientRect().top
                secTops.push(Math.floor(caption.getBoundingClientRect().top) + window.pageYOffset);
                console.log(`client bounding ${caption.getBoundingClientRect().top}`);
            });
    
            const pagePos = window.pageYOffset + window.innerHeight + 100;
            cnt = 0;
            
            console.log(`pageTop Yoffset +250 is ${pagePos}`);

            secTops.forEach(function(sec) {
                console.log(`this is ${sec}`);
                if (pagePos > sec) {
                    cnt++;
                }
            });
        }

    });
    
    
    


    theBuses.forEach(function (eachBus) {
        console.log(eachBus);
        eachBus.addEventListener('mouseover', function(){
            eachBus.style.opacity = 1;
        });
        eachBus.addEventListener('mouseout', function(){
            eachBus.style.opacity = 0;
        });
    });

    

})();