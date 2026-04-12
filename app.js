// app.js

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('menuContainer');
    const nav = document.getElementById('categoryNav');

    // Default mock data just so the site looks good even without real DB config
    let menuItems = [
        { category: "Starters", name: "Burrata al Tartufo", description: "Fresh burrata with black truffle shavings, extra virgin olive oil, and crusty bread.", price: "€24" },
        { category: "Starters", name: "Carpaccio di Fassona", description: "Thinly sliced raw beef, aged parmesan, arugula, and lemon zest.", price: "€28" },
        { category: "Main Courses", name: "Risotto allo Zafferano", description: "Milanese style saffron risotto with slow-cooked bone marrow.", price: "€35" },
        { category: "Main Courses", name: "Branzino al Forno", description: "Oven-baked Mediterranean sea bass with roasted potatoes and herbs.", price: "€42" },
        { category: "Desserts", name: "Tiramisu Classico", description: "Mascarpone cream, espresso soaked savoiardi, and rich dark cocoa.", price: "€14" },
        { category: "Drinks", name: "Franciacorta Brut", description: "Premium Italian sparkling wine, crisp and elegant.", price: "€18" }
    ];

    if (supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE') {
        try {
            const { data, error } = await supabase.from('menu_items').select('*');
            if (error) throw error;
            if (data && data.length > 0) {
                menuItems = data;
            }
        } catch (error) {
            console.error("Error fetching menu:", error);
            // Fallbacks to mock data on error
        }
    }

    renderMenu(menuItems);

    function renderMenu(items) {
        // Clear loader
        container.innerHTML = '';
        nav.innerHTML = '';

        // Group by category
        const categorized = {};
        const categories = [];

        items.forEach(item => {
            if (!categorized[item.category]) {
                categorized[item.category] = [];
                categories.push(item.category);
            }
            categorized[item.category].push(item);
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
                const div = document.createElement('div');
                div.className = 'menu-item';
                div.innerHTML = `
                    <div class="menu-item-header">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">${typeof item.price === 'number' ? '€'+item.price : item.price}</span>
                    </div>
                    <p class="item-desc">${item.description}</p>
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
