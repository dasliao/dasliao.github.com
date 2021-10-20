(function(){
    'use strict';
    console.log('reading js');

    var myForm = document.querySelector('#myForm');
    var allFormData = document.querySelectorAll('input[type=text]');
    var madLib = document.querySelector('#madlibs');

    myForm.addEventListener('submit', function(e){
        e.preventDefault();
        var company = document.querySelector('company').value;
        var noun1 = document.querySelector('noun1').value;
        var adjective1 = document.querySelector('adjective1').value;
        var verb1 = document.querySelector('verb1').value;
        
        if (company && noun1 && adjective1 && verb1) {
            myText = `This is your words ${company} ${noun1} ${adjective1} ${verb1}`;
        }else {
            myText = 'please complete the form!'
        }
        madLib.innerHTML = myText;

        for (var eachData of allFormData) {
            eachData.value = '';
        }

    });


}())