// root URL
const apiurl = "https://api.github.com/users/";
const formel = document.querySelector(".search-box");
const inel = document.querySelector(".searchtext");

async function getUser(username) {
  try {
    const { data } = await axios(apiurl + username);
    createCard(data);
    getuserrepo(username);
  } catch (err) {
    if (err.response.status === 404)
      createErrorCard("There is no profile with this username");
  }
}
formel.addEventListener("submit", (e) => {
  e.preventDefault();
  const key = inel.value;
  if (key) {
    getUser(key);
    inel.value = "";
  }
});

const extrael = document.querySelector(".user");
function createCard(user) {
  const str = ` 
        <div class="left">
            <img src="${user.avatar_url}" alt="${user.name}">
        </div>
        <div class="right">
            <h2 class="name">${user.login}</h2>
            <p class="about">${user.bio}</p>
            <ul class="list">
                <li class="items">${user.followers} Followers</li>
                <li class="items">${user.following} Following</li>
                <li class="items">${user.public_repos} Repos</li>
            </ul>
        </div>
    `;
  extrael.innerHTML = str;
  // getuserrepo(user.login);
}

async function getuserrepo(username) {
  try {
    const { data } = await axios(apiurl + username + "/repos?sort=created");
    addRepotoCard(data);
  } catch (err) {
    createErrorCard("Problem Fetching Repos");
  }
}

function addRepotoCard(reposlist) {
  const reposel = document.querySelector(".repos");
  reposlist.slice(0, 10).forEach((repo) => {
    const repoel = document.createElement("a");
    repoel.classList.add("repos-names");
    repoel.href = repo.html_url;
    repoel.target = "_blank";
    repoel.innerText = repo.name;
    const rightel = document.querySelector(".right");
    rightel.appendChild(repoel);
  });
}
function createErrorCard(msg) {
  const cardhtml = `
           <div class="user">
              <h1>${msg}</h1>
              </div>
        `;
  extrael.innerHTML = cardhtml;
}

//     <ul class="repos">
//     <li class="repos-names">webskyne</li>
//     <li class="repos-names">sih22</li>
//     <li class="repos-names">js-projects</li>
//     <li class="repos-names">frontend projects</li>
//     <li class="repos-names">oops projects</li>
// </ul>
