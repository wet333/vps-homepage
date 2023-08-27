const API_URL = "https://api.agustinwet.online/api/github/my-repositories";
const demoPagePrefix = "https://wet333.github.io/";
const repoPagePrefix = "https://github.com/wet333/";

const listElement = document.getElementById("project-list");

window.addEventListener("DOMContentLoaded", () => {
    fetch(API_URL)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {

            if (data.repositories.length > 0) {

                const repoNames = data.repositories.map((url) => {
                    const parts = url.split("/");
                    return parts[parts.length - 1];
                });

                repoNames.forEach((repo) => {
                    const listItemElement = document.createElement("li");
                    const linkElement = document.createElement("a");
                    linkElement.href = repoPagePrefix + repo; // TODO: change the API, and then add option to render a link to demo pages
                    linkElement.textContent = repo;
                    linkElement.target = "_blank";
                    listItemElement.appendChild(linkElement);
                    listElement.appendChild(listItemElement);
                });
            }
        })
});