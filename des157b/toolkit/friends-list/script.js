// JS here
(function(){
    'use strict';
    console.log('reading js');

    // ********************* Initializer *********************
    Parse.initialize("yS83rRI9kDVEC9f1widse8jE3RtgRqfjm7LU5j1O","nvfswf8EQZhaWEB2hZdPoxHUel8WZ3lVq4lvx8Db"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://parseapi.back4app.com/'
    
    // ********************* Vars % DOMs *********************
    const newBtn = document.getElementById('newbtn');
    const editBtns = document.querySelectorAll('.fa-edit');
    const addFriendForm = document.getElementById("add-friend");
    const editFriendForm = document.getElementById("edit-friend");
    const friendList = document.querySelector('main ol');
    
    // ********************* Execusion *********************
    displayFriends();
    // ********************* Functions *********************
    async function displayFriends() {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        const results = await query.ascending('lname').find();
        for (const object of results) {
            // Access the Parse Object attributes using the .GET method
            const id = object.id;
            const lname = object.get('lname');
            const fname = object.get('fname');
            const email = object.get('email');
            const facebook = object.get('facebook');
            const instagram = object.get('instagram');
            const twitter = object.get('twitter');
            const linkedin = object.get('linkedin');


            const theListItem = document.createElement('li');
            theListItem.setAttribute("id", `r-${id}`);
            theListItem.innerHTML = `<div class="name">
                                        ${fname} ${lname} 
                                    </div>
                                    <div class="email">
                                        <i class="fas fa-envelope-square"></i> ${email}
                                    </div>
                                    <div class="social">
                                        <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                                        <a href="${twitter}"><i class="fab fa-twitter-square"></i></a>
                                        <a href="${instagram}"><i class="fab fa-instagram"></i></a>
                                        <a href="${linkedin}"><i class="fab fa-linkedin"></i></a>
                                    </div>
                                    <i class="fas fa-edit"></i>
                                    <i class="fas fa-times-circle"></i>`
            friendList.append(theListItem);
        }
        
        console.log(results);
    }
    
    // ********************* Event Listners *********************
    newBtn.addEventListener("click", function(event){
        event.preventDefault();
        addFriendForm.className = 'add-friend-onscreen';
    });

    addFriendForm.addEventListener('submit', function(event){
        event.preventDefault();
        addFriendForm.className = 'add-friend-offscreen';
    });
    
    for (let i = 0; i < editBtns.length; i++) {
        console.log(editBtns[i]);
        editBtns[i].addEventListener('click', function(event){
            event.preventDefault();
            editFriendForm.className = 'edit-friend-onscreen';
        });
    }
    editFriendForm.addEventListener('submit', function(event){
        event.preventDefault();
        editFriendForm.className = 'edit-friend-offscreen';
    });
 
})();