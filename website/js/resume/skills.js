const resumeURL = "https://spring.awet.online/api/v1/resume";

window.addEventListener("load", () => {
    getResumeSkills();
});

// Get skills from resume API
function getResumeSkills() {
    fetch(resumeURL+"/skills")
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            renderResumeSkillList(data.data);
        })
}

function renderResumeSkillList(data) {
    const skills = data;
    const skillsList = document.getElementById("skills-list");

    const skillsListItems = skills.map((skill) => {
        const { name, icon } = skill;
        const iconSize = 64;
        const iconElement = icon ? "<img src='" + icon + "' alt='" + name + "' width='" + iconSize + "' height='" + iconSize + "' />" : "";
        return `<li><div class='skill-item' > ${iconElement}${name} </div></li>`;
    });
    
    skillsList.innerHTML = skillsListItems.join("");
}