(function(){
    function requestUser() {
        var user;

        var req = new XMLHttpRequest();
        req.addEventListener("error", handleError);
        req.open('GET', 'https://randomuser.me/api/', false); 
        req.send(null);

        if(req.status == 200) user = JSON.parse(req.responseText).results;
        
        return user[0];
    }

    function handleError() {
        const errorElement = document.createElement('h1');
        errorElement.innerHTML="Unexpected error has occurred. Try to reload the page."
        document.body.appendChild(errorElement);
    }

    function User(id, userFullName, userNickname, userAge, userStatus, userProfilePicture, userDescription) {
        this.id = id;
        this.userFullName = userFullName;
        this.userNickname = userNickname;
        this.userAge = userAge;
        this.userStatus = (userStatus==1) ? 'ONLINE' : 'OFFLINE';
        this.userStatusColor = (userStatus==1) ? 'green' : 'red';
        this.userProfilePicture = userProfilePicture;
        this.userDescription = userDescription;

        const userCardColors = ['purple', '#001f24', '#152d32', '#16213e', '#1E5F74', '#84142d']
        const userCard = document.createElement('div');

        this.createCard = () => {
            const cardColor = userCardColors[Math.round(Math.random()*(userCardColors.length-1))]

            userCard.className="card";
            userCard.style.backgroundColor = cardColor;
            userCard.innerHTML=`
            <div class="card-left">
                <img src="${this.userProfilePicture}" class="card-image"></img>
                <div class="card-user-name">
                    <span class="span-user-full-name">
                        ${this.userFullName}
                    </span>
                </div>
            </div>
            <div class="card-right">
                <p class="card-user-nickname">
                    Nick: 
                    <span class="span-user-nickname">
                        ${this.userNickname}
                    </span>
                </p>
                <p class="card-user-age">
                    Age: 
                    <span class="span-user-age">
                        ${this.userAge}
                    </span>
                </p>
                <p class="card-user-status">
                    Currently 
                    <span class="status">${this.userStatus}</span> 
                    <span class="circle circle-${id}">&#9679</span>
                </p>
            </div>

            <div class="card-text card-text-${this.id}">
                ${this.userDescription}
            </div>
            `;
            document.body.appendChild(userCard);

            document.querySelector(`.circle-${this.id}`).style.color=this.userStatusColor;

            const userCardText = document.querySelector(`.card-text-${this.id}`);
            userCard.onmouseover = function() {
                userCardText.style.right = '-100%';
            }
            userCard.onmouseout = function() {
                userCardText.style.right = '0';
            }
        };
    }

    function generateUser() {
        const u = requestUser();

        var fullname = u.name.first + ' ' + u.name.last;
        var fullname = (fullname.length<16) ? fullname : u.name.first+' Blue';
        //const profilePicture = (u.gender=="male") ? "pictures/male.png" : "pictures/female.png";

        const user = new User(
            u.login.uuid,
            fullname,
            u.login.username,
            u.dob.age,
            Math.round(Math.random()*1),
            u.picture.medium,
            `
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque quae ut a consectetur saepe non maxime fugiat ratione, necessitatibus tempore tenetur incidunt est cumque! Corporis explicabo culpa nihil incidunt eaque?
            `
        );
        return user;
    }

    generateUser().createCard();
    generateUser().createCard();
}());