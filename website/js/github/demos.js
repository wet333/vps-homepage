const API_URL = "https://api.awet.online/api/github/my-repositories";
const API_URL_DEV = "http://localhost:3000/api/github/my-repositories";
const demoPagePrefix = "https://wet333.github.io/";
const repoPagePrefix = "https://github.com/wet333/";

const listElement = document.getElementById("project-list");

window.addEventListener("DOMContentLoaded", () => {
    fetch(API_URL)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {

            if (data.repositories.length > 0) {

                const repoNames = data.repositories.map((repoUrl) => {
                    const parts = repoUrl.split("/");
                    return parts[parts.length - 1];
                });

                repoNames.forEach((repoName) => {
                    const listItemElement = document.createElement("li");
                    const linkElement = document.createElement("a");
                    linkElement.href = repoPagePrefix + repoName; // TODO: change the API, and then add option to render a link to demo pages
                    linkElement.textContent = repoName;
                    linkElement.target = "_blank";
                    listItemElement.appendChild(linkElement);
                    listElement.appendChild(listItemElement);
                });
            }
        })
});