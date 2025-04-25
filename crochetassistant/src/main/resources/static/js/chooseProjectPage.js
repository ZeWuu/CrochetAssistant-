window.onload = function () {
    loadProjects();
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
};

function loadProjects() {
    const projects = JSON.parse(sessionStorage.getItem('projects')) || {};
    const ul = document.getElementById("project-list");
    ul.innerHTML = "";

    for (const projectName in projects) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${projectName}</span>
            <button class="select-button" onclick="openProject('${projectName}')">Select</button>
        `;
        ul.appendChild(li);
    }
}

function startNewProject() {
    const projectName = prompt("Enter project name:");
    if (projectName !== null && projectName.trim() !== "") {
        let projects = JSON.parse(sessionStorage.getItem('projects')) || {};
        if (!projects[projectName]) {
            projects[projectName] = { counters: {} }; // Initialize a new project
            sessionStorage.setItem('projects', JSON.stringify(projects));
            window.location.href = `/stitch-counters?project=${encodeURIComponent(projectName)}`;
        }
    }
}

function openProject(projectName) {
    window.location.href = `/stitch-counters?project=${encodeURIComponent(projectName)}`;
}
