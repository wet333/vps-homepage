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
            renderResume(data.data);
        })
}

function renderResume(data) {
    const skills = data;
    const skillsList = document.getElementById("skills-list");

    const skillsListItems = skills.map((skill) => {
        const { name, icon } = skill;
        const iconElement = icon ? "<img src='"+icon+"' alt='"+name+"' width='72' height='72' />" : "";
        return `<li><div class='skill-item' > ${iconElement}${name} </div></li>`;
    });
    
    skillsList.innerHTML = skillsListItems.join("");
}