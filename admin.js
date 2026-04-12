// admin.js

document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('menuTableBody');
    const form = document.getElementById('itemForm');
    const alertBox = document.getElementById('alertBox');
    
    // Check Config
    if (!supabase || SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE') {
        showAlert('Error: Supabase configuration is missing in config.js', 'error');
        tableBody.innerHTML = '<tr><td colspan="4">No Data Connection</td></tr>';
        return;
    }

    // Load data
    await loadItems();

    // Handle Form Submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = document.getElementById('itemId').value;
        const category = document.getElementById('itemCategory').value;
        const name = document.getElementById('itemName').value;
        const price = document.getElementById('itemPrice').value;
        const description = document.getElementById('itemDesc').value;

        const payload = { category, name, price, description };

        try {
            if (id) {
                // Update
                const { error } = await supabase.from('menu_items').update(payload).eq('id', id);
                if (error) throw error;
                showAlert('Item updated successfully', 'success');
            } else {
                // Insert
                const { error } = await supabase.from('menu_items').insert([payload]);
                if (error) throw error;
                showAlert('Item added successfully', 'success');
            }
            form.reset();
            document.getElementById('itemId').value = '';
            document.getElementById('cancelBtn').style.display = 'none';
            await loadItems();
        } catch (error) {
            showAlert(error.message, 'error');
        }
    });

    document.getElementById('cancelBtn').addEventListener('click', () => {
        form.reset();
        document.getElementById('itemId').value = '';
        document.getElementById('cancelBtn').style.display = 'none';
    });
    
    // Make these global to call them from onclick
    window.editItem = (id, category, name, price, desc) => {
        document.getElementById('itemId').value = id;
        document.getElementById('itemCategory').value = category;
        document.getElementById('itemName').value = name;
        document.getElementById('itemPrice').value = price;
        document.getElementById('itemDesc').value = desc;
        document.getElementById('cancelBtn').style.display = 'inline-block';
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.deleteItem = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            const { error } = await supabase.from('menu_items').delete().eq('id', id);
            if (error) throw error;
            showAlert('Item deleted', 'success');
            await loadItems();
        } catch (error) {
            showAlert(error.message, 'error');
        }
    };

    async function loadItems() {
        try {
            const { data, error } = await supabase.from('menu_items').select('*').order('category', { ascending: true });
            if (error) throw error;

            tableBody.innerHTML = '';
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="4">No items found in database.</td></tr>';
                return;
            }

            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.category}</td>
                    <td><strong>${item.name}</strong><br><small style="color: gray;">${item.description}</small></td>
                    <td>${item.price}</td>
                    <td class="actions">
                        <button type="button" class="btn" style="padding: 0.3rem 0.6rem;" onclick="editItem('${item.id}', '${item.category.replace(/'/g, "\\'")}', '${item.name.replace(/'/g, "\\'")}', '${String(item.price).replace(/'/g, "\\'")}', '${item.description.replace(/'/g, "\\'")}')">Edit</button>
                        <button type="button" class="btn" style="padding: 0.3rem 0.6rem; background: #c62828;" onclick="deleteItem('${item.id}')">Del</button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        } catch (error) {
            tableBody.innerHTML = '<tr><td colspan="4">Error loading data. Check console.</td></tr>';
            console.error(error);
        }
    }

    function showAlert(msg, type) {
        alertBox.textContent = msg;
        alertBox.className = type === 'error' ? 'alert-error' : 'alert-success';
        alertBox.style.display = 'block';
        setTimeout(() => alertBox.style.display = 'none', 4000);
    }
});
