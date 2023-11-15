const resumeURL = "https://spring.awet.online/api/v1/resume";

window.addEventListener("load", () => {
    getContacts();
});

// Get skills from resume API
function getContacts () {
    fetch(resumeURL + "/contacts")
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            renderContactsList(data.data);
        })
}

function renderContactsList(data) {
    const contacts = data;
    const contactsList = document.getElementById("contacts-list");

    contacts.map((contact) => {
        const { name, value, description } = contact;

        const contactItem = document.createElement("div");
        const contactName = document.createElement("span");
        const contactValue = document.createElement("a");

        contactItem.classList.add("contact-item");
        contactName.textContent = capitalizeFirstCharacter(name + ": ");
        contactValue.textContent = value.startsWith("https://") ? value.substring(8) : value;
        contactValue.href = value.startsWith("http") ? value : null;

        contactItem.appendChild(contactName);
        contactItem.appendChild(contactValue);
        contactsList.appendChild(contactItem);
    });
}

function capitalizeFirstCharacter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}