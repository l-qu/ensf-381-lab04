async function retrieveData(url){
    try{
        var userData = await fetch(url);
        var jsonData = await userData.json();

        render(jsonData);

        return jsonData

    } catch (error){
        console.error("Error fetching data", error);
    }
}

function render(users){
    var userGridID = document.getElementById('userGrid');
    var firstRound = true;

    for (let i = 0; i < users.length; i++){
        if(firstRound == true){
            userGridID.innerHTML = `
            <article class="user-card">
                <h3>${users[i].first_name ?? ""}</h3>
                <p>first_name: ${users[i].first_name ?? ""}</p>
                <p>user_group: ${users[i].user_group ?? ""}</p>
                <p>id: ${users[i].id ?? ""}</p>
            </article>`;
            firstRound = false;
         }else{
            userGridID.innerHTML += `
            <article class="user-card">
                <h3>${users[i].first_name ?? ""}</h3>
                <p>first_name: ${users[i].first_name ?? ""}</p>
                <p>user_group: ${users[i].user_group ?? ""}</p>
                <p>id: ${users[i].id ?? ""}</p>
            </article>`;
         }
        }    
}

var userGridID = document.getElementById("userGrid")
var viewToggleBtn = document.getElementById('viewToggleBtn');
var deleteIdInput = document.getElementById('deleteIdInput');
var deleteBtn = document.getElementById('deleteBtn');
var sortByGroupBtn = document.getElementById('sortByGroupBtn');
var sortbyIdBtn = document.getElementById('sortByIdBtn');

var users = []
retrieveData("https://69a1da772e82ee536fa26007.mockapi.io/users_api").then(data => {
    users = data;
    console.log(users)
});

viewToggleBtn.addEventListener('click', (event) => {
    if (userGridID.classList.contains("grid-view")){
        userGridID.classList.replace("grid-view", "list-view");
    } else if(userGridID.classList.contains("list-view")){
        userGridID.classList.replace("list-view", "grid-view");
    }
});

deleteBtn.addEventListener('click', (event) =>{
    var idDelete = deleteIdInput.value;
    try{
        fetch(`https://69a1da772e82ee536fa26007.mockapi.io/users_api/${idDelete}`, {
            method: 'DELETE',
        }).then(response => {
            if (!response.ok){
                console.error("No user by that id was found.");
            }
        users = []
        retrieveData("https://69a1da772e82ee536fa26007.mockapi.io/users_api").then(data => {
            users = data;
            console.log(users)
            });
        })
    }catch(error){
        console.log("No user by that id was found.");
    } 
});

sortByGroupBtn.addEventListener('click', (event) => {
    users.sort((a, b) => {
        return a.user_group - b.user_group;
    });
    render(users);
});

sortByIdBtn.addEventListener('click', (event) => {
    users.sort((a, b) => {
        return a.id - b.id;
    });
    render(users);
});
