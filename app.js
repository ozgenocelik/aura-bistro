// app.js

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('menuContainer');
    const nav = document.getElementById('categoryNav');

    let currentLang = 'en';

    // Default mock data (Bilingual)
    const fallbackItems = [
        { category_en: "Starters", category_it: "Antipasti", name_en: "Bluefin Tuna Tartare", name_it: "Tartara di Tonno Rosso", description_en: "Hand-cut tuna, avocado mousse, caper berries, citrus dressing.", description_it: "Tonno tagliato al coltello, mousse di avocado, frutti di cappero, condimento agli agrumi.", price: "€26" },
        { category_en: "Starters", category_it: "Antipasti", name_en: "Heritage Beef Carpaccio", name_it: "Carpaccio di Manzo Heritage", description_en: "Thinly sliced wagyu beef, 36-month aged Parmigiano, truffle pearls.", description_it: "Sottili fette di manzo wagyu, Parmigiano invecchiato 36 mesi, perle di tartufo.", price: "€28" },
        { category_en: "Main Courses", category_it: "Secondi Piatti", name_en: "Black Truffle Tagliolini", name_it: "Tagliolini al Tartufo Nero", description_en: "Fresh egg pasta, Piedmontese butter, shaved seasonal black truffle.", description_it: "Pasta fresca all'uovo, burro piemontese, scaglie di tartufo nero di stagione.", price: "€38" },
        { category_en: "Desserts", category_it: "Dolci", name_en: "Deconstructed Tiramisu", name_it: "Tiramisù Decomposto", description_en: "Espresso-soaked savoiardi, mascarpone foam, cocoa dust.", description_it: "Savoiardi bagnati all'espresso, schiuma di mascarpone, polvere di cacao.", price: "€14" },
        { category_en: "Drinks", category_it: "Bevande", name_en: "Classic Negroni", name_it: "Negroni Classico", description_en: "Gin, Campari, Sweet Vermouth, orange peel.", description_it: "Gin, Campari, Vermouth Rosso, scorza d'arancia.", price: "€16" }
    ];

    let menuItems = [...fallbackItems];

    // Safely check for Supabase variables from config.js
    const supabaseClient = window.supabaseClient || window.supabase;
    const sUrl = window.SUPABASE_URL;
    const sKey = window.SUPABASE_ANON_KEY;

    if (supabaseClient && sUrl && sUrl !== 'YOUR_SUPABASE_URL_HERE') {

        try {
            // Create a timeout promise
            const timeout = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Connection timeout')), 3000)
            );

            // Race the database fetch against the timeout
            const { data, error } = await Promise.race([
                supabaseClient.from('menu_items').select('*'),
                timeout
            ]);


            if (error) throw error;
            if (data && data.length > 0) {
                menuItems = data;
            }
        } catch (error) {
            console.warn("Connection attempt timed out or failed. Using fallback menu data.", error);
        }
    }

    // Language Toggle Listeners
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-it').addEventListener('click', () => setLanguage('it'));

    function setLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`lang-${lang}`).classList.add('active');
        
        // Update Loader text
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.textContent = lang === 'en' ? 'Refining our finest selections...' : 'Raffiniamo le nostre migliori selezioni...';
        }

        renderMenu(menuItems);
    }

    setLanguage('en');


    function renderMenu(items) {
        // Clear loader
        container.innerHTML = '';
        nav.innerHTML = '';

        // Group by category based on language
        const categorized = {};
        const categories = [];

        items.forEach(item => {
            const cat = item[`category_${currentLang}`] || item.category_en;
            if (!categorized[cat]) {
                categorized[cat] = [];
                categories.push(cat);
            }
            categorized[cat].push(item);
        });

        // 1. Render Sticky Navigation
        categories.forEach((cat, index) => {
            const btn = document.createElement('button');
            btn.className = `category-btn ${index === 0 ? 'active' : ''}`;
            btn.textContent = cat;
            btn.onclick = () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Scroll to category section
                const section = document.getElementById(`cat-${cat}`);
                if (section) {
                    const navHeight = nav.offsetHeight;
                    window.scrollTo({
                        top: section.offsetTop - navHeight - 20,
                        behavior: 'smooth'
                    });
                }
            };
            nav.appendChild(btn);
        });

        // 2. Render Menu Sections
        categories.forEach(cat => {
            const section = document.createElement('div');
            section.className = 'category-section';
            section.id = `cat-${cat}`;

            const title = document.createElement('h2');
            title.className = 'category-title';
            title.textContent = cat;
            section.appendChild(title);

            const list = document.createElement('div');
            list.className = 'menu-list';

            categorized[cat].forEach(item => {
                const name = item[`name_${currentLang}`] || item.name_en;
                const desc = item[`description_${currentLang}`] || item.description_en;

                const div = document.createElement('div');
                div.className = 'menu-item';
                div.innerHTML = `
                    <div class="menu-item-header">
                        <span class="item-name">${name}</span>
                        <span class="item-price">${typeof item.price === 'number' ? '€'+item.price : item.price}</span>
                    </div>
                    <p class="item-desc">${desc}</p>
                `;
                list.appendChild(div);
            });

            section.appendChild(list);
            container.appendChild(section);
        });
    }

    // ScrollSpy: Update active nav on scroll
    window.addEventListener('scroll', () => {
        const navHeight = nav.offsetHeight;
        let currentActive = null;
        
        document.querySelectorAll('.category-section').forEach(section => {
            const top = section.offsetTop - navHeight - 50;
            if (window.scrollY >= top) {
                currentActive = section.id.replace('cat-', '');
            }
        });

        if (currentActive) {
            document.querySelectorAll('.category-btn').forEach(b => {
                if (b.textContent === currentActive) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
        }
    });
});
