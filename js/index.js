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
            user.style.textAlign = "center";
            userList.appendChild(user);

            const avatar = document.createElement("img");
            avatar.src = data.items[i].avatar_url;
            avatar.style.width = "25%";
            avatar.style.marginRight = "auto";
            avatar.style.marginLeft = "auto";
            user.appendChild(avatar);
            
            user.appendChild(document.createElement("br"));

            const userLink = document.createElement("a");
            userLink.innerText = data.items[i].login;
            userLink.style.font = "2rem";
            userLink.href = data.items[i].html_url;
            user.appendChild(userLink);

            user.appendChild(document.createElement("br"));
        }
    })
    .catch (console.error());

    gitHubForm.reset();
});

userList.addEventListener("click", function(e){
    if (e.target.tagName === "IMG"){
        reposList.innerHTML = "";
        fetch (`https://api.github.com/users/${e.target.parentNode.innerText}/repos`)
        .then (response => response.json())
        .then (data =>{
            for (let i = 0; i < data.length; i++){
                const repo = document.createElement("li");
                reposList.appendChild(repo);

                const repoLink = document.createElement("a");
                repoLink.href = data[i].html_url;
                repoLink.innerText = data[i].name;
                repo.appendChild(repoLink);
            }
        })
        .catch (console.error);
    }
})

};