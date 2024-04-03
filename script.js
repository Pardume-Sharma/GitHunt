let toggleBtn = document.getElementById('mode');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

var form = document.querySelector(".myform");
var main = document.querySelector("main");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  var search = document.querySelector("#user").value;
  var originalName = search.split(" ").join("");
  alert(originalName);
  main.innerHTML = "";

  var token = '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';

  fetch(`https://api.github.com/users/${search}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  })
    .then((result) => {
      if (!result.ok) {
        throw new Error("User not found");
      }
      return result.json();
    })
    .then((userData) => {
      document.querySelector("#section").innerHTML = "";
      document.querySelector("#section").style.cssText += "padding: 4% 1%";
      document.querySelector(
        "#section"
      ).innerHTML = `<div class="col1 common-col">
            <div class="usr-details">
                <div id="usr-img">
                    <a target ="_blank" href ="https://www.github.com/${originalName}"><img src="${userData.avatar_url}" alt="${userData.name}"></a>
                </div>
                <div id="usr-name">
                    ${userData.name}
                </div>
            </div>

            <div class="add-details">
            <div class="achieve">
                    <div class="ach-name">
                        Location
                    </div>
                    <div id="ach-val">
                        ${userData.location}
                    </div>
                </div>

                <div class="achieve">
                    <div class="ach-name">
                        Email
                    </div>
                    <div id="ach-val">
                        ${userData.email}
                    </div>
                </div>    
                <div class="achieve">
                    <div class="ach-name">
                        Public Repositories
                    </div>
                    <div id="ach-val">
                        ${userData.public_repos}
                    </div>
                </div>
                <div class="achieve">
                    <div class="ach-name">
                        Followers
                    </div>
                    <div id="ach-val">
                        ${userData.followers}
                    </div>
                </div>
                <div class="achieve">
                    <div class="ach-name">
                        Following
                    </div>
                    <div id="ach-val">
                        ${userData.following}
                    </div>
                </div>

                <div class="achieve">
                    <div class="ach-name">
                        Gists
                    </div>
                    <div id="ach-val">
                        ${userData.public_gists}
                    </div>
                </div>

            </div>
        </div>`;

      fetch(`https://api.github.com/users/${search}/repos`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then((reposResult) => reposResult.json())
        .then((reposData) => {
          var repoHTML = "";
          reposData.forEach((repo) => {
            repoHTML += `
                    <div class="repo-box">
                        <div class="repo-name">
                            <a href="${repo.html_url}" target="_blank">${
              repo.name
            }</a>
                        </div>
                        <div class="time">
                            ${new Date(repo.updated_at).toLocaleString()}
                        </div>
                    </div>`;
          });
          document.querySelector("#section").innerHTML += `
            <div class="col2 common-col">    
                <div class="col2-head">
                        <input type="text" id="searchRepo" placeholder="Search Repository Here...">
                        <i class="fas fa-search"></i>
                    </div>
                <div id="repoContainer">${repoHTML}</div>
            </div>
            `;
          var searchInput = document.getElementById("searchRepo");
          searchInput.addEventListener("input", function () {
            var searchString = this.value.toLowerCase();
            var repoBoxes = document.querySelectorAll(".repo-box");
            repoBoxes.forEach(function (repoBox) {
              var repoName = repoBox
                .querySelector(".repo-name")
                .textContent.toLowerCase();
              if (repoName.includes(searchString)) {
                repoBox.style.display = "block";
              } else {
                repoBox.style.display = "none";
              }
            });
          });
        });
    })
    .catch((error) => {
      document.querySelector("#section").innerHTML =
        '<div class = "error"> Username does not exist! </div>';
    });
});

