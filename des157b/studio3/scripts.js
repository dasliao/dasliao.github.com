(function(){
    console.log('reading js');

    // ************************ Vars & DOM *****************************


    // ************************ Initiate *****************************
    Parse.initialize("1KeaItVqFLSYamBOBEHQttvnIMbJ9HMDsil2YPSz", "rd2kGzZZf8TPYwbMmCe4rfqFgUSpaJxemTuVGr7H"); 
    Parse.serverURL = "https://parseapi.back4app.com/";


    // ************************ Excution *****************************



    // ************************ Event Listner *****************************
    // document.getElementById('register').addEventListener('submit', function(event){
    //     event.preventDefault();
    //     const username = document.getElementById('username').value;
    //     const password = document.getElementById('password').value;
    //     const email = document.getElementById('email').value;
    //     console.log(`${username} ${password} ${email}`);
    //     registerAccount(username, password, email);
    // });

    // // ************************ Funtion *****************************
    // async function registerAccount(username,password,email) {
    //     const user = new Parse.User();
    //     user.set('username', username);
    //     user.set('email', email);
    //     user.set('password', password);

    //     try {
    //         let userResult = await user.signUp();
    //         console.log('User signed up', userResult);
    //     } catch (error) {
    //         console.error('Error while signing up user', error);
    //     }
    // }

})();