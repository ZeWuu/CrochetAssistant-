window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get("project");
    if (projectName) {
        document.getElementById("project-name").textContent = projectName;
        loadCounters(projectName);
    }
};

function loadCounters(projectName) {
    const projects = JSON.parse(sessionStorage.getItem('projects')) || {};
    const counters = projects[projectName]?.counters || {};

    const ul = document.querySelector("ul");
    ul.innerHTML = "";

    for (const counterName in counters) {
        const li = document.createElement("li");
        li.innerHTML = `
            <button onclick="decrementCounter('${projectName}', '${counterName}')">-</button>
            <span>${counterName}</span>: <span>${counters[counterName]}</span>
            <button onclick="incrementCounter('${projectName}', '${counterName}')">+</button>
        `;
        ul.appendChild(li);
    }
}

function addCounter(projectName) {
    const counterName = prompt("Enter counter name:", "Counter");
    if (counterName !== null && counterName.trim() !== "") {
        let projects = JSON.parse(sessionStorage.getItem('projects')) || {};
        if (projects[projectName]) {
            let counters = projects[projectName].counters;
            if (!counters[counterName]) {
                counters[counterName] = 0;
                sessionStorage.setItem('projects', JSON.stringify(projects));
                loadCounters(projectName);
            }
        }
    }
}

function incrementCounter(projectName, counterName) {
    let projects = JSON.parse(sessionStorage.getItem('projects')) || {};
    if (projects[projectName] && projects[projectName].counters[counterName] !== undefined) {
        projects[projectName].counters[counterName] += 1;
        sessionStorage.setItem('projects', JSON.stringify(projects));
        loadCounters(projectName);
    }
}

function decrementCounter(projectName, counterName) {
    let projects = JSON.parse(sessionStorage.getItem('projects')) || {};
    if (projects[projectName] && projects[projectName].counters[counterName] !== undefined) {
        projects[projectName].counters[counterName] -= 1;
        sessionStorage.setItem('projects', JSON.stringify(projects));
        loadCounters(projectName);
    }
}
function modifyText(command, value = null){
    document.execCommand(command, false, value);
    keepFocus();
}
function modifyColor(command, value){
    document.execCommand(command, false, value);
    
}

function keepFocus() {
    const editor = document.getElementById('editor');
    editor.focus();
}

let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;

function startTimer() {
    if (!running) {
        startTime = Date.now() - difference;
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    document.getElementById('time').innerHTML = '00:00:00';
}

function updateTime() {
    updatedTime = Date.now();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    document.getElementById('time').innerHTML = hours + ':' + minutes + ':' + seconds;
}