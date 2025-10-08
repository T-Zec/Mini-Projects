// import projectsJson from 'projectsJson' with {type: 'json'};
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const base = window.location.origin + window.location.pathname.replace(/index\.html$/, '');
        data.projects.forEach(project => {            
            const li = document.createElement('LI');
            const a = document.createElement('A');
            // Ensure the URL is absolute
            const fullUrl = new URL(project.url, base).href;
            a.href = fullUrl;
            a.textContent = project.name;
            a.setAttribute('onclick', 'showProject(' + JSON.stringify(project) + ')');
            a.setAttribute('target', 'preview');
            li.appendChild(a);
            sidebar.querySelector('ul').appendChild(li);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));

// Show Project Preview
function showProject(project) {
    const iframe = document.getElementById('preview');
    iframe.src = project.url;
}

// Toggle Sidebar Open/Close
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Close sidebar after clicking a link
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
});

// Close sidebar when clicking outside
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    menuBtn.classList.remove('active');
});
