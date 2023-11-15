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

    // order skills list using skill.order property (if exists) from 0 to n
    skills.sort((a, b) => {
        if (a.order && b.order) {
            return a.order - b.order;
        }
        return 0;
    });

    const skillsListItems = skills.map((skill) => {
        const { name, icon } = skill;
        const iconSize = 64;
        const iconElement = icon ? "<img src='" + icon + "' alt='" + name + "' width='" + iconSize + "' height='" + iconSize + "' />" : "";

        if (skill.order && skill.order >= 0) {
            return `<li style='order: ${skill.order}'><div class='skill-item' > ${iconElement}${name} </div></li>`;
        } else {
            return `<li style='order: 9999'><div class='skill-item' > ${iconElement}${name} </div></li>`;
        }
    });
    
    skillsList.innerHTML = skillsListItems.join("");
}