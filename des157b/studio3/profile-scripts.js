(function(){
    // ************************ Vars & DOM *****************************


    // ************************ Initiate *****************************
    Parse.initialize("1KeaItVqFLSYamBOBEHQttvnIMbJ9HMDsil2YPSz", "rd2kGzZZf8TPYwbMmCe4rfqFgUSpaJxemTuVGr7H"); 
    Parse.serverURL = "https://parseapi.back4app.com/";


    // ************************ Excution *****************************
    checkLoggedIn();
    gettingQuote();

    // ************************ Event Listner *****************************
    document.getElementById('logout').addEventListener('click', async function(){
        try {
            await Parse.User.logOut();
            document.cookie = "des157user=; expires=Sun, 04 Feb 1900 00:00:00 UTC; path=/;"
            setTimeout(function(){
                window.location.assign('index.html');
            },500)
        }catch(error) {
            console.log('logout Error', error);
        }
    });

    document.getElementById('shuffle-quote').addEventListener('click',function() {
        document.getElementById('shuffle-quote').reload();
    })

    // ************************ Funtion *****************************
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

    async function checkLoggedIn(){
        const s = getCookie('des157user');
        if(s){
          try{
            const loggedInUser = await Parse.User.become(s);
            if(loggedInUser){
                console.log(loggedInUser);
                document.getElementById('profile-pic').setAttribute('src', `https://picsum.photos/seed/${loggedInUser.id}/200`);
                setTimeout(function() {
                    document.getElementById('profile-pic').style.opacity = 1;
                },500)
                document.getElementById('name').innerText = `@${loggedInUser.getUsername()}`;
            } else {
                
            }
          } catch(error){
            console.log(`Error: ${error.code} ${error.message}`);
          }
        }
        else {
            window.location.assign('index.html')
        }
    }

    async function gettingQuote() {
        try {
            let response = await fetch('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?');
            let quote = await promise.json();
            console.log(quote);
        }catch(error) {
            console.log('Quote', error);
        }
    }

    
})();