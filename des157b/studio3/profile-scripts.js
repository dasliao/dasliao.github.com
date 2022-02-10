(function(){
    // ************************ Vars & DOM *****************************
    let currentQuote, currentAuthor, currentUrl;
    let currentUser;
    let quoteRecords;

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
        gettingQuote();
    })

    document.getElementById('save-quote').addEventListener('click', function(){
            currentQuote = document.getElementById('quote').innerText;
            currentAuthor = document.getElementById('author').innerText;
            currentUrl = document.getElementById('author').href;
            console.log(currentQuote, currentAuthor, currentUrl);
            savingQuote(currentQuote, currentAuthor, currentUrl);
    });

    document.getElementById('saved-quotes-btn').addEventListener('click',async function(){
        quoteRecords = await getQuoteRecords(); 
        if(quoteRecords) {
            for(let i = 0; i < quoteRecords.length; i++) {
                let div = document.createElement('div');
                div.setAttribute('id', `quote-${i}`);
                div.className = 'quotes-box';
                let q = document.createElement('p');
                let a = document.createElement('a');
                q.className = 'quotes';
                a.className = 'authors';
                q.innerText = quoteRecords[i].quote;
                a.innerText = quoteRecords[i].author;
                a.href = quoteRecords[i].url;
                div.appendChild(q);
                div.appendChild(a);
                document.getElementById('saved-quotes').appendChild(div);
            }
            document.getElementById('right').className = 'hidden';
            document.getElementById('saved-quotes').removeAttribute('class');
        }
        
    });

    document.getElementById('todays-quotes-btn').addEventListener('click',function(){
        document.getElementById('saved-quotes').className = 'hidden';
        document.getElementById('right').removeAttribute('class');
        document.getElementById('saved-quotes').innerHTML = '';
    });

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
                currentUser = loggedInUser;
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
            const response = await fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "quotes15.p.rapidapi.com",
                    "x-rapidapi-key": "daee9edf21mshb6d5e74c61fe7f3p117ed0jsn7fdd1eccd5ba"
                }
            });  
            const quote = await response.json();
            console.log(quote);
            document.getElementById('quote').innerText = quote.content;
            document.getElementById('author').innerText = quote.originator.name;
            document.getElementById('author').href = quote.originator.url;
            return quote;
        }catch(error) {
            console.log('Quote', error);
        }
    }

    async function savingQuote(quote, author, url) {
        const User = new Parse.User();
        const query = new Parse.Query(User);      
        
        try {
            let current = {
                'quote': quote,
                'author': author,
                'url':url
            }
            let user = await query.get(currentUser.id);

            let quotes = await user.get('quotesaved');
            console.log(quotes);
            if(quotes) {
                let checkDup = false;
                for(let i = 0; i < quotes.length; i++) {
                    if (quotes[i].quote === current.quote) {
                        checkDup = true;
                        break;
                    }
                }
                if(!checkDup) {
                    quotes.push(current);
                }
            } else {
                quotes = [current]
            }
            // console.log(quotes);
            user.set('quotesaved', quotes);
            try {
                // Saves the user with the updated data
                let response = await user.save();
                console.log('Updated user', response);
                return quotes;
              } catch (error) {
                console.error('Error while updating user', error);
            }
        } catch(error) {
            console.log('Saving Quote', error)
        }
    }
    
    async function getQuoteRecords() {
        const User = new Parse.User();
        const query = new Parse.Query(User);
        try {
            let user = await query.get(currentUser.id);
            let quotes = await user.get('quotesaved');
            return quotes;
        } catch(error) {
            console.log('Getting Records', error);
        }
    }

})();