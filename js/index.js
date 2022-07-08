window.onload = function(){
const gitHubForm = document.querySelector('#github-form');
const userList = document.querySelector('#user-list');
const reposList = document.querySelector('#repos-list');

gitHubForm.addEventListener("submit", function(e){
    e.preventDefault();

    let searchInput = document.getElementById('search');

    fetch (`https://api.github.com/search/users?q=${searchInput.value}`)
    .then(response => response.json())
    .then(data =>{
        for (let i = 0; i < data.items.length; i++){
            const user = document.createElement("li");
            userList.appendChild(user);

            const userLink = document.createElement("a");
            userLink.innerText = data.items[i].login;
            userLink.href = data.items[i].url;
            user.appendChild(userLink);

            const avatar = document.createElement("img");
            avatar.src = data.items[i].avatar_url;
            user.appendChild(avatar);
            
        }
    })
    .catch (console.error());

    gitHubForm.reset();
})

};