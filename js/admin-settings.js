const API_URL = 'https://jobizaa.com/api/admin/AddSuperAdmin/65165612';

function saveAdminsToLocalStorage(admins) {
    localStorage.setItem('superAdmins', JSON.stringify(admins));
}

function loadAdminsFromLocalStorage() {
    const stored = localStorage.getItem('superAdmins');
    return stored ? JSON.parse(stored) : [];
}

function addAdminToSelect(name) {
    const select = document.getElementById('superAdminNames');
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
}

function clearAdmins() {
    localStorage.removeItem('superAdmins');
    const select = document.getElementById('superAdminNames');
    select.innerHTML = '<option disabled selected>اختر مشرف</option>';
    alert('تم مسح كل المشرفين');
}

async function addSuperAdmin(adminData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminData)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'فشل في إضافة المشرف');
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    document.getElementById(tabId).classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    showTab('general');

    const savedAdmins = loadAdminsFromLocalStorage();
    savedAdmins.forEach(name => addAdminToSelect(name));

    const form = document.getElementById('superAdminForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const superAdminNames = document.getElementById('superAdminNames');
    const clearBtn = document.getElementById('clearAdminsBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const password = document.getElementById('adminPassword').value;
        const confirmPassword = document.getElementById('adminPasswordConfirm').value;

        if (password !== confirmPassword) {
            alert('تأكيد كلمة المرور غير مطابق');
            return;
        }

        const fullName = document.getElementById('adminName').value.trim();

        const adminData = {
            fullName,
            email: document.getElementById('adminEmail').value.trim(),
            phone: document.getElementById('adminPhone').value.trim(),
            password: password,
            password_confirmation: confirmPassword
        };

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'جاري الإضافة...';

            await addSuperAdmin(adminData);
            alert('تمت إضافة المشرف بنجاح');

            addAdminToSelect(fullName);

            const updatedAdmins = loadAdminsFromLocalStorage();
            updatedAdmins.push(fullName);
            saveAdminsToLocalStorage(updatedAdmins);

            form.reset();
        } catch (error) {
            alert(`خطأ: ${error.message}`);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Add Super Admin';
        }
    });

    clearBtn.addEventListener('click', clearAdmins);
});
