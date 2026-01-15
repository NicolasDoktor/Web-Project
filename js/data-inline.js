// ARC RAIDERS - Data načítání
// Jednoduchý kód pro načtení tříd a novinek

// Data pro herní třídy
var classesData = [
    {
        "id": 1,
        "name": "Assault",
        "description": "Těžký frontový bojovník specializovaný na přímý boj. Vybaven pokročilým pancířem a silnými zbraněmi, třída Assault vyniká v boji na krátkou až střední vzdálenost.",
        "image": "images/assault-class.png",
        "role": "Tank/DPS",
        "difficulty": "Střední",
        "abilities": [
            "Heavy Armor Plating",
            "Suppressive Fire",
            "Combat Shield",
            "Adrenaline Rush"
        ],
        "stats": {
            "health": 95,
            "damage": 85,
            "mobility": 60,
            "utility": 70
        }
    },
    {
        "id": 2,
        "name": "Scout",
        "description": "Agilní průzkumník s vyšší mobilitou a přesností. Mistři v boji na dlouhou vzdálenost a skrytých taktikách.",
        "image": "images/scout-class.png",
        "role": "DPS/Recon",
        "difficulty": "Těžká",
        "abilities": [
            "Active Camouflage",
            "Precision Shot",
            "Motion Tracker",
            "Quick Escape"
        ],
        "stats": {
            "health": 65,
            "damage": 90,
            "mobility": 95,
            "utility": 75
        }
    },
    {
        "id": 3,
        "name": "Support",
        "description": "Důležitý člen týmu zaměřený na léčení a taktickou podporu. Vybaven pokročilou medicínskou technologií.",
        "image": "images/support-class.png",
        "role": "Healer/Support",
        "difficulty": "Lehká",
        "abilities": [
            "Healing Field",
            "Shield Generator",
            "Ammo Supply",
            "Revive Beacon"
        ],
        "stats": {
            "health": 75,
            "damage": 60,
            "mobility": 70,
            "utility": 95
        }
    },
    {
        "id": 4,
        "name": "Engineer",
        "description": "Technický specialista schopný rozmístit automatickou obranu a hackovat nepřátelské systémy.",
        "image": "images/assault-class.png",
        "role": "Support/Control",
        "difficulty": "Střední",
        "abilities": [
            "Auto-Turret Deploy",
            "EMP Blast",
            "Repair Drone",
            "Fortify Position"
        ],
        "stats": {
            "health": 70,
            "damage": 75,
            "mobility": 65,
            "utility": 90
        }
    }
];

// Data pro novinky
var newsData = [
    {
        "id": 1,
        "date": "2025-12-05",
        "title": "Velká Aktualizace 2.0 - Nový Systém Tříd",
        "category": "Update",
        "excerpt": "Představujeme kompletně přepracovaný systém tříd se čtyřmi odlišnými herními styly. Každá třída má nyní unikátní schopnosti a vylepšení."
    },
    {
        "id": 2,
        "date": "2025-11-28",
        "title": "Patch Notes 1.8.5 - Vylepšení Výkonu",
        "category": "Patch",
        "excerpt": "Významné optimalizace výkonu snižující doba načítání o 40%. Opravené kritické chyby ovlivňující stabilitu multiplayeru."
    },
    {
        "id": 3,
        "date": "2025-11-20",
        "title": "Nová Mapa: Průmyslová Pustina",
        "category": "Content",
        "excerpt": "Prozkoumejte ruiny masivního průmyslového komplexu přeběhlého nepřátelskými stroji. K dispozici nyní pro všechny hráče."
    },
    {
        "id": 4,
        "date": "2025-11-15",
        "title": "Komunitní Event: Robot Uprising",
        "category": "Event",
        "excerpt": "Spojte síly s hráči po celém světě v našem největším komunitním eventu. Exkluzivní odměny pro nejlepší hráče."
    },
    {
        "id": 5,
        "date": "2025-11-08",
        "title": "Vývojářský Deník: Budoucnost ARC Raiders",
        "category": "News",
        "excerpt": "Náš vývojový tým sdílí informace o připravovaných funkcích, včetně nových typů nepřátel a vylepšeného crafting systému."
    },
    {
        "id": 6,
        "date": "2025-11-01",
        "title": "Aktualizace Vyvážení Zbraní",
        "category": "Patch",
        "excerpt": "Komplexní vyrovnání zbraní řešící obavy komunity. Assault rifles vylepšeny, sniper rifles upraveny pro lepší použití na dlouhou vzdálenost."
    }
];

