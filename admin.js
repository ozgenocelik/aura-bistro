// admin.js

document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('menuTableBody');
    const form = document.getElementById('itemForm');
    const alertBox = document.getElementById('alertBox');
    
    // Auth Logic
    const ACCESS_KEY = 'Aura2024'; // Simple access key
    const loginOverlay = document.getElementById('loginOverlay');
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('adminPassword');
    const loginError = document.getElementById('loginError');
    const adminContainer = document.querySelector('.admin-container');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check if already logged in (session only)
    if (sessionStorage.getItem('adminAuth') === 'true') {
        unlockDashboard();
    }

    loginBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('adminAuth');
            location.reload();
        });
    }

    function handleLogin() {
        if (passwordInput.value === ACCESS_KEY) {
            sessionStorage.setItem('adminAuth', 'true');
            unlockDashboard();
        } else {
            loginError.style.display = 'block';
            passwordInput.value = '';
        }
    }

    function unlockDashboard() {
        loginOverlay.style.display = 'none';
        adminContainer.style.display = 'block';
        initAdmin();
    }

    async function initAdmin() {
        // Check Config
        const supabaseClient = window.supabaseClient || window.supabase;
        const sUrl = window.SUPABASE_URL;

        if (!supabaseClient || !sUrl || sUrl === 'YOUR_SUPABASE_URL_HERE') {
            showAlert('Configurazione richiesta: Aggiungi URL e Chiave Supabase in config.js', 'error');
            updateStatus('🔴 Disconnesso (Configurazione mancante)', 'error');
        } else {
            updateStatus('🟡 Connessione...', 'info');
        }

        // Initial Load
        await loadItems();

        // Handle Form Submit
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const id = document.getElementById('itemId').value;
            const category_en = document.getElementById('itemCategoryEn').value;
            const category_it = document.getElementById('itemCategoryIt').value;
            const name_en = document.getElementById('itemNameEn').value;
            const name_it = document.getElementById('itemNameIt').value;
            const price = document.getElementById('itemPrice').value;
            const description_en = document.getElementById('itemDescEn').value;
            const description_it = document.getElementById('itemDescIt').value;

            const payload = { category_en, category_it, name_en, name_it, price, description_en, description_it };

            try {
                updateStatus('🟡 Salvataggio...', 'info');
                if (id) {
                    // Update
                    const { error } = await supabaseClient.from('menu_items').update(payload).eq('id', id);
                    if (error) throw error;
                    showAlert('Elemento aggiornato con successo', 'success');
                } else {
                    // Insert
                    const { error } = await supabaseClient.from('menu_items').insert([payload]);
                    if (error) throw error;
                    showAlert('Elemento aggiunto con successo', 'success');
                }
                form.reset();
                document.getElementById('itemId').value = '';
                document.getElementById('cancelBtn').style.display = 'none';
                await loadItems();
            } catch (error) {
                showAlert(error.message, 'error');
                updateStatus('🔴 Errore durante il salvataggio', 'error');
            }
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            form.reset();
            document.getElementById('itemId').value = '';
            document.getElementById('cancelBtn').style.display = 'none';
        });
    }
    
    // Global function for edit
    window.editItem = (id, catEn, catIt, nameEn, nameIt, price, descEn, descIt) => {
        document.getElementById('itemId').value = id;
        document.getElementById('itemCategoryEn').value = catEn;
        document.getElementById('itemCategoryIt').value = catIt;
        document.getElementById('itemNameEn').value = nameEn;
        document.getElementById('itemNameIt').value = nameIt;
        document.getElementById('itemPrice').value = price;
        document.getElementById('itemDescEn').value = descEn;
        document.getElementById('itemDescIt').value = descIt;
        document.getElementById('cancelBtn').style.display = 'inline-block';
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.deleteItem = async (id) => {
        const supabaseClient = window.supabaseClient || window.supabase;
        if (!confirm('Sei sicuro di voler eliminare questo elemento?')) return;
        try {
            updateStatus('🟡 Eliminazione...', 'info');
            const { error } = await supabaseClient.from('menu_items').delete().eq('id', id);
            if (error) throw error;
            showAlert('Elemento eliminato con successo', 'success');
            await loadItems();
        } catch (error) {
            showAlert(error.message, 'error');
            updateStatus('🔴 Errore durante l\'eliminazione', 'error');
        }
    };

    async function loadItems() {
        const supabaseClient = window.supabaseClient || window.supabase;
        try {
            let data = [];
            if (supabaseClient) {
                const { data: dbData, error } = await supabaseClient.from('menu_items').select('*').order('category_en', { ascending: true });
                if (!error && dbData) {
                    data = dbData;
                    updateStatus('🟢 Connected to Supabase', 'success');
                } else if (error) {
                    updateStatus('🔴 Errore di connessione', 'error');
                    console.error("Supabase Error:", error);
                }
            }
            
            tableBody.innerHTML = '';
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="4">Nessun elemento trovato nel database.</td></tr>';
                return;
            }

            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td data-label="Categoria">${item.category_en} / ${item.category_it}</td>
                    <td data-label="Nome">
                        <strong>${item.name_en}</strong> / <em>${item.name_it}</em><br>
                        <small style="color: gray;">${item.description_en || ''} / ${item.description_it || ''}</small>
                    </td>
                    <td data-label="Prezzo">${item.price}</td>
                    <td data-label="Azioni" class="actions">
                        <button type="button" class="btn" style="padding: 0.3rem 0.6rem;" onclick="editItem('${item.id}', '${escapeHtml(item.category_en)}', '${escapeHtml(item.category_it)}', '${escapeHtml(item.name_en)}', '${escapeHtml(item.name_it)}', '${escapeHtml(String(item.price))}', '${escapeHtml(item.description_en)}', '${escapeHtml(item.description_it)}')">EDIT</button>
                        <button type="button" class="btn" style="padding: 0.3rem 0.6rem; background: #c62828;" onclick="deleteItem('${item.id}')">DEL</button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });

        } catch (error) {
            tableBody.innerHTML = '<tr><td colspan="4">Error loading data. Check console.</td></tr>';
            console.error(error);
        }
    }

    function escapeHtml(text) {
        if (!text) return '';
        return text.toString().replace(/'/g, "\\'");
    }

    function showAlert(msg, type) {
        alertBox.textContent = msg;
        alertBox.className = type === 'error' ? 'alert-error' : 'alert-success';
        alertBox.style.display = 'block';
        setTimeout(() => alertBox.style.display = 'none', 4000);
    }

    function updateStatus(text, type) {
        const header = document.querySelector('.admin-header');
        let statusEl = document.getElementById('connStatus');
        if (!statusEl) {
            statusEl = document.createElement('span');
            statusEl.id = 'connStatus';
            statusEl.style.fontSize = '0.8rem';
            statusEl.style.marginLeft = '1rem';
            statusEl.style.padding = '2px 8px';
            statusEl.style.borderRadius = '4px';
            header.appendChild(statusEl);
        }
        statusEl.textContent = text;
        statusEl.style.background = type === 'error' ? '#ffebee' : (type === 'success' ? '#e8f5e9' : '#fff3e0');
        statusEl.style.color = type === 'error' ? '#c62828' : (type === 'success' ? '#2e7d32' : '#ef6c00');
    }
});
