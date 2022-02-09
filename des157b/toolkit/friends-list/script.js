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
    const inputs = document.querySelectorAll('#add-friend input:not([type=submit])');

    
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

    async function addFriend() {
        console.log('addFriends');
        const newFriend = {};
        for( let i = 0; i < inputs.length; i++) {
            let key = inputs[i].getAttribute('name');
            let value = inputs[i].value;
            newFriend[key] = value;
        }

        if (newFriend.fname != '' && newFriend.fname != '' && newFriend.email != '') {
            const myNewFriend = new Parse.Object('Friends');
            myNewFriend.set('lname', newFriend.lname);
            myNewFriend.set('fname', newFriend.fname);
            myNewFriend.set('email', newFriend.email);
            myNewFriend.set('facebook', newFriend.facebook);
            myNewFriend.set('instagram', newFriend.instagram);
            myNewFriend.set('twitter', newFriend.twitter);
            myNewFriend.set('linkedin', newFriend.linkedin);
            try {
                const result = await myNewFriend.save();
                // Access the Parse Object attributes using the .GET method
                resetFormFields();
                addFriendForm.className = 'add-friend-offscreen';
                console.log('Friends created', result);
                friendList.innerHTML = '';
                displayFriends();
            } catch (error) {
            console.error('Error while creating Friends: ', error);
            }
        } else {
            addFriendForm.className = 'add-friend-offscreen';
        }
    }

    function resetFormFields() {
        document.getElementById('fname').value = '';
        document.getElementById('lname').value = '';
        document.getElementById('email').value = '';
        document.getElementById('facebook').value = 'https://www.facebook.com';
        document.getElementById('twitter').value = 'https://www.twitter.com';
        document.getElementById('instagram').value = 'https://www.instagram.com';
        document.getElementById('linkedin').value = 'https://www.linkedin.com';
    }

    async function updateFriend(friendID) {
        const query = new Parse.Query('Friend');
        try {
            // here you put the objectId that you want to update
            const object = await query.get(`${friendID}`);
            object.set('myCustomKey1Name', 'new value');
            try {
                const response = await object.save();
                // You can use the "get" method to get the value of an attribute
                // Ex: response.get("<ATTRIBUTE_NAME>")
                // Access the Parse Object attributes using the .GET method
                console.log(response.get('myCustomKey1Name'));
                console.log('MyCustomClassName updated', response);
            } catch (error) {
            console.error('Error while updating ', error);
            }
        } catch (error) {
            console.error('Error while retrieving object ', error);
        }
    }

    function setForm(friendID) {
        
    }
    
    // ********************* Event Listners *********************
    newBtn.addEventListener("click", function(event){
        event.preventDefault();
        addFriendForm.className = 'add-friend-onscreen';
       
    });

    addFriendForm.addEventListener('submit', function(event){
        event.preventDefault();
        // addFriendForm.className = 'add-friend-offscreen';
        addFriend();
    });

    document.addEventListener('click', function(e) {
        console.log(e);
        if(e.target.matches('.fa-edit')) {
            editFriendForm.className = 'edit-friend-onscreen';
            const thisFriendID = e.target.parentElement.getAttribute('id').slice(2);
            console.log(thisFriendID);
            setForm(thisFriendID);
        }
    },false)

    editFriendForm.addEventListener('submit', function(event){
        event.preventDefault();
        //editFriendForm.className = 'edit-friend-offscreen';
        // updateFriend();
    });
 
})();