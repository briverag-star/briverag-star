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



// Sanitize URLs to only allow http/https
function safeUrl(url) {
    try {
        const u = new URL(url, location.href);
        return ['http:', 'https:'].includes(u.protocol) ? u.href : '#';
    } catch {
        return '#';
    }
}

// Load projects from JSON
fetch('data/projects.json')
    .then(res => res.json())
    .then(projects => {
        const grid = document.getElementById('projects-grid');
        grid.innerHTML = '';

        projects.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card fade-in';

            const title = document.createElement('h3');
            title.textContent = p.title;

            const desc = document.createElement('p');
            desc.textContent = p.description;

            const links = document.createElement('div');
            links.className = 'project-links';

            const demoLink = document.createElement('a');
            demoLink.href = safeUrl(p.demo);
            demoLink.target = '_blank';
            demoLink.rel = 'noopener noreferrer';
            demoLink.setAttribute('aria-label', 'Live Demo');
            demoLink.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i>';

            const repoLink = document.createElement('a');
            repoLink.href = safeUrl(p.repo);
            repoLink.target = '_blank';
            repoLink.rel = 'noopener noreferrer';
            repoLink.setAttribute('aria-label', 'GitHub Repo');
            repoLink.innerHTML = '<i class="fa-brands fa-github"></i>';

            links.append(demoLink, repoLink);
            card.append(title, desc, links);
            grid.appendChild(card);
            observer.observe(card);
        });
    });


document.getElementById('year').textContent = new Date().getFullYear();
