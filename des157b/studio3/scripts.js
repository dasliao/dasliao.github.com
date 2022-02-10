(function(){
    console.log('reading js');

    // ************************ Vars & DOM *****************************


    // ************************ Initiate *****************************
    Parse.initialize("1KeaItVqFLSYamBOBEHQttvnIMbJ9HMDsil2YPSz", "rd2kGzZZf8TPYwbMmCe4rfqFgUSpaJxemTuVGr7H"); 
    Parse.serverURL = "https://parseapi.back4app.com/";


    // ************************ Excution *****************************
    checkLoggedIn();

    // ************************ Event Listner *****************************
    document.querySelector('#login-form').addEventListener('submit', function(event){
        event.preventDefault();
        console.log('logging in');
        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;
        console.log(`${username} ${password}`);
        logIn(username, password);
    });

    // ************************ Funtion *****************************
    async function logIn(username, password) {
        try {
            // Pass the username and password to logIn function
            let user = await Parse.User.logIn(username,password);
            const session = user.getSessionToken();
            setCookie('des157user', session, 1);
            // Do stuff after successful login
            console.log('Logged in user', user);
            window.location.assign('profile.html');
          } catch (error) {
            console.error('Error while logging in user', error);
            document.getElementById('error-message').className = 'visible';
            document.getElementById('error-message').innerText = error.message;
          }
    }
    
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        console.log(cname + "=" + cvalue + ";" + expires + ";path=/");
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    async function checkLoggedIn() {
        const s = getCookie('des157user');
        if(s) {
            try {
                const loggedInUser = await Parse.User.become(s);
                if(loggedInUser) {
                    window.location.assign('profile.html');
                }
            } catch(error) {
                console.log('Error', error);
            }
        }
    }

    function getCookie(cookieName) {
        let name = cookieName + "=";
        let cookieArray = document.cookie.split(';');
        for(let i = 0; i < cookieArray.length; i++) {
          let eachCookie = cookieArray[i];
          while (eachCookie.charAt(0) == ' ') {
            eachCookie = eachCookie.substring(1);
          }
          if (eachCookie.indexOf(name) == 0) {
            return eachCookie.substring(name.length, eachCookie.length);
          }
        }
        return "";
    }

})();