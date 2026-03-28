// Sidebar toggle
const navToggle = document.getElementById('nav-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebar-close');
const overlay = document.getElementById('sidebar-overlay');

function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

navToggle.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// Close sidebar when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));



// Load projects from JSON
fetch('data/projects.json')
    .then(res => res.json())
    .then(projects => {
        const grid = document.getElementById('projects-grid');
        grid.innerHTML = projects.map(p => `
            <div class="project-card">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="project-links">
                    <a href="${p.demo}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    <a href="${p.repo}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repo"><i class="fa-brands fa-github"></i></a>
                </div>
            </div>
        `).join('');

        // Re-observe fade-in elements after dynamic render
        grid.querySelectorAll('.project-card').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });


document.getElementById('year').textContent = new Date().getFullYear();
