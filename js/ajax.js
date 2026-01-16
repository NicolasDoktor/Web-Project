


const API_BASE_URL = 'http://localhost:5000/api';


const USE_LOCAL_FILES = true;

/**
 * Fetch data from API or local JSON files
 * @param {string} endpoint - API endpoint or file path
 * @returns {Promise} - Promise resolving to JSON data
 */
async function fetchData(endpoint) {
    try {
        const url = USE_LOCAL_FILES ? `data/${endpoint}.json` : `${API_BASE_URL}/${endpoint}`;

        
        if (USE_LOCAL_FILES) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const data = JSON.parse(xhr.responseText);
                            resolve(data);
                        } catch (e) {
                            reject(new Error('Failed to parse JSON'));
                        }
                    } else {
                        reject(new Error(`HTTP error! status: ${xhr.status}`));
                    }
                };
                xhr.onerror = function () {
                    reject(new Error('Network error'));
                };
                xhr.send();
            });
        } else {
            
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}


async function loadClasses() {
    const classesGrid = document.getElementById('classesGrid');

    try {
        const classes = await fetchData('classes');

        if (!classes || classes.length === 0) {
            classesGrid.innerHTML = '<p class="text-center">Nepodařilo se načíst třídy.</p>';
            return;
        }

        classesGrid.innerHTML = classes.map(classData => `
            <div class="class-card reveal">
                <img src="${classData.image}" alt="${classData.name}" class="class-image">
                <div class="class-info">
                    <h3 class="class-name">${classData.name}</h3>
                    <p class="class-description">${classData.description}</p>
                    
                    <div class="class-stats">
                        <span class="stat-badge">Role: ${classData.role}</span>
                        <span class="stat-badge">Obtížnost: ${classData.difficulty}</span>
                    </div>
                    
                    <div class="mt-1">
                        <strong style="color: var(--color-accent-cyan);">Schopnosti:</strong>
                        <ul style="margin-top: 0.5rem; padding-left: 1.5rem; color: var(--color-text-secondary);">
                            ${classData.abilities.map(ability => `<li>${ability}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="mt-1">
                        <strong style="color: var(--color-accent-cyan);">Statistiky:</strong>
                        <div style="margin-top: 0.5rem;">
                            ${renderStatBar('Health', classData.stats.health)}
                            ${renderStatBar('Damage', classData.stats.damage)}
                            ${renderStatBar('Mobility', classData.stats.mobility)}
                            ${renderStatBar('Utility', classData.stats.utility)}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        
        revealElements();

    } catch (error) {
        console.error('Error loading classes:', error);
        classesGrid.innerHTML = '<p class="text-center">Chyba při načítání tříd.</p>';
    }
}

/**
 * Render a stat bar
 * @param {string} label - Stat label
 * @param {number} value - Stat value (0-100)
 * @returns {string} - HTML for stat bar
 */
function renderStatBar(label, value) {
    return `
        <div style="margin-bottom: 0.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                <span style="font-size: 0.9rem; color: var(--color-text-muted);">${label}</span>
                <span style="font-size: 0.9rem; color: var(--color-accent-cyan);">${value}</span>
            </div>
            <div style="width: 100%; height: 6px; background: var(--color-bg-tertiary); border-radius: 3px; overflow: hidden;">
                <div style="width: ${value}%; height: 100%; background: var(--gradient-primary); transition: width 1s ease;"></div>
            </div>
        </div>
    `;
}

/**
 * Load and render news articles
 */
async function loadNews() {
    const newsGrid = document.getElementById('newsGrid');

    try {
        const news = await fetchData('news');

        if (!news || news.length === 0) {
            newsGrid.innerHTML = '<p class="text-center">Nepodařilo se načíst novinky.</p>';
            return;
        }

        newsGrid.innerHTML = news.map(article => `
            <div class="news-card reveal">
                <p class="news-date">${formatDate(article.date)} • ${article.category}</p>
                <h3 class="news-title">${article.title}</h3>
                <p class="news-excerpt">${article.excerpt}</p>
            </div>
        `).join('');

        
        revealElements();

    } catch (error) {
        console.error('Error loading news:', error);
        newsGrid.innerHTML = '<p class="text-center">Chyba při načítání novinek.</p>';
    }
}

/**
 * Format date to Czech locale
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Reveal elements with scroll animation
 */
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

/**
 * Submit contact form
 * @param {Event} event - Form submit event
 */
async function submitContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        // If backend is running, send to API
        if (!USE_LOCAL_FILES) {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
        }

        
        alert('Zpráva byla úspěšně odeslána! Brzy se vám ozveme.');
        form.reset();

    } catch (error) {
        console.error('Error submitting form:', error);

        
        alert('Zpráva byla odeslána (demo režim).');
        form.reset();
    }
}



/
document.addEventListener('DOMContentLoaded', () => {
    loadClasses();
    loadNews();

    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }
});
