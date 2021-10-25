(function(){
    'use strict';
    console.log('reading js');

    let bodyTag = document.querySelector('body');
    let mainContainer = document.querySelector('#main-container');
    let header = document.querySelector('header');
    let myForm = document.querySelector('form');
    let inputArea = document.querySelectorAll('.input-area');
    let inputAreaBox = document.querySelectorAll('.input-area-boxes');
    let inputAreaLabel = document.querySelectorAll('.input-area-labels');
    let processIndicator = document.querySelectorAll('.indicator-fill');
    let processIndicatorCircle = document.querySelectorAll('.indicator-circle');
    let madLibParaInput = document.querySelectorAll('.input-words');
    let madLibPara = document.querySelectorAll('.madlib-para');
    let madLibs = document.querySelector('#madlibs');
    let nextBtn = document.querySelector('#next-btn');
    let backBtn = document.querySelector('#back-btn');
    let errorMessage = document.querySelector('#error-message');
    let scrollSign = document.querySelector('#scroll-sign');
    let footerTag = document.querySelector('footer');
    let processIdx;
    let preProcessIdx = 0;
    let submitBtn;
    let formData = [];
    let displayForm = true;
    let formValidator = false;
    

    // Initial Input Area
    if (processIdx == null) {
        processIdx = 0;
        inputArea[processIdx].style.visibility = 'visible';
        inputArea[processIdx].style.opacity = "1";
        processIndicator[processIdx].style.opacity = 1;
    }

    nextBtn.addEventListener('mousedown',function(e) {
        nextBtn.style.paddingLeft = '35px';
    });

    nextBtn.addEventListener('mouseup',function(e) {
        nextBtn.style.paddingLeft = '';
    });

    backBtn.addEventListener('mousedown',function(e) {
        backBtn.style.paddingRight = '35px';
    });

    backBtn.addEventListener('mouseup',function(e) {
        backBtn.style.paddingRight = '';
    });
    

    //Defining Functions

    function processIndicatorSwitch() {
        for (let i = 0; i < processIndicator.length; i++) {
            processIndicator[i].addEventListener('click', function(e){
                preProcessIdx = processIdx;
                processIdx = i;
                displayInputArea(processIdx, preProcessIdx);
            });
        }
    }
    
    function displayInputArea(idx, preIdx) {
        if (displayForm == true) {
            inputArea[preIdx].style.visibility = "hidden";
            inputArea[preIdx].style.opacity = "0";
            inputArea[processIdx].style.visibility = "visible";
            inputArea[processIdx].style.opacity = "1";
            inputAreaBox[processIdx].focus();
        } else{
            inputArea[processIdx].style.visibility = "hidden";
            inputArea[processIdx].style.opacity = "0";
        }
        if (idx == 0) {
            backBtn.style.visibility = 'hidden';
        } else {
            if(nextBtn.style.visibility == 'hidden') {
                backBtn.style.visibility = 'hidden';
            }else {
                backBtn.style.visibility = 'visible';
            }
        }
        if (preIdx > idx) {
            for (let i = preIdx; i > idx; i--) {
                processIndicator[i].style.opacity = 0;
            }
        } else if (preIdx < idx) {
            for (let i = preIdx + 1; i <= idx; i++) {
                processIndicator[i].style.opacity = 1;
            }
        }
    }

    function hideEverything() {
        displayForm = false;
        header.style.visibility = 'hidden';
        mainContainer.style.visibility = 'hidden';
        nextBtn.style.visibility = 'hidden';
        backBtn.style.visibility = 'hidden';
        myForm.style.visibility = 'hidden';
    }
    
    function submission() {
        if (processIdx == inputArea.length - 1) {
            nextBtn.setAttribute('type', 'submit');
            nextBtn.setAttribute('form','my-form');
            nextBtn.innerText = 'SUBMIT';
            nextBtn.style.paddingRight = '25px';
            submitBtn = nextBtn;
            submitBtn.addEventListener('click', function(e){
                e.preventDefault();
                let inputForm = document.querySelectorAll('input');
                for (let i = 0; i < inputForm.length; i++) {
                    if (!inputForm[i].value) {
                        formValidator = false;
                        formData =[];
                        i = inputForm.length;
                    } else {
                        formData.push(inputForm[i].value);
                        formValidator = true;
                    }
                }
                errorDisplay(formValidator);
                if (formValidator == true) {
                    hideEverything();
                    generateMadLibs(madLibParaInput, formData);
                    bodyTag.style.height = '5600px'
                    scrollSign.style.visibility = 'visible';
                    scrollSign.style.opacity = 1;
                    madLibs.style.visibility = 'visible';
                    footerTag.className = 'footer-vert';
                }
            });
        }
    }

    function labelAnimation(input) {
        if (input.getAttribute('class') == 'input-area-boxes' || input.getAttribute('class') == 'input-area-labels') {
            console.log(inputAreaBox[processIdx]);
            inputAreaBox[processIdx].focus();
            inputAreaBox[processIdx].style.border = 'border: 1px solid #77C0C6';
            inputAreaBox[processIdx].style.boxShadow = '0px 0px 5px rgba(0, 0, 0, 0.2)';
            inputAreaLabel[processIdx].style.color = '#77C0C6';
            inputAreaLabel[processIdx].style.fontSize = '16px';
            inputAreaLabel[processIdx].style.fontWeight = '500';
            inputAreaLabel[processIdx].style.top = '30%';
            inputAreaLabel[processIdx].style.cursor = 'pointer';
        }
        
        if (input.getAttribute('id') == 'my-form' || input.getAttribute('id') == 'main-container' ) {
            inputAreaBox[processIdx].value = '';
            inputAreaBox[processIdx].style.border = '';
            inputAreaBox[processIdx].style.boxShadow = '';
            inputAreaLabel[processIdx].style.color = '';
            inputAreaLabel[processIdx].style.fontSize = '';
            inputAreaLabel[processIdx].style.fontWeight = '';
            inputAreaLabel[processIdx].style.top = '';
            inputAreaLabel[processIdx].style.cursor = '';
        }
    }

    function errorDisplay(validator) {
        if (validator == false) {
            errorMessage.style.visibility = 'visible';
            errorMessage.style.opacity = 1;
            nextBtn.style.backgroundColor = 'red';
            nextBtn.style.border = '1px solid red';
            nextBtn.style.color = 'white';
        } else {
            errorMessage.style.visibility = 'hidden';
            errorMessage.style.opacity = 0;
            nextBtn.style.backgroundColor = '';
            nextBtn.style.border = '';
            nextBtn.style.color = '';
        }
        
    }

    function idxIncrement() {
        preProcessIdx = processIdx;
        if (inputAreaBox[processIdx].value == '' || inputAreaBox[processIdx].value == null) {
            formValidator = false;
        } else {
            formValidator = true;
            if (processIdx < inputArea.length - 1) {
                processIdx++;
                // backBtn.style.visibility = 'visible';
            }
        }
        errorDisplay(formValidator);
    }

    function idxDecrement() {
        preProcessIdx = processIdx;
        if (processIdx > 0) {
            processIdx--;
        }
        if (processIdx == 0) {
            backBtn.style.visibility = 'hidden';
        }
    }

    function resumeNextButton() {
        if (processIdx == inputArea.length - 1) {
            nextBtn.setAttribute('type', 'button');
            nextBtn.innerText = 'NEXT >';
            nextBtn.style.paddingRight = '';
        }
    }

    function generateMadLibs(madParaInput, data) {
        for (let i = 0; i < data.length; i++) {
            madParaInput[i].innerText = data[i];
        }
    }

    function madlibDisplay(idx) {
        if (idx > 0){
            madLibPara[idx-1].style.opacity = 0;
            madLibPara[idx-1].style.visibility = 'hidden';
        }

        if (idx < madLibPara.length - 1){
            madLibPara[idx+1].style.opacity = 0;
            madLibPara[idx+1].style.visibility = 'hidden';   
        }
        madLibPara[idx].style.opacity = 1;
        madLibPara[idx].style.visibility = 'visible';
    }

    function scrollDisappear() {
        scrollSign.style.visibility = 'hidden';
        scrollSign.style.opacity = 0;
    }

    //functions
    processIndicatorSwitch();

    //Events Listeners

    document.addEventListener('keydown', function(e){
        if (e.key == 'Enter' || e.key == 'Tab' || e.key == 'ArrowRight') {
            idxIncrement();
            displayInputArea(processIdx, preProcessIdx);
            submission();
        }
        if (e.key == 'ArrowLeft') {
            resumeNextButton();
            idxDecrement();
            displayInputArea(processIdx, preProcessIdx);
        }
    });

    document.addEventListener('click', function(evt) {
        let input = evt.target;
        if (input.getAttribute('id') == 'next-btn') {
            idxIncrement();
            displayInputArea(processIdx, preProcessIdx);
            submission();
            
        }

        if (input.getAttribute('id') == 'back-btn') {
            resumeNextButton();
            idxDecrement();
            displayInputArea(processIdx, preProcessIdx);
        }
        labelAnimation(input);
    });
    
    window.addEventListener('scroll',function(){
        let pageTop = window.pageYOffset;
        let idx;
        switch (true) {
            case pageTop < 600 : 
                bodyTag.className = 'bkg-1';
                idx = 0;
                scrollDisappear();
                madlibDisplay(idx);
                break;
            case pageTop < 1200 : 
                bodyTag.className = 'bkg-2';
                idx = 1;
                madlibDisplay(idx);
                break;
            case pageTop < 1800 :
                bodyTag.className = 'bkg-3';
                idx = 2;
                madlibDisplay(idx);
                break;
            case pageTop < 2400 : 
                bodyTag.className = 'bkg-4';
                idx = 3;
                madlibDisplay(idx);
                break;
            case pageTop < 3000 : 
                bodyTag.className = 'bkg-5';
                idx = 4;
                madlibDisplay(idx);
                break;
            case pageTop < 3600 : 
                bodyTag.className = 'bkg-6';
                idx = 5;
                madlibDisplay(idx);
                break;
            case pageTop < 4200 : 
                bodyTag.className = 'bkg-7';
                idx = 6;
                madlibDisplay(idx);
                break;
            case pageTop < 4800 : 
                bodyTag.className = 'bkg-8';
                idx = 7;
                madlibDisplay(idx);
                madLibPara[idx].addEventListener('click',function(){location.reload()});
                break;
            default : bodyTag.className = 'bkg-8';
        }
    });

}());