// Načtení herních tříd
function nactiTridy() {
    var classesGrid = document.getElementById('classesGrid');

    if (!classesGrid) {
        return;
    }

    var html = '';

    for (var i = 0; i < classesData.length; i++) {
        var trida = classesData[i];

        // Vytvoření HTML pro schopnosti
        var schopnostiHtml = '';
        for (var j = 0; j < trida.abilities.length; j++) {
            schopnostiHtml += '<li>' + trida.abilities[j] + '</li>';
        }

        // Vytvoření HTML pro statistiky
        var statsHtml = '';
        statsHtml += vytvorStatBar('Health', trida.stats.health);
        statsHtml += vytvorStatBar('Damage', trida.stats.damage);
        statsHtml += vytvorStatBar('Mobility', trida.stats.mobility);
        statsHtml += vytvorStatBar('Utility', trida.stats.utility);

        // Vytvoření celé karty
        html += '<div class="class-card reveal">';
        html += '  <img src="' + trida.image + '" alt="' + trida.name + '" class="class-image">';
        html += '  <div class="class-info">';
        html += '    <h3 class="class-name">' + trida.name + '</h3>';
        html += '    <p class="class-description">' + trida.description + '</p>';
        html += '    <div class="class-stats">';
        html += '      <span class="stat-badge">Role: ' + trida.role + '</span>';
        html += '      <span class="stat-badge">Obtížnost: ' + trida.difficulty + '</span>';
        html += '    </div>';
        html += '    <div class="mt-1">';
        html += '      <strong>Schopnosti:</strong>';
        html += '      <ul>' + schopnostiHtml + '</ul>';
        html += '    </div>';
        html += '    <div class="mt-1">';
        html += '      <strong>Statistiky:</strong>';
        html += '      <div style="margin-top: 10px;">' + statsHtml + '</div>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
    }

    classesGrid.innerHTML = html;
}

// Vytvoření progress baru pro statistiky
function vytvorStatBar(nazev, hodnota) {
    var html = '';
    html += '<div style="margin-bottom: 10px;">';
    html += '  <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">';
    html += '    <span style="font-size: 14px; color: #94a3b8;">' + nazev + '</span>';
    html += '    <span style="font-size: 14px; color: #00d9ff;">' + hodnota + '</span>';
    html += '  </div>';
    html += '  <div style="width: 100%; height: 6px; background: #1a1f2e; border-radius: 3px; overflow: hidden;">';
    html += '    <div style="width: ' + hodnota + '%; height: 100%; background: linear-gradient(135deg, #00d9ff 0%, #a855f7 100%);"></div>';
    html += '  </div>';
    html += '</div>';
    return html;
}

// Načtení novinek
function nactiNovinky() {
    var newsGrid = document.getElementById('newsGrid');

    if (!newsGrid) {
        return;
    }

    var html = '';

    for (var i = 0; i < newsData.length; i++) {
        var novinka = newsData[i];

        // Formátování data
        var datum = new Date(novinka.date);
        var formatovaneDatum = datum.toLocaleDateString('cs-CZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Vytvoření karty novinky
        html += '<div class="news-card reveal">';
        html += '  <p class="news-date">' + formatovaneDatum + ' • ' + novinka.category + '</p>';
        html += '  <h3 class="news-title">' + novinka.title + '</h3>';
        html += '  <p class="news-excerpt">' + novinka.excerpt + '</p>';
        html += '</div>';
    }

    newsGrid.innerHTML = html;
}

// Odeslání kontaktního formuláře
function odeslatFormular(event) {
    event.preventDefault();

    var jmeno = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var predmet = document.getElementById('subject').value;
    var zprava = document.getElementById('message').value;

    alert('Zpráva odeslána (demo režim)\n\nJméno: ' + jmeno + '\nEmail: ' + email + '\nPředmět: ' + predmet);

    document.getElementById('contactForm').reset();
}

// Spuštění při načtení stránky
document.addEventListener('DOMContentLoaded', function () {
    console.log('Načítání dat ARC Raiders...');

    nactiTridy();
    nactiNovinky();

    // Připojení formuláře
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', odeslatFormular);
    }

    console.log('Data úspěšně načtena!');
});
